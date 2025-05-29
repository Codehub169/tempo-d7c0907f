import React from 'react';
import Hero from './components/Hero';
import Story from './components/Story';
import Services from './components/Services';
import WhyHueneu from './components/WhyHueneu';
import ContactForm from './components/ContactForm';

/**
 * Main application component for hueneu.
 * This component orchestrates the different sections of the one-page website.
 */
function App() {
  return (
    <>
      <Hero />
      <Story />
      <Services />
      <WhyHueneu />
      <ContactForm />

      <footer className="text-center py-8 bg-gray-800 text-gray-300">
        <p>&copy; {new Date().getFullYear()} hueneu. All rights reserved.</p>
        <p>Instagram: @hueneu_</p>
      </footer>
    </>
  );
}

export default App;
