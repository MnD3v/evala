import { motion } from 'framer-motion'
import React from 'react'
import Animations from './utils/item'

const Contact = () => {

    const contacts = [{ icon: "c-mail.png", title: "Envoyez nous un mail", description: "cegec2016togo@yahoo.com", buttonText: "Envoyer un mail", link: "mailto::cegec2016togo@yahoo.com" }, { icon: "c-phone.png", title: "Appelez nous", description: "+228 90 73 73 74", buttonText: "Appeler", link: "tel:+228 90 73 73 74" },
    ]
    return (
        <section id="contact" className='flex flex-col items-center justify-center'>

            <div className='flex justify-center'>


            </div>
            <div className='max grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-3'>
                <div>
                    <div className='flex items-center gap-1'> <div className='h-px bg-zinc-800 w-16'></div> <h3>Retrouvez nous</h3> </div>
                    <h1 className='font-abel'>Contactez <span className='text-eorange'>Nous</span></h1>
                    <p>Nous avons des experts en social en direct qui attendent pour vous aider du lundi au vendredi de 7h à 18h</p>
                </div>
                {contacts.map((element) => (
                    <motion.div

                        variants={Animations.bottomToTop({ duration: 0.4 * contacts.indexOf(element) + 0.4, })}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        key={element.icon} className='w-full  rounded-xl flex flex-col p-4 gap-3'>

                        <img src={`/icons/${element.icon}`} alt="" className='h-10 md:h-14 self-start' />

                        <h3>{element.title}</h3>
                        <p style={{ whiteSpace: 'pre-wrap' }} className=''>{element.description} </p>
                        <a href={element.link} target='_blank' className='inline-block px-6 py-3 bg-eorange rounded-md text-white self-start'> Contacter </a>

                    </motion.div>
                ))}  <motion.div

                    variants={Animations.bottomToTop({ duration: 0.4 })}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className='w-full  rounded-xl flex flex-col p-4 gap-3'>

                    <img src={`/icons/c-map.png`} alt="" className='h-10 md:h-14 self-start' />

                    <h3>Adresse</h3>
                    <p style={{ whiteSpace: 'pre-wrap' }} className=''>RN 19 Kara-kabou juste avant l'entrée principale du centre de formation donbosco</p>


                </motion.div>

            </div>
        </section>

    )
}

export default Contact