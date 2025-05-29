import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';

const Story = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section 
      id="story"
      ref={ref}
      className="py-20 px-8 md:px-16 lg:px-32 bg-off-white text-dark-gray"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-lora text-dark-gray mb-8"
        >
          The hueneu Story
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl font-poppins text-dark-gray/90 mb-6 leading-relaxed"
        >
          At hueneu, we believe in the quiet power of design. "Hue" represents the vibrant bursts of creativity, the unexpected color that tells a story. "Neu" is the grounding neutrality, the calm canvas that allows these hues to truly sing. 
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl font-poppins text-dark-gray/90 mb-12 leading-relaxed"
        >
          It's a balance – the bold and the understated, the playful and the profound. We craft visual narratives that are both intentional and evocative, designed to resonate deeply and leave a lasting impression.
        </motion.p>

        {/* "Who Knew?" Moment */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, type: "spring", stiffness: 100 }}
          className="mt-12 p-6 bg-amber/10 rounded-lg shadow-lg inline-flex items-center gap-4 border border-amber/30"
        >
          <Sparkles size={36} className="text-amber" />
          <h3 className="text-2xl md:text-3xl font-lora text-amber">
            Who Knew?
          </h3>
          <p className="font-poppins text-dark-gray/80 text-sm md:text-base">
            That design could feel so personal.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
