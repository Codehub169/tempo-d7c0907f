import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Palette, Box, Smartphone, Edit3, BookOpen, Zap } from 'lucide-react';

const servicesData = [
  {
    icon: <Palette size={36} className="text-amber mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: 'Branding',
    description: 'Identities that resonate and tell your unique tale.',
  },
  {
    icon: <Box size={36} className="text-amber mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: 'Packaging',
    description: 'Designs that make your product an experience.',
  },
  {
    icon: <Smartphone size={36} className="text-amber mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: 'Social Media',
    description: 'Visuals that spark connection and conversation.',
  },
  {
    icon: <Edit3 size={36} className="text-amber mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: 'Stationery',
    description: 'Tangible touches that leave a lasting mark.',
  },
  {
    icon: <BookOpen size={36} className="text-amber mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: 'Coffee Table Books',
    description: 'Curated narratives, beautifully bound.',
  },
  {
    icon: <Zap size={36} className="text-amber mb-4 group-hover:scale-110 transition-transform duration-300" />,
    title: 'Creative Projects',
    description: 'Unique ventures where imagination leads.',
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section 
      id="services" 
      ref={ref}
      className="py-20 px-8 md:px-16 lg:px-32 bg-gray-50 text-dark-gray"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-lora text-dark-gray text-center mb-16"
        >
          What We Do
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {servicesData.map((service, index) => (
            <motion.div 
              key={index} 
              className="group bg-off-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-light-gray/50"
              variants={itemVariants}
            >
              {service.icon}
              <h3 className="text-2xl font-poppins font-semibold text-dark-gray mb-3">
                {service.title}
              </h3>
              <p className="font-poppins text-dark-gray/80 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
