"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/01-Hero";
import { AboutSection } from "@/components/sections/02-About";
import { WorkSection } from "@/components/sections/03-Work";
import { ContactSection } from "@/components/sections/04-Contact";
import { PhotoModal } from "@/components/ui/PhotoModal";
import { MotorsportProject } from "@/lib/data/portfolio-data";

export default function Home() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    title?: string;
    subtitle?: string;
    location?: string;
  }>({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
  });

  const handleOpenPhoto = (
    src: string,
    alt: string,
    title?: string,
    subtitle?: string,
    location?: string
  ) => {
    setModalState({
      isOpen: true,
      imageSrc: src,
      imageAlt: alt,
      title,
      subtitle,
      location,
    });
  };

  const handleSelectProject = (project: MotorsportProject) => {
    handleOpenPhoto(
      project.image,
      project.alt,
      project.title,
      project.subtitle,
      project.location
    );
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen flex flex-col relative w-full text-off-white selection:bg-racing-red selection:text-off-white">
      {/* Editorial Top Navigation */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex flex-col relative w-full flex-grow">
        {/* 01 // Hero */}
        <HeroSection
          onImageClick={(src, alt) =>
            handleOpenPhoto(
              src,
              alt,
              "Dubai Desert Dunes",
              "Twilight Archive",
              "Dubai, UAE"
            )
          }
        />

        <AboutSection />



        {/* 03 // Selected Work / Motorsport */}
        <WorkSection />


        <ContactSection
          onImageClick={(src, alt) =>
            handleOpenPhoto(
              src,
              alt,
              "Yas Marina Circuit",
              "Formula 1 Twilight Apex",
              "Abu Dhabi, UAE"
            )
          }
        />
      </main>

      {/* Monolithic Footer Directory */}
      <Footer />

      {/* High-Res Photo Lightbox */}
      <PhotoModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        imageSrc={modalState.imageSrc}
        imageAlt={modalState.imageAlt}
        title={modalState.title}
        subtitle={modalState.subtitle}
        location={modalState.location}
      />
    </div>
  );
}
