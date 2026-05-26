"use client";

import { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;

            const imageUrl = value.asset._ref
                ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${value.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`
                : '';

            return (
                <figure className="my-12 -mx-4 md:-mx-8">
                    <img
                        src={imageUrl}
                        alt={value.alt || ""}
                        className="w-full h-auto rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.1)]"
                        loading="lazy"
                    />
                    {value.caption && (
                        <figcaption className="text-center text-xs text-black/40 mt-3 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
    block: {
        h1: ({ children }) => (
            <h1 className="font-bold text-black mt-14 mb-5 leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)" }}>
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="font-bold text-black mt-12 mb-4 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.85rem)" }}>
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-semibold text-black mt-10 mb-3 leading-tight"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
                {children}
            </h3>
        ),
        normal: ({ children }) => (
            <p className="text-black/80 mb-6 leading-relaxed text-base">
                {children}
            </p>
        ),
        blockquote: ({ children }) => (
            <blockquote
                className="relative pl-7 py-1 my-8 italic text-black/70 leading-relaxed text-base"
                style={{ borderLeft: "3px solid #CE1126" }}
            >
                {children}
            </blockquote>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="font-bold text-black">{children}</strong>
        ),
        em: ({ children }) => (
            <em className="italic" style={{ color: "#CE1126" }}>{children}</em>
        ),
        link: ({ value, children }) => (
            <a
                href={value?.href}
                target={value?.blank ? "_blank" : "_self"}
                rel={value?.blank ? "noopener noreferrer" : undefined}
                className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
                style={{ color: "#CE1126", textDecorationColor: "rgba(206,17,38,0.35)" }}
            >
                {children}
            </a>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="mb-6 space-y-2 pl-6 text-black/80 leading-relaxed text-base"
                style={{ listStyleType: "disc" }}>
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="mb-6 space-y-2 pl-6 text-black/80 leading-relaxed text-base"
                style={{ listStyleType: "decimal" }}>
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => <li className="mb-1">{children}</li>,
        number: ({ children }) => <li className="mb-1">{children}</li>,
    },
};
