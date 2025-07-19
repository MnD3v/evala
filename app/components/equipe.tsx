import { motion } from 'framer-motion'
import React from 'react'
import Animations from './utils/item'

const Equipe = () => {
    const membres = [ { image: "./images/equipe/equipe-1.png", poste: "Dr, Consultant formateur, Stratégie Marketing", nom: "Luc MAGREBE", telephone: "+228 98 98 98 98" },
        { image: "./images/equipe/equipe-1.png", poste: "Dr, Consultant formateur, Stratégie Marketing", nom: "Luc MAGREBE", telephone: "+228 98 98 98 98" },
        { image: "./images/equipe/equipe-1.png", poste: "Dr, Consultant formateur, Stratégie Marketing", nom: "Luc MAGREBE", telephone: "+228 98 98 98 98" },
        { image: "./images/equipe/equipe-1.png", poste: "Dr, Consultant formateur, Stratégie Marketing", nom: "Luc MAGREBE", telephone: "+228 98 98 98 98" },
    ]
    return (
        <div className='flex justify-center'>
            <div className='max my-10 font-rubik flex flex-col items-center'>
              <p>NOTRE EQUIPE</p>
              <p className=' text-3xl md:text-5xl font-bold'>NOS EXPERTS</p>
              <br />
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {
                        membres.map((element, index) => (
                            <div key={index} className='flex flex-col border border-eorange font-rubik items-center'>
                          
                                <div className='p-5 w-80'>
                                    <motion.p
                                        viewport={{ once: true }}

                                        variants={Animations.bottomToTop({ duration: 0.5, distance: 19 })}
                                        initial="hidden"
                                        whileInView="show"

                                        className='font-bricolage font-black text-xl md:text-2xl'>{element.nom}</motion.p>

                                    <motion.p
                                        viewport={{ once: true }}

                                        variants={Animations.leftToRight({ duration: 0.7, distance: 19, inverse: true })}
                                        initial="hidden"
                                        whileInView="show"

                                        className='text-eorange'> {element.poste}</motion.p>
                                      <div className='flex my-2 gap-3'>
                                        <img src="/icons/phone-icon.svg" alt="" className='h-6'/>
                                      <p className='font-black'>{element.telephone}</p>
                                      </div>
                                 
                                </div>
                                <motion.img
                                    viewport={{ once: true }}

                                    variants={Animations.bottomToTop({ duration: 0.5 * membres.indexOf(element), distance: 19 })}
                                    initial="hidden"
                                    whileInView="show"

                                    src={element.image} alt="" className='w-56 object-contain' />
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Equipe