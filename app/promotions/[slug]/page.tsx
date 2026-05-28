import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { PortableTextBlock } from "@portabletext/react";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import PromotionContent from "@/app/components/PromotionContent";

interface Promotion {
    _id: string;
    title: string;
    slug: { current: string };
    startDate?: string;
    endDate?: string;
    publishedAt?: string;
    mainImage?: string;
    body: PortableTextBlock[];
    author?: {
        name: string;
        bio?: PortableTextBlock[];
        image?: { asset: { url: string } };
    };
}

interface RelatedPromotion {
    _id: string;
    title: string;
    slug: { current: string };
    endDate?: string;
    mainImage?: string;
}

const PROMOTION_QUERY = groq`*[_type == "promotion" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  startDate,
  endDate,
  publishedAt,
  "mainImage": mainImage.asset->url,
  body,
  author->{
    name,
    image { asset->{ url } },
    bio
  }
}`;

const RELATED_QUERY = groq`*[_type == "promotion" && slug.current != $slug && defined(slug.current) && isActive == true]|order(_createdAt desc)[0...3]{
  _id,
  title,
  slug,
  endDate,
  "mainImage": mainImage.asset->url
}`;

export default async function PromotionPage({ params }: { params: { slug: string } }) {
    try {
        const { slug } = await params;

        const [promotion, relatedPromotions] = await Promise.all([
            client.fetch<Promotion | null>(PROMOTION_QUERY, { slug }),
            client.fetch<RelatedPromotion[]>(RELATED_QUERY, { slug }),
        ]);

        if (!promotion) return notFound();

        return (
            <div className="font-poppins">
                <Navbar />
                <main className="min-h-screen bg-white">
                    <PromotionContent promotion={promotion} relatedPromotions={relatedPromotions} />
                </main>
                <Footer />
            </div>
        );
    } catch {
        return notFound();
    }
}
