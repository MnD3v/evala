import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, PortableTextBlock, PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

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

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const ref = value?.asset?._ref;
      if (!ref) return null;

      const url = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${ref.replace('image-', '').replace(/-(jpg|png|webp)/, '.$1')}`;

      return (
        <figure className="my-8">
          <img src={url} alt={url} className="w-full h-auto rounded-lg shadow-lg" loading="lazy" />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-400 mt-2 italic">{value.caption}</figcaption>
          )}
        </figure>
      );
    }
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 text-white font-sans">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-white font-sans">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-3 text-white font-sans">{children}</h3>,
    normal: ({ children }) => <p className="mb-6 leading-relaxed text-gray-300 font-sans tracking-wide">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green-500 pl-6 py-4 my-8 italic text-gray-300 bg-gray-800/50 rounded-r-lg font-sans text-lg">{children}</blockquote>
    )
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white font-sans">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-300 font-sans">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-green-400 hover:text-green-300 underline transition-colors font-sans"
      >
        {children}
      </a>
    )
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300 font-sans text-lg pl-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300 font-sans text-lg pl-4">{children}</ol>
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>
  }
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
    image { asset->{ url } },
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
    const post = await client.fetch<Post | null>(POST_QUERY, { slug: params.slug });

    if (!post) return {};

    const description = "Découvrez notre dernier article de blog.";

    return {
      title: post.title,
      description,
      openGraph: {
        title: post.title,
        description,
        images: post.mainImage ? [{ url: post.mainImage }] : []
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: post.mainImage ? [post.mainImage] : []
      }
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Article de blog",
      description: "Découvrez notre dernier article de blog."
    };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  try {
    const [post, relatedPosts] = await Promise.all([
      client.fetch<Post | null>(POST_QUERY, { slug: params.slug }),
      client.fetch<RelatedPost[]>(RELATED_POSTS_QUERY, { slug: params.slug })
    ]);

    if (!post) return notFound();

    return (
      <div className="font-sans">
        <Navbar />
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

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-sans leading-tight">{post.title}</h1>
            <p className="text-gray-400 mb-12 font-sans text-lg">{new Date(post.publishedAt).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}</p>

            <article className="prose prose-lg max-w-none prose-invert font-sans">
              <PortableText value={post.body} components={portableTextComponents} />
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
                  <p className="font-semibold text-white font-sans">{post.author.name}</p>
                  {post.author.bio && (
                    <div className="text-sm text-gray-400 font-sans">
                      <PortableText value={post.author.bio} components={portableTextComponents} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-8 border-t border-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-center text-white font-sans">Autres articles</h2>
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
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-white group-hover:text-green-400 transition-colors font-sans">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3 font-sans">
                          {new Date(relatedPost.publishedAt).toLocaleDateString('fr-FR', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </p>
                        <p className="text-green-400 text-sm font-medium group-hover:text-green-300 transition-colors">Lire l'article →</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return notFound();
  }
}
