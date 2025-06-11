import React, { useEffect, } from 'react'
import AppBar from './app_bar'
import { motion } from 'framer-motion';
import Animations from './utils/item';
// import { url } from 'inspector';

const Presentation = () => {

  useEffect(() => {
    // Fonction pour mettre à jour la hauteur
    const updateHeight = () => {
      console.log(window.innerHeight)
    };

    // Définir la hauteur initiale
    updateHeight();

    // Ajouter un écouteur pour gérer les redimensionnements
    window.addEventListener("resize", updateHeight);

    // Nettoyer l'écouteur à la fin
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  return (
    <div
      style={{ backgroundImage: "url('images/bg-1.jpg')", backgroundSize: "cover" }}
      className={`w-[vw] flex flex-col items-center text-white`}>

      {/* <img src="images/bg-1.jpg" alt="" className='absolute z-0'/> */}
      <div
        style={{}}
        className='bg-black/40  relative w-full'>
        <AppBar></AppBar>
        <div className=' flex justify-center'>
          <div className='max mt-9 mb-14 w-full'>
            <motion.p
              variants={Animations.leftToRight({ duration: 0.6, delay: .6 })}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className='text-4xl md:text-[80px] font-rubik font-semibold max-w-[700px]'>
              DU GARÇON
            </motion.p>
            <motion.img
              variants={Animations.scale({ duration: 0.6, delay: .6 })}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}

              className='font-rubik text-[#ff0000] font-black text-5xl md:text-8xl w-[480px] my-12'  src='/images/evala.png'></motion.img>
                  <motion.p
              variants={Animations.leftToRight({ duration: 0.6, delay: .6 })}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className='text-4xl md:text-[83px] font-rubik font-black max-w-[700px]'>
              À L’HOMME
            </motion.p>
        

            <motion.div
              variants={Animations.leftToRight({ duration: 0.6, delay: .6 })}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className='relative items-center'>
              <a href="#contact" className='inline-block px-6 py-4 w-auto bg-eorange font-rubik font-semibold'>
                Commencer la consultation

              </a>
              <div className='h-6 w-2 bg-white absolute top-4'>

              </div>
            </motion.div>

          </div>
        </div>



      </div>









    </div>
  )
}

export default Presentation
