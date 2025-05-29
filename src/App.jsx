import React from 'react';

/**
 * Main application component for hueneu.
 * This component will orchestrate the different sections of the one-page website.
 */
function App() {
  return (
    <>
      {/* 
        The main container for all sections of the one-page website. 
        Components for each section will be imported and rendered here in subsequent development stages.
      */}
      
      {/* Section 1: Hero */}
      {/* This section will contain the animated logo, tagline, subtext, and scroll indicator. */}
      {/* Component: src/components/Hero.jsx */}
      <div id="hero" className="min-h-screen flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">Hero Section</h1>
        <p className="text-xl text-gray-600">Animated hueneu logo, tagline, subtext, scroll indicator.</p>
      </div>

      {/* Section 2: The hueneu Story */}
      {/* This section will detail what hueneu means, emphasizing color/calm balance and the "Who Knew?" moment. */}
      {/* Component: src/components/Story.jsx */}
      <div id="story" className="py-20 px-8 bg-neutral-50">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">The hueneu Story</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center">Short section about what hueneu means. Emphasize the balance of color and calm. Bring in the “Who Knew?” moment.</p>
      </div>

      {/* Section 3: What We Do (Services) */}
      {/* This section will list 5-6 core offerings with icons/visuals and microcopy. */}
      {/* Component: src/components/Services.jsx */}
      <div id="services" className="py-20 px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">What We Do</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center">5-6 core offerings presented with icons or line visuals and playful microcopy.</p>
      </div>

      {/* Section 4: Why hueneu? */}
      {/* This section will feature an emotional brand pitch in poetic copy. */}
      {/* Component: src/components/WhyHueneu.jsx */}
      <div id="why-hueneu" className="py-20 px-8 bg-neutral-50">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Why hueneu?</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center">Emotional brand pitch in poetic copy. Highlighting calm, mystery, and balance.</p>
      </div>

      {/* Section 5: Let’s Work Together (Contact) */}
      {/* This section will include a contact form styled like a note/letter, a playful CTA, and social media links. */}
      {/* Component: src/components/ContactForm.jsx */}
      <div id="contact" className="py-20 px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Let’s Work Together</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center">A contact form that feels like a note or letter. Playful CTA button copy. Instagram link.</p>
      </div>

      <footer className="text-center py-8 bg-gray-800 text-gray-300">
        <p>&copy; {new Date().getFullYear()} hueneu. All rights reserved.</p>
        <p>Instagram: @hueneu_</p>
      </footer>
    </>
  );
}

export default App;
