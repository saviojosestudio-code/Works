"use client";

import React from "react";
import { RAPHREV_DATA } from "@/lib/data/portfolio-data";

export const Footer: React.FC = () => {
  const { profile } = RAPHREV_DATA;

  return (
    <footer className="flex flex-col w-full bg-transparent">
      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Glassmorphism card */}
        <div
          className="relative rounded-2xl overflow-hidden p-8 sm:p-10"
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
            style={{ background: "radial-gradient(ellipse, #3b82f6 0%, transparent 70%)" }}
          />

          {/* Directory Columns */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {/* Follow Me */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-racing-red animate-pulse" />
                <span className="text-[11px] font-medium uppercase tracking-widest text-titanium">
                  FOLLOW ME
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                {profile.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase font-semibold text-off-white hover:text-racing-red hover:translate-x-1 transition-all flex items-center gap-1 group"
                  >
                    <span>{social.name}</span>
                    <span className="text-xs text-titanium group-hover:text-racing-red transition-colors">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Current Location */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-widest text-titanium">
                CURRENT LOCATION
              </span>
              <div className="flex flex-col gap-0.5 pt-1">
                <span className="text-xs uppercase font-semibold text-off-white leading-tight block">
                  DUBAI,
                </span>
                <span className="text-xs uppercase font-semibold text-off-white leading-tight block">
                  UNITED ARAB EMIRATES
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-widest text-titanium">
                PHONE
              </span>
              <div className="flex flex-col gap-1 pt-1">
                {profile.phones.map((phone) => (
                  <a
                    key={phone.label}
                    href={`tel:${phone.number.replace(/\s+/g, "")}`}
                    className="text-xs uppercase font-semibold text-off-white block hover:text-racing-red transition-colors"
                  >
                    {phone.label} {phone.number}
                  </a>
                ))}
              </div>
            </div>

            {/* Email Me */}
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-widest text-titanium">
                EMAIL ME
              </span>
              <div className="flex flex-col gap-1 pt-1">
                {profile.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="text-xs uppercase font-semibold text-off-white hover:text-racing-red hover:underline block break-all transition-colors"
                  >
                    {email.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
