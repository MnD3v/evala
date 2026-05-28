"use client";

import Link from "next/link";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { portableTextComponents } from "./portable-text-components";
import { ArrowRight, Tag } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface PromotionContentProps {
    promotion: {
        title: string;
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
    };
    relatedPromotions: Array<{
        _id: string;
        title: string;
        slug: { current: string };
        endDate?: string;
        mainImage?: string;
    }>;
}

const ACCENTS = ["#CE1126", "#006A4E", "#8a6d00"];

export default function PromotionContent({ promotion, relatedPromotions }: PromotionContentProps) {
    const hasDate = promotion.startDate || promotion.endDate;

    const dateLabel = promotion.startDate && promotion.endDate
        ? `Du ${format(new Date(promotion.startDate), 'dd MMM', { locale: fr })} au ${format(new Date(promotion.endDate), 'dd MMMM yyyy', { locale: fr })}`
        : promotion.endDate
        ? `Jusqu'au ${format(new Date(promotion.endDate), 'dd MMMM yyyy', { locale: fr })}`
        : promotion.startDate
        ? format(new Date(promotion.startDate), 'dd MMMM yyyy', { locale: fr })
        : null;

    return (
        <>
            {/* ── En-tête vert ── */}
            <div style={{ background: "#006A4E" }}>
                <div className="container mx-auto px-6 md:px-8 max-w-3xl pt-28 pb-10 text-center">

                    {/* Badge date */}
                    {hasDate && dateLabel && (
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
                            style={{ background: "rgba(255,205,0,0.9)" }}>
                            <Tag className="w-3.5 h-3.5 text-black" />
                            <span className="text-[12px] font-semibold text-black">{dateLabel}</span>
                        </div>
                    )}

                    {/* Titre */}
                    <h1
                        className="font-bold text-white leading-tight mb-6"
                        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
                    >
                        {promotion.title}
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

            {/* ── Image principale avec frises tricolores ── */}
            {promotion.mainImage && (
                <div className="container mx-auto px-6 md:px-8 max-w-3xl mb-12" style={{ marginTop: "-60px", position: "relative", zIndex: 10 }}>
                    <div className="h-[5px]" style={{
                        background: "repeating-linear-gradient(90deg, #CE1126 0, #CE1126 22px, #FFCD00 22px, #FFCD00 44px, #006A4E 44px, #006A4E 66px)"
                    }} />
                    <img
                        src={promotion.mainImage}
                        alt={promotion.title}
                        className="w-full h-auto object-cover"
                        style={{ maxHeight: "520px", objectPosition: "center top", display: "block" }}
                    />
                    <div className="h-[5px]" style={{
                        background: "repeating-linear-gradient(90deg, #006A4E 0, #006A4E 22px, #FFCD00 22px, #FFCD00 44px, #CE1126 44px, #CE1126 66px)"
                    }} />
                </div>
            )}

            {/* ── Corps article ── */}
            <div className="container mx-auto px-6 md:px-8 max-w-3xl">
                <article className="pb-16 font-poppins">
                    <PortableText value={promotion.body} components={portableTextComponents} />
                </article>

                {/* Auteur */}
                {promotion.author && (
                    <div
                        className="flex items-start gap-5 p-6 rounded-2xl mb-16"
                        style={{ background: "rgba(0,106,78,0.05)", border: "1px solid rgba(0,106,78,0.15)" }}
                    >
                        {promotion.author.image?.asset?.url && (
                            <img
                                src={promotion.author.image.asset.url}
                                alt={promotion.author.name}
                                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                            />
                        )}
                        <div>
                            <p className="font-bold text-black text-base mb-1">{promotion.author.name}</p>
                            {promotion.author.bio && (
                                <div className="text-black/60 text-sm leading-relaxed">
                                    <PortableText value={promotion.author.bio} components={portableTextComponents} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Promotions liées ── */}
            {relatedPromotions.length > 0 && (
                <div className="border-t border-black/[0.07]" style={{ background: "#F9F9F9" }}>
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl py-16 md:py-20">

                        <p className="text-[10px] font-medium uppercase mb-3" style={{ color: "#CE1126" }}>À saisir aussi</p>
                        <h2 className="font-bold text-black mb-10" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
                            Autres offres
                        </h2>

                        <div className="grid gap-4 md:grid-cols-3">
                            {relatedPromotions.map((promo, i) => (
                                <Link
                                    key={promo._id}
                                    href={`/promotions/${promo.slug.current}`}
                                    className="group block relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-shadow duration-500"
                                    style={{ aspectRatio: "3/4" }}
                                >
                                    {promo.mainImage ? (
                                        <img
                                            src={promo.mainImage}
                                            alt={promo.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center"
                                            style={{ background: "linear-gradient(135deg, #006A4E, #FFCD00)" }}>
                                            <span className="text-7xl font-bold text-white/20 select-none">
                                                {promo.title?.[0] ?? "E"}
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                                        {promo.endDate && (
                                            <p className="text-white/50 text-[11px] uppercase">
                                                Jusqu'au {format(new Date(promo.endDate), 'dd MMM yyyy', { locale: fr })}
                                            </p>
                                        )}
                                        <h3
                                            className="font-bold text-white leading-snug line-clamp-3"
                                            style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)" }}
                                        >
                                            {promo.title}
                                        </h3>
                                        <div
                                            className="flex items-center justify-between pt-3"
                                            style={{ borderTop: `1px solid ${ACCENTS[i % 3]}50` }}
                                        >
                                            <span className="text-xs font-medium" style={{ color: ACCENTS[i % 3] }}>
                                                Voir l'offre
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
