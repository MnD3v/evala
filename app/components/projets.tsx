import { motion } from "framer-motion";
import Animations from "./utils/item";

const Projets = () => {
    const projects = [
        { 
            id: 1,
            title: "BATIMENT SCOLAIRE",
            description:
                "CONSTRUCTION D'UN BATIMENT SCOLAIRE DE 03 CLASSES + BUREAU ET MAGASIN A L'EPP NATIGOU (REGION DE LA SAVANE)",
            image: "/image/image.png",
        },
        {
            id: 2,
            title: "VILLA",
            description:
                "CONSTRUCTION D'UNE VILLA R+1 A ATEDA (REGION DE LA KARA)",
            image: "/image/villa.png",
        },
        {
            id: 3,
            title: "USP NADOBA",
            description:
                "REHABILITATION ET EXTENSION DE L'UNITE DE SOINS PERIPHERIQUE (USP) NADOBA (REGION KARA)",
            image: "/image/usp_nadoba.png",
        },
        {
            id:4,
            title: "BLOC PÉDAGOGIQUE CEG PESSIDE",
            description:
                "ACHEVEMENT D'UN BLOC PEDAGOGIQUE COMPOSÉ DE 04 SALLES DE CLASSE + UN BLOC LABORATOIRE ET UN BLOC LATRINE À 6 CABINES AU CEG PESSIDE (PREFECTURE DE LA KERAN)",
            image: "/image/ceg_pesside.png",
        },
        {
            id:5,
            title: "ATELIER CFTP PAGOUDA",
            description:
                "CONSTRUCTION D'UN ATELIER AU COLLEGE TECHNIQUE ET PROFESSIONNEL (CFTP) DE PAGOUDA (PREFECTURE DE LA BINAH)",
            image: "/image/cftp_pagouda.png",
        },
        {
            id:6,
            title: "USP ASSERE",
            description:
                "REHABILITATION ET EXTENSION DE L'UNITE DE SOINS PERIPHERIQUE (USP) ASSERE DANS LA PREFECTURE DE LA BINAH",
            image: "/image/usp_assere.png",
        },
    ];

    return (
        <section style={{ backgroundImage: "url('./images/blog-backlay-1-1-1024x865.jpg')", backgroundSize: "contain" }} className="flex justify-center my-12">
            <div className="max">
                <p>Projets de la compagnie</p>
                <br />
                <p className="text-4xl font-bold font-rubik">PROJETS ACHEVES</p>
                <br />
                <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                    {
                        projects.map((element, index) => {
                            return (
                                <motion.a key={element.title}
                                href={`/projet/${element.id}`}
                                variants={Animations.bottomToTop({ duration: 0.3*index, delay: .6 })}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                >
                                    <div

                                        style={{ backgroundImage: "url('./images/projects/" + (index + 1) + ".png" }}
                                        className="flex flex-col justify-end h-80 w-full ">

                                        <div className=" bg-black/40  w-full flex flex-col align-bottom justify-end text-egreen font-rubik p-6 md:p-9 backdrop-blur-sm">

                                            <p className="text-2xl font-bold font-rubik ">{element.title}</p>
                                            <p className="text-white font-bold">{element.description}</p>

                                        </div>
                                    </div>
                                </motion.a>

                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Projets