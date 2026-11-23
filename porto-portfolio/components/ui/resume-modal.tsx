"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  resumeUrl?: string;
  fileName?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  open,
  onClose,
  resumeUrl = "/Ajay-Johnson-CV.pdf",
  fileName = "Ajay Johnson CV.pdf",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

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
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col w-full max-w-5xl h-[90dvh] rounded-2xl overflow-hidden border border-white/15 bg-[#0b0b0f]/95 shadow-2xl shadow-black/70"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-white/[0.03] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/10 text-white/90 border border-white/15 shrink-0">
                  PDF
                </span>
                <h2 className="text-sm sm:text-base font-semibold tracking-wide text-white truncate">
                  Resume — Ajay Johnson
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/80 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                  <span className="hidden sm:inline">Open</span>
                </a>

                <a
                  href={resumeUrl}
                  download={fileName}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-black bg-white hover:bg-white/90 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume modal"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white/75 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="relative flex-1 w-full bg-[#18181b] overflow-hidden">
              <iframe
                src={`${resumeUrl}#view=FitH&toolbar=1&navpanes=0`}
                title="Ajay Johnson Resume"
                className="w-full h-full border-0 bg-white"
              />
            </div>

            {/* Mobile helper bar for browsers with limited inline PDF support */}
            <div className="flex sm:hidden items-center justify-between gap-3 px-4 py-3 border-t border-white/10 bg-white/[0.03] shrink-0">
              <span className="text-[11px] text-white/60 truncate">
                {fileName}
              </span>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 shrink-0 transition-colors"
              >
                Open Full PDF
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
