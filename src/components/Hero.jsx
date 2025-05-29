import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import hueneuLogo from '../assets/hueneu-logo.svg'; // Assuming this will be created as per file structure

const Hero = () => {
  return (
    <section 
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-off-white relative overflow-hidden"
    >
      {/* Logo Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="mb-8"
      >
        {/* Placeholder for SVG logo if actual SVG content is complex, otherwise img is fine */}
        <img src={hueneuLogo} alt="hueneu logo" className="h-24 md:h-32" />
      </motion.div>

      {/* Tagline */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="text-3xl md:text-5xl font-poppins text-dark-gray mb-4"
      >
        Where stories find their aesthetic.
      </motion.h1>

      {/* Subtext */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        className="text-lg md:text-xl font-poppins text-dark-gray/80 mb-12"
      >
        Designs that whisper loud stories.
      </motion.p>

      {/* Scroll Down Indicator */}
      <motion.a 
        href="#story" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-dark-gray hover:text-amber transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", repeatDelay: 0.5 }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
};

export default Hero;
