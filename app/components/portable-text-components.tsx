"use client";

import { PortableTextComponents } from "@portabletext/react";

export const portableTextComponents: PortableTextComponents = {
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
                        alt={value.alt || imageUrl}
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
        h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white font-poppins">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-white font-poppins">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mt-8 mb-3 text-white font-poppins">{children}</h3>,
        normal: ({ children }) => <p className="mb-6 leading-relaxed text-gray-300 font-poppins tracking-wide text-base md:text-lg">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-green-500 pl-6 py-4 my-8 italic text-gray-300 bg-gray-800/50 rounded-r-lg font-poppins text-base md:text-lg">
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
        bullet: ({ children }) => <ul className="list-disc list-inside mb-6 space-y-2 text-gray-300 font-poppins text-base md:text-lg pl-4">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-inside mb-6 space-y-2 text-gray-300 font-poppins text-base md:text-lg pl-4">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="mb-2">{children}</li>,
        number: ({ children }) => <li className="mb-2">{children}</li>,
    },
}; 