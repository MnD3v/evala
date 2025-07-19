"use client"
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

const AppBar = () => {

    const [menuIsOpen, setIsOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)


    useEffect(() => {

        const handleScroll = () => {
            console.log("scring")
            console.log(menuIsOpen)

            setIsOpen(false)
            console.log(menuIsOpen)

        }



        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll)
        }


    }, [menuIsOpen])



    return (
        <div className=''>
            {/* <button onClick={() => {
                setIsOpen(false)
            }}>
                <div
                    className={`${menuIsOpen ? "block" : "hidden"} flex justify-center items-center top-2 right-2 fixed h-8 w-8 bg-black/30 rounded-lg`}>
                    <img src="/icons/close.png" alt="" className='h-3' />
                </div>
            </button> */}
            <motion.div ref={menuRef}
                initial={{ y: -300 }}
                animate={{ y: menuIsOpen ? 0 : -300, transition: { duration: 0.25 } }}
                className='fixed bg-white w-full p-6 text-black z-50'>
                <ul className={`flex flex-col items-center justify-center `}>
                    <a href="#" ><li className="font-openSans font-semibold py-3 px-4"> Accueil</li></a>
                    <a href="#services" ><li className="font-openSans font-semibold py-3 px-4"> Services</li></a>
                    <a href="#blog" ><li className="font-openSans font-semibold py-3 px-4"> Blog</li></a>
                    <a href="/contact" ><li className="font-openSans font-semibold py-3 px-4"> Contatcs</li></a>
                </ul>

            </motion.div>
            <div className='flex justify-center'>
                <div className="max w-full justify-between flex">

                    <img src="/icons/lutte_icon.png" alt="" className="h-16" />
                     <button
                            onClick={() => {

                                setIsOpen((!menuIsOpen))
                                console.log(menuIsOpen)
                            }} >
                            <img src={menuIsOpen ? "/icons/close.png" : "/icons/white-drawer.png"} alt="" className='h-8 w-8 bg-green-600 p-2 rounded-xl black md:hidden' />
                        </button>

                        <div className='flex justify-center'>
                <div className=' w-full hidden md:block bg-black'>

                    <ul className="max flex font-bold font-rubik">
                        <li className=" px-6 py-3"><a href={ "#"}>Accueil</a></li>
                        <li className=" px-6 py-3"><a href={"#services"}>Histoire</a></li>
                        <li className=" px-6 py-3"><a href={ "#a-propos"}>A Propos</a></li>
                        <li className=" px-6 py-3"><a href={ "#contact"}>Contact</a></li>
                    </ul>
                </div>
            </div>

                </div>
            </div>
        
            <div className='flex w-full justify-between md:hidden items-center'>
                <img src="/images/lutte_icon.png" alt="" className="h-12" />
                <button onClick={() => {
                    setIsOpen(true)
                }}>
                    <img src="/icons/menu.png" alt="" className='h-7' />
                </button>
            </div>
        </div>
    )
}

export default AppBar