"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { NavigationOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

const DetailsProjet = () => {

    const { id } = useParams<{ id: string }>();

    const projects = [
        {
            id: 1,
            title: "BATIMENT SCOLAIRE",
            description:
                "CONSTRUCTION D'UN BATIMENT SCOLAIRE DE 03 CLASSES + BUREAU ET MAGASIN A L'EPP NATIGOU (REGION DE LA SAVANE)",
            images: ["1"],
        },
        {
            id: 2,
            title: "VILLA",
            description:
                "CONSTRUCTION D'UNE VILLA R+1 A ATEDA (REGION DE LA KARA)",
            images: ["2.1", "2.2",],

        },
        {
            id: 3,
            title: "USP NADOBA",
            description:
                "REHABILITATION ET EXTENSION DE L'UNITE DE SOINS PERIPHERIQUE (USP) NADOBA (REGION KARA)",
            images: ["3.1", "3.2", "3.3"],

        },
        {
            id: 4,
            title: "BLOC PÉDAGOGIQUE CEG PESSIDE",
            description:
                "ACHEVEMENT D'UN BLOC PEDAGOGIQUE COMPOSÉ DE 04 SALLES DE CLASSE + UN BLOC LABORATOIRE ET UN BLOC LATRINE À 6 CABINES AU CEG PESSIDE (PREFECTURE DE LA KERAN)",
            images: ["4.1", "4.2", "4.3"],

        },
        {
            id: 5,
            title: "ATELIER CFTP PAGOUDA",
            description:
                "CONSTRUCTION D'UN ATELIER AU COLLEGE TECHNIQUE ET PROFESSIONNEL (CFTP) DE PAGOUDA (PREFECTURE DE LA BINAH)",
            images: ["5.1"],

        },
        {
            id: 6,
            title: "USP ASSERE",
            description:
                "REHABILITATION ET EXTENSION DE L'UNITE DE SOINS PERIPHERIQUE (USP) ASSERE DANS LA PREFECTURE DE LA BINAH",
            images: ["6.1", "6.2", "6.3", "6.4", "6.5"],
        },
    ];



    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    const [project, setProject] = useState<{ title: string; description: string; images: string[]; } | undefined>(undefined);

    useEffect(() => {
        if (!project) { // ⚠️ Évite de réassigner si project est déjà défini
            const _project = projects.find((element) => element.id == parseInt(id));
            setProject(_project);
        }
    }, [id, project]);

    return (
        <div className="relative flex flex-col items-center overflow-hidden">
            {
              !project &&     (<div className='loader h-9 w-9 md:h-16 md:w-16 m-32'></div>)
            }
        {   
            project && (
                <div>
                     <div className="max">
            <h1 className=' my-6 font-bricolage text-center text-2xl md:text-4xl font-black font-rubik'>{project.title}</h1>
            <Swiper

                modules={[Navigation, Pagination]}  // On spécifie les modules utilisés
                slidesPerView={1}
                loop={true}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                pagination={{
                    clickable: true,
                }}
                onBeforeInit={(swiper) => {
                    // Vérifie que swiper.params.navigation est un objet (non juste "true")
                    if (typeof swiper.params.navigation === 'object') {
                        // On "cast" (coerce) pour dire à TypeScript que c'est un objet avec des propriétés
                        (swiper.params.navigation as NavigationOptions).prevEl = prevRef.current;
                        (swiper.params.navigation as NavigationOptions).nextEl = nextRef.current;
                    }
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                className=""
            >
                {
                    project!.images.map((element) => (
                        <SwiperSlide
                            key={element}
                            className="cursor-pointer">
                            <a 
                            href={`/images/projects/${element}.png`}
                            className='flex flex-col items-center sm:flex-row justify-center gap-6 pb-10'>

                            <img src={`/images/projects/${element}.png`} alt="" className="h-[400px] md:h-[500px] object-cover w-lvw max-w-[900px]"/>
                            </a>
                        </SwiperSlide>
                    ))
                }


            </Swiper >
        </div >


        {/* Boutons de navigation */}
        <div className="flex gap-2 justify-center my-6" >
            <div ref={prevRef} className="flex items-center justify-center h-8 w-12 rounded-full border shadow-md bg-black cursor-pointer"> <img src="/icons/arrow-go.png" alt="" className="h-5 rotate-180 " /></div>
            <div ref={nextRef} className="flex items-center justify-center h-8 w-12 rounded-full border shadow-md bg-black cursor-pointer"> <img src="/icons/arrow-go.png" alt="" className="h-5" /></div>
        </div>

                </div>
            )
        }

    </div >
    );
};

export default DetailsProjet;


