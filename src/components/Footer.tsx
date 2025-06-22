import React from 'react';

const Footer: React.FC = () => (
  <footer id="footer" className="bg-primary-dark border-t-4 border-accent py-10 mt-16 text-white">
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6">
        <div className="mb-4 md:mb-0 md:w-1/2">
          <div className="font-semibold text-accent-light mb-1">Reach Us:</div>
          <div className="text-white font-bold text-lg">HireMitra</div>
          <div className="text-accent-light text-sm">Sector 62, Noida, U.P., India</div>
        </div>
        <div className="md:w-1/2 md:text-right md:items-end flex flex-col items-center">
          <div className="font-semibold text-accent-light mb-1">Contact Us:</div>
          <a href="mailto:contact@hiremitra.com" className="text-accent hover:underline text-sm block">contact@hiremitra.com</a>
          <a href="tel:+917793203151" className="text-accent-light text-sm block mt-1 hover:underline">+91 77932 03151</a>
        </div>
      </div>
      <div className="text-accent-light text-xs mt-8 text-center tracking-wide">&copy; {new Date().getFullYear()} HireMitra. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer; 