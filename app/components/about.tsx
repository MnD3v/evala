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
            className="text-4xl md:text-6xl font-display mb-4 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Qu'est-ce que Evala ?
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-festival-red via-festival-yellow to-festival-red mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-lg prose-invert">
              <h3 className="text-2xl font-display text-festival-red mb-4">Le Chemin vers l'Âge Adulte</h3>
              <p className="text-gray-300 mb-6">
                Les Evala représentent un rituel sacré de passage, transmis de génération en génération dans la préfecture de Kozah, au nord du Togo. Ce n'est pas une simple compétition, mais un parcours initiatique complet qui forge les jeunes hommes à travers plusieurs étapes cruciales.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "1. La Préparation Spirituelle",
                  description: "Avant les combats, les initiés passent par des rituels de purification et de protection. Les sages du village leur transmettent les connaissances ancestrales et les valeurs traditionnelles."
                },
                {
                  title: "2. L'Entraînement Physique",
                  description: "Pendant plusieurs mois, les futurs lutteurs suivent un entraînement rigoureux. Ils apprennent les techniques de lutte, développent leur force et leur endurance sous la supervision des anciens champions."
                },
                {
                  title: "3. Les Épreuves de Courage",
                  description: "Les initiés doivent démontrer leur bravoure à travers diverses épreuves : la résistance à la douleur, l'affrontement de leurs peurs, et la maîtrise de soi dans des situations extrêmes."
                },
                {
                  title: "4. Les Combats Sacrés",
                  description: "Durant une semaine intense, les lutteurs s'affrontent dans des combats qui symbolisent leur capacité à faire face aux défis de la vie. Chaque victoire représente une étape vers la maturité."
                },
                {
                  title: "5. L'Apprentissage des Traditions",
                  description: "Les jeunes hommes apprennent les danses rituelles, les chants traditionnels, et l'histoire de leur peuple. Cette transmission culturelle est essentielle pour préserver l'identité de la communauté."
                },
                {
                  title: "6. La Reconnaissance Sociale",
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
                  <h4 className="text-xl font-display text-festival-red mb-2">{step.title}</h4>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="prose prose-lg prose-invert">
              <p className="text-gray-300 italic">
                "Les Evala ne créent pas seulement des lutteurs, ils forgent des hommes responsables, courageux et dévoués à leur communauté. C'est un héritage vivant qui continue de façonner les générations futures."
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
                alt="Evala Tradition"
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
              <h4 className="text-lg font-display text-festival-red mb-2">Un Héritage Millénaire</h4>
              <p className="text-gray-300 text-sm">
                Les Evala perpétuent une tradition qui remonte à des générations, préservant les valeurs et la sagesse ancestrale de la région de Kozah.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
