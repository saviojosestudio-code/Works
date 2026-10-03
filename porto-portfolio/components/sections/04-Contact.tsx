"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RAPHREV_DATA } from "@/lib/data/portfolio-data";
import { CheckCircle2 } from "lucide-react";
import { Bars } from "@/components/ui/bars";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";
import type { SanitySiteSettings } from "@/lib/sanity/types";

interface ContactSectionProps {
  settings?: SanitySiteSettings | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const contact = {
    tag: settings?.aboutTag || RAPHREV_DATA.contact.tag,
    heading: settings?.contactHeading || RAPHREV_DATA.contact.heading,
    subheading: settings?.contactSubheading || RAPHREV_DATA.contact.subheading,
    formTitle: RAPHREV_DATA.contact.formTitle,
    image: settings?.contactImage?.asset ? urlFor(settings.contactImage).url() : RAPHREV_DATA.contact.image,
    imageAlt: settings?.contactImage?.alt || RAPHREV_DATA.contact.imageAlt,
  };

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact"
      className="flex flex-col w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-20 md:pb-28"
    >
      <div className="text-center mb-12">
        <span className="text-[11px] font-medium uppercase tracking-widest text-titanium">{contact.tag}</span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-off-white mt-2">{contact.heading}</h2>
        <p className="text-base sm:text-lg text-titanium mt-3 max-w-2xl mx-auto">{contact.subheading}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        <div className="group relative w-full aspect-[16/10] md:aspect-auto md:h-full min-h-[400px] md:min-h-[600px] overflow-hidden bg-carbon rounded-none sm:rounded-xl order-2 md:order-1">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-carbon z-10 transition-opacity duration-500">
              <Bars className="h-8 w-8 text-primary" bars={3} />
            </div>
          )}

          <Image
            src={contact.image}
            alt={contact.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]",
              isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.01]"
            )}
            style={{ objectPosition: "60% 65%" }}
            onLoad={() => setIsImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-tr from-black/70 via-transparent to-black/30 pointer-events-none" />
        </div>

        <div className="flex flex-col justify-center w-full order-1 md:order-2 bg-transparent border border-titanium/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
          <span className="text-[11px] font-medium uppercase tracking-widest text-off-white font-semibold pb-4 block border-b border-titanium/15 mb-5">
            {contact.formTitle}
          </span>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center gap-4 animate-in fade-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-racing-red" />
              <div className="flex flex-col gap-1">
                <h4 className="text-xl font-bold uppercase tracking-tight text-off-white">
                  Message Transmitted
                </h4>
                <p className="text-xs text-titanium max-w-xs">
                  Thank you, {formData.name || "friend"}. Ajay will review your
                  inquiry and respond within 24 hours.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", message: "" });
                }}
                className="mt-2 text-xs uppercase tracking-widest text-titanium hover:text-off-white underline underline-offset-4 transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
              <div className="flex flex-col">
                <input
                  aria-label="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-carbon border border-titanium/30 rounded-lg text-off-white placeholder-titanium/50 text-sm sm:text-base focus:outline-none focus:border-racing-red focus:ring-2 focus:ring-racing-red transition-colors"
                  placeholder="Name*"
                  required
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <input
                  aria-label="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-carbon border border-titanium/30 rounded-lg text-off-white placeholder-titanium/50 text-sm sm:text-base focus:outline-none focus:border-racing-red focus:ring-2 focus:ring-racing-red transition-colors"
                  placeholder="Email*"
                  required
                  type="email"
                />
              </div>

              <div className="flex flex-col">
                <textarea
                  aria-label="Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-carbon border border-titanium/30 rounded-lg text-off-white placeholder-titanium/50 text-sm sm:text-base focus:outline-none focus:border-racing-red focus:ring-2 focus:ring-racing-red transition-colors resize-none"
                  placeholder="Message*"
                  required
                  rows={4}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 bg-racing-red text-off-white rounded-xl uppercase text-xs tracking-widest font-semibold transition-all hover:bg-racing-red/90 hover:scale-[1.01] active:scale-[0.99] cursor-pointer mt-1 text-center shadow-lg shadow-racing-red/25 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Submit Now"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
