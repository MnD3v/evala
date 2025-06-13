"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "./portable-text-components";

interface BlogContentProps {
    post: {
        title: string;
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
    };
    relatedPosts: Array<{
        _id: string;
        title: string;
        slug: { current: string };
        publishedAt: string;
        mainImage?: string;
    }>;
}

export default function BlogContent({ post, relatedPosts }: BlogContentProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
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

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-poppins leading-tight">
                {post.title}
            </h1>
            <p className="text-gray-400 mb-12 font-poppins text-lg">
                {formatDate(post.publishedAt)}
            </p>

            <article className="prose prose-lg max-w-none prose-invert font-poppins">
                <PortableText 
                    value={post.body} 
                    components={portableTextComponents}
                />
            </article>

            {post.author && (
                <div className="flex items-center gap-4 mt-12 mb-16 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                    {post.author.image?.asset?.url && (
                        <div className="border rounded-full border-white p-1 flex-shrink-0">
                            <Image
                                src={post.author.image.asset.url}
                                alt={post.author.name}
                                width={60}
                                height={50}
                                className="w-[60px] h-[60px] object-cover rounded-full"
                            />
                        </div>
                    )}
                    <div className="flex flex-col justify-center">
                        <p className="font-semibold text-white font-poppins">{post.author.name}</p>
                        {post.author.bio && (
                            <PortableText 
                                value={post.author.bio} 
                                components={portableTextComponents}
                            />
                        )}
                    </div>
                </div>
            )}

            {relatedPosts.length > 0 && (
                <section className="mt-16 pt-8 border-t border-gray-800">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white font-poppins">
                        Autres articles
                    </h2>
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
                                        {formatDate(relatedPost.publishedAt)}
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
    );
} 