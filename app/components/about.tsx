"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-gilroy mb-4 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Festival Evala : Rite Initiatique Kabyè
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-lg prose-invert">
              <h3 className="text-xl md:text-2xl font-gilroy text-festival-red mb-4">Le Rite de Passage des Jeunes Kabyè</h3>
              <p className="text-base md:text-lg text-gray-300 mb-6">
                Le Festival Evala est un rituel sacré de passage à l'âge adulte, transmis depuis des générations dans la préfecture de Kozah, au nord du Togo. Plus qu'une simple compétition de lutte traditionnelle, c'est un parcours initiatique complet qui forge les jeunes hommes à travers plusieurs étapes cruciales de leur développement personnel et social.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "1. Préparation Spirituelle",
                  description: "Les initiés passent par des rituels de purification et de protection. Les sages du village leur transmettent les connaissances ancestrales et les valeurs traditionnelles des Kabyè."
                },
                {
                  title: "2. Entraînement Physique",
                  description: "Pendant plusieurs mois, les futurs lutteurs suivent un entraînement rigoureux. Ils apprennent les techniques de lutte traditionnelle, développent leur force et leur endurance sous la supervision des anciens champions."
                },
                {
                  title: "3. Épreuves de Courage",
                  description: "Les initiés doivent démontrer leur bravoure à travers diverses épreuves : la résistance à la douleur, l'affrontement de leurs peurs, et la maîtrise de soi dans des situations extrêmes."
                },
                {
                  title: "4. Combats Sacrés",
                  description: "Durant une semaine intense, les lutteurs s'affrontent dans des combats qui symbolisent leur capacité à faire face aux défis de la vie. Chaque victoire représente une étape vers la maturité."
                },
                {
                  title: "5. Traditions Kabyè",
                  description: "Les jeunes hommes apprennent les danses rituelles, les chants traditionnels, et l'histoire de leur peuple. Cette transmission culturelle est essentielle pour préserver l'identité de la communauté Kabyè."
                },
                {
                  title: "6. Reconnaissance Sociale",
                  description: "À la fin des Evala, les participants qui ont démontré courage, respect et persévérance sont reconnus comme des hommes à part entière par la communauté. Ils reçoivent les bénédictions des anciens."
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 border border-festival-red/20 rounded-2xl p-6 hover:border-festival-red/50 transition-all duration-300"
                >
                  <h4 className="text-lg md:text-xl font-gilroy text-festival-red mb-2">{step.title}</h4>
                  <p className="text-sm md:text-base text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="prose prose-lg prose-invert">
              <p className="text-base md:text-lg text-gray-300 italic">
                "Le Festival Evala ne crée pas seulement des lutteurs, il forge des hommes responsables, courageux et dévoués à leur communauté. C'est un héritage vivant qui continue de façonner les générations futures des Kabyè."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden">
              <Image
                src="/images/evala-explain.png"
                alt="Festival Evala - Rite Initiatique Kabyè"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
            
            <motion.div
              className="absolute -bottom-6 -right-6 bg-black/90 border border-festival-red p-6 rounded-2xl max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-gilroy text-festival-red mb-2">Héritage Culturel Kabyè</h4>
              <p className="text-gray-300 text-sm">
                Le Festival Evala perpétue une tradition millénaire, préservant les valeurs et la sagesse ancestrale de la région de Kozah au Togo.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
