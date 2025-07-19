import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { PortableTextBlock } from "@portabletext/react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import BlogContent from "@/app/components/BlogContent";

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    try {
        const resolvedParams = await params;
        const { slug } = resolvedParams;

        const [post, relatedPosts] = await Promise.all([
            client.fetch<Post | null>(POST_QUERY, { slug }),
            client.fetch<RelatedPost[]>(RELATED_POSTS_QUERY, { slug })
        ]);

        if (!post) {
            return notFound();
        }

        return (
            <div className="font-poppins">
                <Navbar />
                <main className="min-h-screen bg-black pt-20 pb-16">
                    <BlogContent post={post} relatedPosts={relatedPosts} />
                </main>
                <Footer />
            </div>
        );
    } catch (error) {
        console.error('Error fetching post:', error);
        return notFound();
    }
}


