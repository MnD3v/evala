"use client";

import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, PortableTextBlock, PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Loader from "@/app/components/Loader";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Types
interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    mainImage?: string;
    body: PortableTextBlock[];
    author?: {
        name: string;
        bio?: PortableTextBlock[];
        image?: {
            asset: {
                url: string;
            };
        };
    };
}

interface RelatedPost {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    mainImage?: string;
}

// Composants personnalisés pour PortableText
const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null;
            }

            // Construire l'URL de l'image à partir de la référence
            const imageUrl = value.asset._ref
                ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
                : '';

            return (
                <figure className="my-8">
                    <img
                        src={imageUrl}
                        alt={imageUrl}
                        className="w-full h-auto rounded-lg shadow-lg"
                        loading="lazy"
                    />
                    {value.caption && (
                        <figcaption className="text-center text-sm text-gray-400 mt-2 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 text-white font-poppins ">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-white font-poppins ">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-3 text-white font-poppins ">{children}</h3>,
        normal: ({ children }) => <p className="mb-6 leading-relaxed text-gray-300 font-poppins  tracking-wide">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-green-500 pl-6 py-4 my-8 italic text-gray-300 bg-gray-800/50 rounded-r-lg font-poppins text-lg">
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-white font-poppins">{children}</strong>,
        em: ({ children }) => <em className="italic text-gray-300 font-poppins">{children}</em>,
        link: ({ value, children }) => (
            <a
                href={value?.href}
                target={value?.blank ? '_blank' : '_self'}
                rel={value?.blank ? 'noopener noreferrer' : undefined}
                className="text-green-400 hover:text-green-300 underline transition-colors font-poppins"
            >
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300 font-poppins text-lg pl-4">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300 font-poppins text-lg pl-4">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="mb-2">{children}</li>,
        number: ({ children }) => <li className="mb-2">{children}</li>,
    },
};

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  "mainImage": mainImage.asset->url,
  body,
  author->{
    name,
    image {
      asset->{ url }
    },
    bio
  }
}`;

const RELATED_POSTS_QUERY = groq`*[_type == "post" && slug.current != $slug && defined(slug.current)]|order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  publishedAt,
  "mainImage": mainImage.asset->url
}`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const { slug } = params;
        const post = await client.fetch<Post | null>(
            POST_QUERY,
            { slug }
        );

        if (!post) return {};

        const description = "Découvrez notre dernier article de blog.";

        return {
            title: post.title,
            description,
            openGraph: {
                title: post.title,
                description,
                images: post.mainImage ? [{ url: post.mainImage }] : [],
            },
            twitter: {
                card: "summary_large_image",
                title: post.title,
                description,
                images: post.mainImage ? [post.mainImage] : [],
            },
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return {
            title: 'Article de blog',
            description: 'Découvrez notre dernier article de blog.'
        };
    }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<Post | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { slug } = params;
                const query = { slug };

                const [postData, relatedPostsData] = await Promise.all([
                    client.fetch<Post | null>(POST_QUERY, query),
                    client.fetch<RelatedPost[]>(RELATED_POSTS_QUERY, query)
                ]);

                if (!postData) return notFound();

                setPost(postData);
                setRelatedPosts(relatedPostsData);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                // Ajouter un petit délai pour une meilleure UX
                setTimeout(() => setIsLoading(false), 800);
            }
        };

        fetchData();
    }, [params]);

    if (!post && !isLoading) return notFound();

    return (
        <div className="font-sans">
            <Navbar />
            <AnimatePresence>
                {isLoading ? (
                    <Loader key="loader" />
                ) : post ? (
                    <main className="min-h-screen bg-black pt-20 pb-16">
                        <div className="max-w-4xl mx-auto p-3 md:p-8">
                            {post.mainImage && (
                                <div className="mb-8 overflow-hidden rounded-2xl shadow-2xl">
                                    <img
                                        src={post.mainImage}
                                        alt={post.title}
                                        className="w-full h-[400px] md:h-[500px] object-cover"
                                    />
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-poppins tracking-tight leading-tight">
                                {post.title}
                            </h1>
                            <p className="text-gray-400 mb-12 font-poppins text-lg">
                                {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>

                            <article className="prose prose-lg max-w-none prose-invert font-poppins">
                                <PortableText 
                                    value={post.body} 
                                    components={portableTextComponents}
                                />
                            </article>

                            {post.author && (
                                <div className="flex items-center gap-4 mt-12 mb-16 p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800">
                                    {post.author.image?.asset?.url && (
                                        <Image
                                            src={post.author.image.asset.url}
                                            alt={post.author.name}
                                            width={60}
                                            height={60}
                                            className="rounded-full object-cover border-2 border-green-500"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold text-white font-poppins">{post.author.name}</p>
                                        {post.author.bio && (
                                            <div className="text-sm text-gray-400 font-poppins">
                                                <PortableText 
                                                    value={post.author.bio} 
                                                    components={portableTextComponents}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Section des articles connexes */}
                            {relatedPosts.length > 0 && (
                                <section className="mt-16 pt-8 border-t border-gray-800">
                                    <h2 className="text-3xl font-bold mb-8 text-center text-white font-poppins">Autres articles</h2>
                                    
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                        {relatedPosts.map((relatedPost) => (
                                            <Link
                                                href={`/blog/${relatedPost.slug.current}`}
                                                key={relatedPost._id}
                                                className="group block rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:-translate-y-1"
                                            >
                                                {relatedPost.mainImage && (
                                                    <div className="relative h-48 w-full overflow-hidden">
                                                        <img
                                                            src={relatedPost.mainImage}
                                                            alt={relatedPost.title}
                                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-white group-hover:text-green-400 transition-colors font-poppins">
                                                        {relatedPost.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 mb-3 font-poppins">
                                                        {new Date(relatedPost.publishedAt).toLocaleDateString('fr-FR', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                    <p className="text-green-400 text-sm font-medium group-hover:text-green-300 transition-colors">
                                                        Lire l'article →
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </main>
                ) : (
                    <main className="min-h-screen bg-black pt-20 pb-16">
                        <div className="max-w-4xl mx-auto p-3 md:p-8">
                            <div className="text-center">
                                <h1 className="text-2xl font-bold text-white mb-4 font-poppins">
                                    Une erreur est survenue
                                </h1>
                                <p className="text-gray-400 font-poppins">
                                    Impossible de charger l'article pour le moment. Veuillez réessayer plus tard.
                                </p>
                                <Link 
                                    href="/blog"
                                    className="inline-block mt-6 px-6 py-3 bg-green-500/20 text-green-400 rounded-full border border-green-500/50 hover:bg-green-500/30 transition-all duration-300 font-poppins"
                                >
                                    Retour aux articles
                                </Link>
                            </div>
                        </div>
                    </main>
                )}
            </AnimatePresence>
            <Footer />
        </div>
    );
}


