import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Instagram } from 'lucide-react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const errorData = await response.json();
        setStatus('error');
        console.error('Form submission error:', errorData.message);
      }
    } catch (error) {
      setStatus('error');
      console.error('Network error:', error);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-off-white text-gray-700 font-poppins">
      <motion.div 
        className="container mx-auto px-6 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-lora font-semibold mb-6 text-gray-800">Let's Work Together</h2>
        <p className="mb-10 text-lg text-gray-600">
          Have a project in mind, or just want to say hello? Send a note.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="container mx-auto px-6 max-w-xl bg-white p-8 md:p-12 rounded-lg shadow-lg border border-gray-200"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-amber focus:border-amber transition-colors duration-300 bg-gray-50"
            placeholder="What should we call you?"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-amber focus:border-amber transition-colors duration-300 bg-gray-50"
            placeholder="Where can we reach you?"
          />
        </div>

        <div className="mb-8">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
          <textarea 
            id="message" 
            rows="5" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required 
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-amber focus:border-amber transition-colors duration-300 bg-gray-50"
            placeholder="Tell us about your story, your project, or just say hi..."
          ></textarea>
        </div>

        <div className="text-center">
          <motion.button 
            type="submit" 
            disabled={status === 'sending'}
            className="bg-amber text-white font-semibold py-3 px-8 rounded-md hover:bg-yellow-500 transition-colors duration-300 flex items-center justify-center mx-auto group disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status === 'sending' ? 'Sending...' : 'Let’s design your story'}
            {status !== 'sending' && <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />}
          </motion.button>
        </div>

        {status === 'success' && (
          <p className="mt-6 text-center text-green-600 bg-green-50 p-3 rounded-md">Thank you! Your message has been sent successfully.</p>
        )}
        {status === 'error' && (
          <p className="mt-6 text-center text-red-600 bg-red-50 p-3 rounded-md">Oops! Something went wrong. Please try again later.</p>
        )}

      </motion.form>

      <motion.div 
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="text-gray-600 mb-2">Find us on Instagram:</p>
        <a 
          href="https://instagram.com/hueneu_" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-amber hover:text-yellow-500 font-semibold text-lg inline-flex items-center transition-colors duration-300"
        >
          <Instagram size={22} className="mr-2" /> @hueneu_
        </a>
      </motion.div>
      {/* Optional: Link to services deck or 'Who Knew?' visual could be added here */}
    </section>
  );
};

export default ContactForm;
