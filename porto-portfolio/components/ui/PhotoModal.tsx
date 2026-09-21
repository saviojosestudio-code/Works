"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  location?: string;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  location,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-carbon/95 backdrop-blur-md p-2 sm:p-4 md:p-8 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[92vh] sm:max-h-[90vh] flex flex-col bg-carbon border border-titanium/20 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-titanium/15 bg-carbon shrink-0">
          <div className="flex flex-col pr-4 overflow-hidden">
            <h4 className="text-xs sm:text-base font-semibold uppercase tracking-wider text-off-white truncate">
              {title || "Editorial Archive"}
            </h4>
            {subtitle && (
              <span className="font-mono text-[10px] sm:text-xs text-titanium truncate">
                {subtitle} {location ? `• ${location}` : ""}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 sm:p-2.5 rounded-full border border-titanium/20 text-titanium hover:border-racing-red hover:text-racing-red hover:bg-racing-red/10 transition-colors shrink-0"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Responsive Image Viewport */}
        <div className="relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] bg-carbon flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={imageAlt || "Editorial preview"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
            className="object-contain p-2 sm:p-4"
            priority
          />
        </div>

        {/* Bottom caption */}
        <div className="px-4 sm:px-6 py-3 border-t border-titanium/15 bg-carbon flex items-center justify-between text-[10px] sm:text-xs text-titanium shrink-0 font-mono">
          <span>
            <span className="text-off-white font-semibold">RAPH</span>
            <span className="text-racing-red font-semibold">REV</span> // EDITORIAL 2026
          </span>
          <span className="uppercase tracking-widest text-titanium truncate">
            {location || "DUBAI, UAE"}
          </span>
        </div>
      </div>
    </div>
  );
};
