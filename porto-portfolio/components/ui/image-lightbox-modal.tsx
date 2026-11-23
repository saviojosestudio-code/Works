"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bars } from "@/components/ui/bars";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxModalProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 45;

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  images,
  currentIndex,
  onIndexChange,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const isOpen =
    currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;
  const hasMultiple = images.length > 1;

  const goPrev = useCallback(() => {
    if (currentIndex === null || images.length <= 1) return;
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (currentIndex === null || images.length <= 1) return;
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!currentImage) {
      setIsLoading(false);
      return;
    }

    // Check if the browser already has the image cached before showing loader
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [currentImage?.src]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasMultiple) {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight" && hasMultiple) {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, hasMultiple, goPrev, goNext, onClose]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultiple || e.touches.length !== 1) {
      touchStartRef.current = null;
      return;
    }
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultiple || !touchStartRef.current || e.changedTouches.length !== 1) {
      touchStartRef.current = null;
      return;
    }

    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center w-screen h-[100dvh] overflow-hidden bg-black/95 backdrop-blur-sm pt-[calc(4rem+env(safe-area-inset-top,0px))] pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pl-[calc(0.75rem+env(safe-area-inset-left,0px))] pr-[calc(0.75rem+env(safe-area-inset-right,0px))] sm:py-10 sm:px-20 md:py-12 md:px-24 lg:py-14 lg:px-28"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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

          {/* Previous Image Arrow */}
          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
              className="fixed left-[calc(0.75rem+env(safe-area-inset-left,0px))] sm:left-5 md:left-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
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
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Next Image Arrow */}
          {hasMultiple && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
              className="fixed right-[calc(0.75rem+env(safe-area-inset-right,0px))] sm:right-5 md:right-6 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
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
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}

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
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
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
