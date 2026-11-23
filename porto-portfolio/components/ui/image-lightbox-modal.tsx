"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars } from "@/components/ui/bars";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxModalProps {
  image: LightboxImage | null;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  image,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!image) {
      setIsLoading(false);
      return;
    }

    // Check if the browser already has the image cached before showing loader
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [image]);

  useEffect(() => {
    if (!image) return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center w-screen h-[100dvh] overflow-hidden bg-black/95 backdrop-blur-sm pt-[calc(4rem+env(safe-area-inset-top,0px))] pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pl-[calc(0.75rem+env(safe-area-inset-left,0px))] pr-[calc(0.75rem+env(safe-area-inset-right,0px))] sm:p-10 md:p-12 lg:p-14"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image preview"
        >
          {/* Close (X) button — touch-friendly & safe-area aware */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close image preview"
            className="fixed top-[calc(0.75rem+env(safe-area-inset-top,0px))] right-[calc(0.75rem+env(safe-area-inset-right,0px))] sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 inline-flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Centered stage that bounds the image strictly within the viewport */}
          <div className="relative flex items-center justify-center w-full h-full max-w-full max-h-full overflow-hidden pointer-events-none">
            {/* Centered image loader (same Bars loader as Hero) */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Bars className="h-8 w-8 text-primary" bars={3} />
              </div>
            )}

            {/* Fullscreen Image — original aspect ratio preserved, never overflows */}
            <motion.img
              ref={imgRef}
              key={image.src}
              src={image.src}
              alt={image.alt}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
              className="pointer-events-auto max-w-full max-h-full w-auto h-auto object-contain select-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
