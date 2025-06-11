"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Programme() {
  const [activeDay, setActiveDay] = useState(1);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const programme = [
    {
      day: 1,
      date: "15 Juillet",
      title: "Cérémonie d'Ouverture & Matchs de Poules",
      events: [
        { time: "07:00", title: "Rituels d'ouverture", description: "Cérémonies traditionnelles et bénédictions des lutteurs" },
        { time: "09:00", title: "Défilé des lutteurs", description: "Présentation des participants par canton" },
        { time: "10:30", title: "Poule A - Session 1", description: "Premiers combats des groupes A1 vs A2" },
        { time: "14:00", title: "Poule A - Session 2", description: "Suite des combats A3 vs A4" },
        { time: "16:00", title: "Poule B - Session 1", description: "Premiers combats des groupes B1 vs B2" }
      ]
    },
    {
      day: 2,
      date: "16 Juillet",
      title: "Matchs de Poules - Suite",
      events: [
        { time: "08:00", title: "Rituels du matin", description: "Préparation spirituelle des lutteurs" },
        { time: "09:30", title: "Poule B - Session 2", description: "Suite des combats B3 vs B4" },
        { time: "14:00", title: "Poule C - Session 1", description: "Combats des groupes C1 vs C2" },
        { time: "16:00", title: "Poule C - Session 2", description: "Suite des combats C3 vs C4" }
      ]
    },
    {
      day: 3,
      date: "17 Juillet",
      title: "Derniers Matchs de Poules",
      events: [
        { time: "09:00", title: "Poule D - Session 1", description: "Combats des groupes D1 vs D2" },
        { time: "11:00", title: "Poule D - Session 2", description: "Suite des combats D3 vs D4" },
        { time: "14:00", title: "Matchs de classement", description: "Derniers combats de poules" },
        { time: "17:00", title: "Cérémonie du soir", description: "Annonce des qualifiés pour les phases finales" }
      ]
    },
    {
      day: 4,
      date: "18 Juillet",
      title: "Huitièmes de Finale",
      events: [
        { time: "08:00", title: "Rituels préparatoires", description: "Cérémonies pour les phases finales" },
        { time: "10:00", title: "Premiers huitièmes", description: "Combats 1 à 4" },
        { time: "14:00", title: "Seconds huitièmes", description: "Combats 5 à 8" },
        { time: "18:00", title: "Célébration", description: "Honneur aux qualifiés pour les quarts" }
      ]
    },
    {
      day: 5,
      date: "19 Juillet",
      title: "Quarts de Finale",
      events: [
        { time: "09:00", title: "Cérémonie d'ouverture", description: "Rituels spéciaux pour les quarts de finale" },
        { time: "10:30", title: "Premiers quarts", description: "Combats 1 et 2" },
        { time: "14:30", title: "Seconds quarts", description: "Combats 3 et 4" },
        { time: "17:00", title: "Festivités", description: "Célébration des demi-finalistes" }
      ]
    },
    {
      day: 6,
      date: "20 Juillet",
      title: "Demi-Finales",
      events: [
        { time: "08:00", title: "Rituels matinaux", description: "Préparation spirituelle des demi-finalistes" },
        { time: "10:00", title: "Première demi-finale", description: "Combat entre les vainqueurs des quarts 1 et 2" },
        { time: "15:00", title: "Seconde demi-finale", description: "Combat entre les vainqueurs des quarts 3 et 4" },
        { time: "18:00", title: "Veillée traditionnelle", description: "Préparation spirituelle pour la finale" }
      ]
    },
    {
      day: 7,
      date: "21 Juillet",
      title: "Grande Finale",
      events: [
        { time: "07:00", title: "Rituels sacrés", description: "Cérémonies traditionnelles pour la finale" },
        { time: "10:00", title: "Match pour la 3ème place", description: "Combat entre les perdants des demi-finales" },
        { time: "14:00", title: "Cérémonie pré-finale", description: "Rituels et préparation des finalistes" },
        { time: "15:00", title: "GRANDE FINALE", description: "Combat ultime pour le titre de champion des Evala" },
        { time: "17:00", title: "Cérémonie de clôture", description: "Couronnement du champion et célébrations finales" },
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
            className="text-4xl md:text-6xl font-display mb-4 text-evala tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Programme des Combats
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-evala mx-auto mb-4"
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
          <div className="flex gap-3 md:justify-center min-w-max px-4 pb-4">
            {programme.map((day) => (
              <motion.button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: day.day * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`px-6 py-4 min-w-[140px] transition-all duration-300 ${
                  activeDay === day.day
                    ? "bg-evala text-white border-2 border-evala shadow-lg shadow-evala/20"
                    : "bg-black text-gray-400 border-2 border-evala/20 hover:border-evala/50 hover:text-gray-200"
                }`}
              >
                <div className="text-2xl font-display mb-1">Jour {day.day}</div>
                <div className="text-sm opacity-80">{day.date}</div>
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
                      className="w-12 h-[2px] bg-evala"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="w-2 h-2 bg-evala rotate-45"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    ></motion.div>
                    <motion.div 
                      className="w-12 h-[2px] bg-evala"
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    ></motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {day.events.map((event) => (
                    <motion.div
                      key={event.time}
                      variants={eventVariants}
                      onHoverStart={() => setHoveredEvent(event.time)}
                      onHoverEnd={() => setHoveredEvent(null)}
                      className="relative group"
                    >
                      <motion.div 
                        className="absolute -left-2 top-0 bottom-0 w-[2px] bg-evala/30"
                        variants={timelineVariants}
                      ></motion.div>
                      <motion.div 
                        className="absolute -left-[11px] top-[28px] w-5 h-5 border-2 border-evala bg-black rotate-45"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                      <motion.div 
                        className="pl-8 py-4 transition-all duration-300 hover:bg-black/20 rounded-lg"
                        whileHover={{ x: 10 }}
                      >
                        <motion.time 
                          className="text-evala text-xl font-display inline-block mb-2 px-3 py-1 bg-black/40 rounded relative z-10"
                          animate={hoveredEvent === event.time ? { 
                            scale: 1.05,
                            backgroundColor: "rgba(0, 0, 0, 0.6)"
                          } : { 
                            scale: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.4)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {event.time}
                        </motion.time>
                        <motion.h4 
                          className="text-xl text-white mb-2 font-display tracking-wide"
                          animate={hoveredEvent === event.time ? { x: 10 } : { x: 0 }}
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