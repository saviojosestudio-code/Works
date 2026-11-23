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

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
  const facebookUrl =
    socials.find((s) => s.name.toLowerCase().includes("facebook"))?.url ||
    "https://facebook.com";
  const xUrl =
    socials.find(
      (s) =>
        s.name.toLowerCase().includes("twitter") ||
        s.name.toLowerCase().includes("x")
    )?.url || "https://x.com";


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
              <div className="flex flex-col gap-2">
                {emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="text-xs sm:text-sm font-normal text-off-white hover:text-white transition-colors duration-200 block break-all"
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
              <div className="flex flex-col gap-2">
                {phones.map((phone) => (
                  <a
                    key={`${phone.label}-${phone.number}`}
                    href={`tel:${phone.number.replace(/\s+/g, "")}`}
                    className="text-xs sm:text-sm font-normal text-off-white hover:text-white transition-colors duration-200 block"
                  >
                    <span className="text-titanium text-[10px] sm:text-xs font-mono uppercase tracking-wider mr-2">
                      {phone.label}
                    </span>
                    <span>{phone.number}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Thin Horizontal Divider with Subtle Cyan Accent */}
          <div className="relative w-full h-px my-8 sm:my-10 bg-gradient-to-r from-cyan-400/40 via-white/10 to-transparent" />

          {/* 3. Bottom Social Links */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Social Media Links (Left) */}
            <div className="flex items-center gap-2">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-titanium hover:text-off-white hover:bg-white/5 p-2 rounded-lg transition-all duration-200"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-titanium hover:text-off-white hover:bg-white/5 p-2 rounded-lg transition-all duration-200"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="text-titanium hover:text-off-white hover:bg-white/5 p-2 rounded-lg transition-all duration-200"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
