import { client } from "@/sanity/client";
import { Metadata } from "next";
import { groq } from "next-sanity";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "mainImage": mainImage.asset->url,
}`;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const resolvedParams = await params;
        const { slug } = resolvedParams;
        const post = await client.fetch(POST_QUERY, { slug });

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