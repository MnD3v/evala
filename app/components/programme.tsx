"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Programme() {
  const [activeDay, setActiveDay] = useState(1);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const programme = [
    {
      day: 1,
      date: "19 Juillet",
      title: "Début des Evala",
      events: [
        { time: "07:00", title: "Rituels d'ouverture", description: "Cérémonies traditionnelles et bénédictions des lutteurs" },
        { time: "09:00", title: "Défilé des lutteurs", description: "Présentation des participants par canton" },
        { time: "10:30", title: "Début des combats", description: "Premiers affrontements de la journée" },
        { time: "17:00", title: "Cérémonie du soir", description: "Célébrations et rituels de clôture du premier jour" }
      ]
    },
    {
      day: 2,
      date: "20 Juillet",
      title: "Deuxième Journée",
      events: [
        { time: "08:00", title: "Rituels du matin", description: "Préparation spirituelle des lutteurs" },
        { time: "09:30", title: "Combats de la matinée", description: "Suite des affrontements" },
        { time: "14:00", title: "Combats de l'après-midi", description: "Poursuite des luttes" },
        { time: "17:00", title: "Célébrations", description: "Festivités de fin de journée" }
      ]
    },
    {
      day: 3,
      date: "21 Juillet",
      title: "Troisième Journée",
      events: [
        { time: "À déterminer", title: "Village de Lutte", description: "Le lieu et le programme exact seront communiqués ultérieurement" }
      ]
    },
    {
      day: 4,
      date: "22 Juillet",
      title: "Quatrième Journée",
      events: [
        { time: "À déterminer", title: "Village de Lutte", description: "Le lieu et le programme exact seront communiqués ultérieurement" }
      ]
    },
    {
      day: 5,
      date: "23 Juillet",
      title: "Cinquième Journée",
      events: [
        { time: "À déterminer", title: "Village de Lutte", description: "Le lieu et le programme exact seront communiqués ultérieurement" }
      ]
    },
    {
      day: 6,
      date: "24 Juillet",
      title: "Sixième Journée",
      events: [
        { time: "À déterminer", title: "Village de Lutte", description: "Le lieu et le programme exact seront communiqués ultérieurement" }
      ]
    },
    {
      day: 7,
      date: "25 Juillet",
      title: "Septième Journée",
      events: [
        { time: "À déterminer", title: "Village de Lutte", description: "Le lieu et le programme exact seront communiqués ultérieurement" }
      ]
    },
    {
      day: 8,
      date: "26 Juillet",
      title: "Huitième Journée",
      events: [
        { time: "À déterminer", title: "Village de Lutte", description: "Le lieu et le programme exact seront communiqués ultérieurement" }
      ]
    },
    {
      day: 9,
      date: "27 Juillet",
      title: "Grande Finale",
      events: [
        { time: "07:00", title: "Rituels sacrés", description: "Cérémonies traditionnelles pour la finale" },
        { time: "10:00", title: "Préparatifs", description: "Derniers préparatifs pour les finales" },
        { time: "14:00", title: "Finales", description: "Combats finaux des Evala" },
        { time: "17:00", title: "Cérémonie de clôture", description: "Couronnement des vainqueurs et célébrations finales" },
        { time: "19:00", title: "Grande fête traditionnelle", description: "Célébration avec tout le village" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const eventVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      scale: 0.95
    },
    show: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const timelineVariants = {
    hidden: { height: 0 },
    show: { 
      height: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden" id="programme">
      {/* Motif traditionnel en arrière-plan avec animation */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      >
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF0000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-display mb-4 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Programme des Combats
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto font-montserrat"
          >
            Suivez le déroulement des Evala jour après jour
          </motion.p>
        </motion.div>

        {/* Navigation des jours avec animation */}
        <div className="overflow-x-auto mb-12">
          <div className="flex gap-4 md:justify-center min-w-max px-4 pb-4">
            {programme.map((day) => (
              <motion.button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: day.day * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 py-4 min-w-[160px] rounded-2xl transition-all duration-300 overflow-hidden ${
                  activeDay === day.day
                    ? "bg-gradient-to-br from-festival-red to-festival-yellow text-white shadow-lg shadow-festival-red/20"
                    : "bg-black/80 text-gray-400 border border-festival-red/20 hover:border-festival-red/50 hover:text-gray-200"
                }`}
              >
                <div className="relative z-10">
                  <div className="text-2xl font-display mb-1">Jour {day.day}</div>
                  <div className="text-sm opacity-80">{day.date}</div>
                </div>
                {activeDay === day.day && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-festival-red/20 to-black/20"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contenu du jour avec animations */}
        <AnimatePresence mode="wait">
          {programme.map((day) => (
            day.day === activeDay && (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <motion.div 
                  className="text-center mb-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-3xl md:text-4xl font-display text-white mb-4">{day.title}</h3>
                  <div className="flex items-center justify-center gap-4">
                    <motion.div 
                      className="h-[2px] bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red flex-1 max-w-[100px]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="w-3 h-3 bg-black border-2 border-festival-red rotate-45 ring-4 ring-festival-red/20"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 45 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    ></motion.div>
                    <motion.div 
                      className="h-[2px] bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red flex-1 max-w-[100px]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    ></motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {day.events.map((event, ) => (
                    <motion.div
                      key={event.time}
                      variants={eventVariants}
                      onHoverStart={() => setHoveredEvent(event.time)}
                      onHoverEnd={() => setHoveredEvent(null)}
                      className="relative group"
                    >
                      <motion.div 
                        className="absolute -left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-festival-red via-festival-red to-festival-red opacity-30"
                        variants={timelineVariants}
                      ></motion.div>
                      <motion.div 
                        className="absolute -left-[11px] top-[28px] w-5 h-5 border-2 border-festival-red bg-black rotate-45 shadow-[0_0_10px_rgba(255,68,68,0.2)]"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                      <motion.div 
                        className="pl-8 py-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-black/40 hover:to-transparent rounded-2xl"
                        whileHover={{ x: 10 }}
                      >
                        <motion.time 
                          className="text-festival-yellow text-xl font-display inline-block mb-3 px-4 py-1.5 bg-black/80 rounded-xl relative z-10 border border-festival-red/20"
                          animate={hoveredEvent === event.time ? { 
                            scale: 1.05,
                            backgroundColor: "rgba(0, 0, 0, 0.9)"
                          } : { 
                            scale: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.8)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {event.time}
                        </motion.time>
                        <motion.h4 
                          className="text-2xl text-white mb-3 font-display tracking-wide"
                          animate={hoveredEvent === event.time ? { x: 10, color: "#FF4444" } : { x: 0, color: "#FFFFFF" }}
                        >
                          {event.title}
                        </motion.h4>
                        <motion.p 
                          className="text-gray-400 leading-relaxed"
                          initial={{ opacity: 0.7 }}
                          animate={hoveredEvent === event.time ? { opacity: 1 } : { opacity: 0.7 }}
                        >
                          {event.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
} 