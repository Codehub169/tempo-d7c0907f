import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Feather } from 'lucide-react'; // Using Feather as a symbol of lightness and storytelling

const WhyHueneu = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section 
      id="why-hueneu"
      ref={ref}
      className="py-20 px-8 md:px-16 lg:px-32 bg-off-white text-dark-gray"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="mb-8 inline-block"
        >
          <Feather size={48} className="text-amber" />
        </motion.div>

        <motion.h2 
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...textVariants.visible.transition, delay: 0.3 }}
          className="text-3xl md:text-4xl font-lora text-dark-gray mb-10"
        >
          Why hueneu?
        </motion.h2>
        
        <motion.p 
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...textVariants.visible.transition, delay: 0.5 }}
          className="text-xl md:text-2xl font-poppins text-dark-gray/90 mb-6 leading-relaxed italic"
        >
          “We don’t just design—we decode stories.”
        </motion.p>
        
        <motion.p 
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...textVariants.visible.transition, delay: 0.7 }}
          className="text-xl md:text-2xl font-poppins text-dark-gray/90 mb-12 leading-relaxed italic"
        >
          “Designs that speak quietly but stay with you.”
        </motion.p>

        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...textVariants.visible.transition, delay: 0.9 }}
        >
          <p className="font-poppins text-lg text-dark-gray/80 leading-relaxed">
            We embrace the calm, the mysterious, and the beautifully balanced. Our approach is rooted in understanding your narrative, translating its essence into visuals that are not just seen, but felt. With hueneu, design becomes a quiet conversation, an intriguing journey, and a reflection of true substance.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyHueneu;
