import React from 'react'

const Chiffres = () => {

    const chiffres = [
        { titre: "10+", subtitre: "Projets", description: " ont été correctements realisés par CEGEC" },
        { titre: "10", subtitre: "ans", description: " d'impact et de croissance continue dans la construction" },
        { titre: "98", subtitre: "%", description: "de satisfaction de nos clients devient 98% de nos clients se déclarent pleinement satisfaits des services et des résultats obtenus" },
    ]
    return (
        <div
            style={{ backgroundImage: "url('/images/chiffres.jpg')" }}
            className='flex  justify-center my-10 '>
            <div className='bg-black/60 w-full text-white font-rubik flex justify-center py-8'>
                <div className=' max w-full flex flex-wrap gap-4 justify-between max-md:justify-center font-bricolage text-center  capitalize p-4'>

                    {
                        chiffres.map((element) => (
                            <div key={element.titre} className='w-72 flex flex-col items-center font-black text-[#96E903]'>
                                <h1 className='text-6xl'>{element.titre} <span className='text-2xl font-syne'>{element.subtitre}</span></h1>
                                <p className='font-semibold text-zinc-300'>{element.description}</p>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}

export default Chiffres