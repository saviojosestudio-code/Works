"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCROLL_THRESHOLD = 320;

export const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed right-4 sm:right-6 lg:right-8 bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:bottom-8 z-40 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full text-off-white hover:text-white border border-white/15 hover:border-white/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 cursor-pointer overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.11) 0%, rgba(255, 255, 255, 0.04) 100%)",
            backdropFilter: "blur(20px) saturate(1.6)",
            WebkitBackdropFilter: "blur(20px) saturate(1.6)",
            boxShadow:
              "0 8px 30px rgba(0, 0, 0, 0.45), 0 0 24px rgba(96, 165, 250, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.28), inset 0 -1px 0 rgba(255, 255, 255, 0.06)",
          }}
        >
          {/* Subtle top specular glass sheen */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-1.5 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-80"
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
