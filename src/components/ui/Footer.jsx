import React from "react";

const Footer = () => {
  return (
    <footer class="relative  bg-[#050a14] py-8 px-6 md:px-12 z-100">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-[#8a929e] text-[10px] tracking-[0.2em] uppercase font-medium">
          © 2026 Synthetic Architect. Built for performance.
        </div>

        <nav class="flex flex-wrap justify-center gap-x-8 gap-y-2">
          <a
            href="#"
            class="text-[#8a929e] text-[10px] tracking-[0.2em] uppercase font-medium hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            class="text-[#8a929e] text-[10px] tracking-[0.2em] uppercase font-medium hover:text-white transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            class="text-[#8a929e] text-[10px] tracking-[0.2em] uppercase font-medium hover:text-white transition-colors"
          >
            Security
          </a>
          <a
            href="#"
            class="text-[#8a929e] text-[10px] tracking-[0.2em] uppercase font-medium hover:text-white transition-colors"
          >
            Status
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
