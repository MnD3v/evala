import { motion } from 'framer-motion'
import React from 'react'
import Animations from './utils/item'

const Services = () => {
    const projectPhases = [
        {
            title: "L’Administration",
            description:
                "L'administration joue un rôle clé dans la gestion des ressources, la coordination et la prise de décision stratégique.",
        },
        {
            title: "La Gérance de projet",
            description:
                "La gérance de projet assure la planification, l'organisation et le suivi des différentes étapes du projet.",
        },
        {
            title: "L’Estimation",
            description:
                "L'estimation permet d'évaluer les coûts, les délais et les ressources nécessaires pour mener à bien le projet.",
        },
        {
            title: "La Construction (exécution)",
            description:
                "La phase de construction (exécution) consiste à mettre en œuvre les travaux conformément aux plans et aux spécifications.",
        },
    ];
    const fonctionnalites = [
        {
            icon: "/icons/service-icon-1-1.svg",
            title: "Genie civil",
            description: "Nous mettons à votre disposition une équipe complète de spécialiste pour la réalisation de vos projets de construction de batiment garantissant qualité, pérennité  et respect de délai d'exécution.",
        },
        {
            icon: "/icons/forage.png",
            title: "Forage",
            description: "De l'étude géotechnique et hydrogéologique a la foration et équipement adapté de vos forages, laissez vous guider par nos experts.",
        },
        {
            icon: "/icons/espace-vert.png",
            title: "ESPACE VERT",
            description: "Es ce que vous saviez que l'espace vert réduit le stress et améliore le bien être? Et bien ne ratez pas l'opportunité d'avoir un petit jardin dans votre maison avec des plantes a vertu spéciale que nos jardinier porterons a votre connaissance pour une mise en œuvre.",
        },
        {
            icon: "/icons/service-icon-1-3.svg",
            title: "MATERIEL ET EQUIPEMENT",
            description: "Le matériel a une importance capital dans la réussite des projets.. c'est pour ça qu'à CEGEC nous mettrons a la disposition des projets que vous nous confierait un matériel adapté, suffisent et de pointe.",
        }
    ];

    return (
        <section id='fonctionnalites' className='flex justify-center text-center bg-orange-100/30 py-6 md:py-16'>

            <div className='max flex flex-col items-center'>
                <p

                    className='md:text-xl font-roboto text-e_orange text-center font-rubik'>OPPORTUNITÉ DE SERVICE DE QUALITÉ
                </p>
                <motion.div
                    variants={Animations.scale({ duration: 0.7, })}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}

                    className=' flex items-center gap-2 my-4 font-rubik'>


                    <p

                        className='text-3xl md:text-5xl font-roboto text-e_orange font-black'>NOS SERVICES
                    </p>

                </motion.div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                    {
                        fonctionnalites.map((element) =>
                        (
                            <motion.div
                                key={element.icon}
                                variants={Animations.scale({ duration: 0.1 })}
                                style={{ backgroundImage: "url('./images/service-block-bg.png/')" }}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}

                                className='m-2 flex flex-col items-center  px-4 py-9 gap-7 border'
                            >

                                <img src={element.icon} alt="" className='h-16' />

                                <p className='text-xl font-bold'>
                                    {element.title}

                                </p>

                                {element.description}
                            </motion.div>
                        ))
                    }



                </div>
                <motion.p 
                 variants={Animations.scale({ duration: 0.6, delay: .6 })}
                 initial="hidden"
                 whileInView="show"
                 viewport={{ once: true }}
                className='text-3xl md:text-5xl self-start mt-9 mb-6 font-rubik font-black'>DIVISIONS</motion.p>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {projectPhases.map((phase, index) => (
                    <motion.div
                    variants={Animations.leftToRight({ duration: 0.3*index, delay: .6 })}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    key={index} className="relative text-start">
                      
                     <div className='p-6 flex flex-col items-start'>   <p className='text-6xl font-rubik font-bold text-black/30'>{index+1}</p>
                       <h2 className="text-lg font-bold font-rubik">{phase.title}</h2>
                     
                        <p className="text-gray-700">{phase.description}</p></div>
                   <div className='border-l-4 border-t-4 w-12 h-6 absolute top-0 border-eorange'>

                   </div>
                    </motion.div>
                ))}
              </div>
            </div>
        </section>
    )
}

export default Services
