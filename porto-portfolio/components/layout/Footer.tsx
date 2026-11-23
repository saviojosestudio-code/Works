"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RAPHREV_DATA } from "@/lib/data/portfolio-data";
import type { SanitySiteSettings } from "@/lib/sanity/types";

interface FooterProps {
  settings?: SanitySiteSettings | null;
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export const Footer: React.FC<FooterProps> = ({ settings }) => {
  const { profile } = RAPHREV_DATA;

  const socials = settings?.socials?.length ? settings.socials : profile.socials;
  const phones = settings?.phones?.length ? settings.phones : profile.phones;
  const emails = settings?.emails?.length ? settings.emails : profile.emails;

  const instagramUrl =
    socials.find((s) => s.name.toLowerCase().includes("instagram"))?.url ||
    "https://instagram.com";


  return (
    <footer className="flex flex-col w-full bg-transparent pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        {/* Glassmorphism card container */}
        <div
          className="relative rounded-2xl overflow-hidden p-8 sm:p-10 md:p-12"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            boxShadow:
              "0 0 60px 0 rgba(96, 165, 250, 0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle ambient blue glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[260px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, #3b82f6 0%, transparent 70%)",
            }}
          />

          {/* 1. Main Footer Three-Column Layout */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start">
            {/* Column 1 — Brand Logo */}
            <div className="flex flex-col items-start">
              <Link
                href="/"
                className="inline-block transition-opacity duration-200 hover:opacity-80"
                aria-label="RAPHREV Home"
              >
                <Image
                  src="/raphrev-logo-white.png"
                  alt="RAPHREV"
                  width={1419}
                  height={247}
                  className="h-7 sm:h-8 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Column 2 — Email */}
            <div className="flex flex-col">
              <h4 className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-widest text-titanium mb-3 sm:mb-4">
                Email
              </h4>
              <div className="flex flex-col gap-2.5">
                {emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="text-sm sm:text-[15px] font-medium text-off-white/95 hover:text-white tracking-wide transition-colors duration-200 block break-all"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3 — Phone */}
            <div className="flex flex-col">
              <h4 className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-widest text-titanium mb-3 sm:mb-4">
                Phone
              </h4>
              <div className="flex flex-col gap-2.5">
                {phones.map((phone) => (
                  <a
                    key={`${phone.label}-${phone.number}`}
                    href={`tel:${phone.number.replace(/\s+/g, "")}`}
                    className="text-sm sm:text-[15px] font-medium text-off-white/95 hover:text-white transition-colors duration-200 inline-flex items-baseline gap-2.5"
                  >
                    <span className="text-titanium text-[11px] font-mono font-medium uppercase tracking-wider min-w-[44px]">
                      {phone.label}
                    </span>
                    <span className="tracking-wide">{phone.number}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Thin Horizontal Divider with Subtle Cyan Accent */}
          <div className="relative w-full h-px my-8 sm:my-10 bg-gradient-to-r from-cyan-400/40 via-white/10 to-transparent" />

          {/* 3. Bottom Copyright & Social Link */}
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Copyright (Left) */}
            <p className="text-xs sm:text-[13px] text-titanium/90 tracking-wide">
              &copy; 2026 RAPHREV. All rights reserved.
            </p>

            {/* Instagram Link (Right) */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow RAPHREV on Instagram"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-titanium hover:text-off-white hover:bg-white/5 px-2.5 py-1.5 -ml-2.5 sm:ml-0 sm:-mr-2.5 rounded-lg transition-all duration-200"
            >
              <InstagramIcon className="w-4 h-4 shrink-0" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
