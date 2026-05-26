"use client";

import Link from "next/link";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "./portable-text-components";
import { ArrowRight } from "lucide-react";

interface BlogContentProps {
    post: {
        title: string;
        publishedAt: string;
        mainImage?: string;
        body: PortableTextBlock[];
        author?: {
            name: string;
            bio?: PortableTextBlock[];
            image?: { asset: { url: string } };
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

const ACCENTS = ["#CE1126", "#006A4E", "#8a6d00"];

export default function BlogContent({ post, relatedPosts }: BlogContentProps) {
    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("fr-FR", {
            day: "numeric", month: "long", year: "numeric",
        });

    return (
        <>
            {/* ── En-tête vert ── */}
            <div style={{ background: "#006A4E" }}>
                <div className="container mx-auto px-6 md:px-8 max-w-3xl pt-28 pb-10 text-center">

                    {/* Titre */}
                    <h1
                        className="font-bold text-white leading-tight mb-6"
                        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
                    >
                        {post.title}
                    </h1>

                </div>

                {/* Zigzag tricolore bas */}
                <svg width="100%" height="16" viewBox="0 0 90 16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="0,0 15,16 30,0" fill="#CE1126" />
                    <polygon points="30,0 45,16 60,0" fill="#FFCD00" />
                    <polygon points="60,0 75,16 90,0" fill="#CE1126" />
                    <polygon points="0,16 15,0 0,0" fill="#006A4E" />
                    <polygon points="15,16 30,0 45,16" fill="#FFCD00" />
                    <polygon points="45,16 60,0 75,16" fill="#006A4E" />
                    <polygon points="75,16 90,0 90,16" fill="#FFCD00" />
                </svg>
            </div>

            {/* ── Image principale avec frise traditionnelle ── */}
            {post.mainImage && (
                <div className="container mx-auto px-6 md:px-8 max-w-3xl mb-12" style={{ marginTop: "-60px", position: "relative", zIndex: 10 }}>
                    {/* Frise haut */}
                    <div className="h-[5px]" style={{
                        background: "repeating-linear-gradient(90deg, #CE1126 0, #CE1126 22px, #FFCD00 22px, #FFCD00 44px, #006A4E 44px, #006A4E 66px)"
                    }} />
                    <img
                        src={post.mainImage}
                        alt={post.title}
                        className="w-full h-auto object-cover"
                        style={{ maxHeight: "520px", objectPosition: "center top", display: "block" }}
                    />
                    {/* Frise bas — ordre inversé */}
                    <div className="h-[5px]" style={{
                        background: "repeating-linear-gradient(90deg, #006A4E 0, #006A4E 22px, #FFCD00 22px, #FFCD00 44px, #CE1126 44px, #CE1126 66px)"
                    }} />
                </div>
            )}

            {/* ── Corps article ── */}
            <div className="container mx-auto px-6 md:px-8 max-w-3xl">
                <article className="pb-16 font-poppins">
                    <PortableText value={post.body} components={portableTextComponents} />
                </article>

                {/* Auteur */}
                {post.author && (
                    <div
                        className="flex items-start gap-5 p-6 rounded-2xl mb-16"
                        style={{ background: "rgba(0,106,78,0.05)", border: "1px solid rgba(0,106,78,0.15)" }}
                    >
                        {post.author.image?.asset?.url && (
                            <img
                                src={post.author.image.asset.url}
                                alt={post.author.name}
                                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                            />
                        )}
                        <div>
                            <p className="font-bold text-black text-base mb-1">{post.author.name}</p>
                            {post.author.bio && (
                                <div className="text-black/60 text-sm leading-relaxed">
                                    <PortableText value={post.author.bio} components={portableTextComponents} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Articles liés ── */}
            {relatedPosts.length > 0 && (
                <div className="border-t border-black/[0.07]" style={{ background: "#F9F9F9" }}>
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl py-16 md:py-20">

                        <p className="text-[10px] font-medium uppercase mb-3" style={{ color: "#CE1126" }}>À lire aussi</p>
                        <h2 className="font-bold text-black mb-10" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
                            Autres articles
                        </h2>

                        <div className="grid gap-4 md:grid-cols-3">
                            {relatedPosts.map((rp, i) => (
                                <Link
                                    key={rp._id}
                                    href={`/blog/${rp.slug.current}`}
                                    className="group block relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-shadow duration-500"
                                    style={{ aspectRatio: "3/4" }}
                                >
                                    {rp.mainImage ? (
                                        <img
                                            src={rp.mainImage}
                                            alt={rp.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                            <span className="text-7xl font-bold text-black/10 select-none">
                                                {rp.title?.[0] ?? "E"}
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                                        {rp.publishedAt && (
                                            <p className="text-white/50 text-[11px] uppercase">
                                                {formatDate(rp.publishedAt)}
                                            </p>
                                        )}
                                        <h3
                                            className="font-bold text-white leading-snug line-clamp-3"
                                            style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
                                        >
                                            {rp.title}
                                        </h3>
                                        <div
                                            className="flex items-center justify-between pt-3"
                                            style={{ borderTop: `1px solid ${ACCENTS[i % 3]}50` }}
                                        >
                                            <span className="text-xs font-medium" style={{ color: ACCENTS[i % 3] }}>
                                                Lire l'article
                                            </span>
                                            <ArrowRight
                                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                                                style={{ color: ACCENTS[i % 3] }}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}
