"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col text-off-white selection:bg-racing-red selection:text-off-white">
      {/* RAPHREV logo top‑right */}
      <Link
        href="/"
        className="absolute top-4 right-4 text-base font-bold uppercase select-none transition-opacity hover:opacity-90"
      >
        <span className="text-off-white">RAPH</span>
        <span className="text-racing-red">REV</span>
      </Link>

      {/* Main two‑column layout */}
      <main className="flex-grow flex items-center justify-center py-12 md:py-24">
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Text column */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-[-0.04em]">About Me</h1>
            <p className="text-lg leading-relaxed text-off-white/90">
              <strong>Ajay Johnson</strong> — Photographer, videographer &amp; visual storyteller based in Dubai, UAE.
            </p>
            <p className="text-lg leading-relaxed text-off-white/90">
              My journey into visual storytelling began through a curiosity for design, cameras, and the way a single frame can communicate a story. Over the years that curiosity grew into a passion for photography, filmmaking, and creative direction, eventually leading me into the world of motorsport.
            </p>
            <p className="text-lg leading-relaxed text-off-white/90">
              For the past few years I’ve had the opportunity to work closely within professional motorsport, capturing the intensity of race weekends, endurance events, test days and the world that exists behind the racing itself. Working alongside racing teams has taught me to see beyond the obvious – the split‑second moments on track, the concentration behind the helmet, the emotion in the paddock, and the details that bring a car and its story to life.
            </p>
            <p className="text-lg leading-relaxed text-off-white/90">
              My work extends beyond motorsport into automotive, commercial, events, lifestyle and brand content. I enjoy working in fast‑paced environments where timing, light, movement and creativity come together to create something meaningful.
            </p>
            <p className="text-lg leading-relaxed text-off-white/90">
              What fascinates me most about automotive culture is the relationship between people and machines – the engineering, history, emotion and obsession that bring them together. Whether I’m photographing a car at speed, documenting a team behind the scenes, or creating content for a brand, I’m always looking for that moment that makes the viewer feel like they were there.
            </p>
            <p className="text-lg leading-relaxed text-off-white/90">
              <strong>RAPHREV</strong> combines photography, film and creative storytelling to create visuals that are authentic, cinematic and built to leave an impression.
            </p>
            <blockquote className="border-l-2 border-racing-red pl-4 italic text-off-white/80 mt-4">
              <p>“This is more than just capturing what happens. It’s about capturing what it feels like.”</p>
            </blockquote>
          </div>

          {/* Image column — Editorial Frame */}
          <div className="flex-1 relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:min-h-[700px] lg:min-h-[800px] rounded-none sm:rounded-xl bg-transparent group">
            <Image
              src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=90"
              alt="Ajay Johnson — RAPHREV Motorsport Editorial & Visual Storyteller"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            {/* Subtle Gradient & Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border border-titanium/20 bg-black/50 backdrop-blur-md px-5 py-3 rounded-none sm:rounded-lg">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-titanium">
                Dubai // Worldwide
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-off-white font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-racing-red animate-pulse" />
                RAPHREV
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
