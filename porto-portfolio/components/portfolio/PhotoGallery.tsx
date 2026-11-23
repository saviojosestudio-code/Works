"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PhotoItem, normalizePhotoItem } from "@/lib/data/portfolio-categories";
import { urlFor } from "@/lib/sanity/image";
import type { SanityProjectPhoto, SanityProjectVideo, SanityImage } from "@/lib/sanity/types";
import { ImageLightboxModal, type LightboxImage } from "@/components/ui/image-lightbox-modal";

export interface GalleryMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  fullSrc?: string;
  videoSrc?: string;
  posterSrc?: string;
  alt: string;
  aspect: "landscape" | "portrait";
  title?: string;
  subtitle?: string;
  category?: string;
}

interface PhotoGalleryProps {
  images?: (SanityProjectPhoto | SanityProjectVideo | SanityImage | PhotoItem | string)[];
  projectTitle: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images = [],
  projectTitle,
}) => {
  const normalizedMedia: GalleryMediaItem[] = images
    .map((item, idx): GalleryMediaItem | null => {
      if (typeof item === "object" && item !== null) {
        const rawItem = item as {
          _key?: string;
          asset?: { _id?: string; url?: string };
          image?: { asset?: { _id?: string; url?: string } };
          poster?: { asset?: { _id?: string; url?: string } };
          videoFile?: { asset?: { _id?: string; url?: string } };
          videoUrl?: string;
          aspect?: "landscape" | "portrait";
          title?: string;
          subtitle?: string;
          alt?: string;
          category?: string;
        };

        // Resolve video source (if present as direct URL or Sanity file upload)
        const videoSrc =
          rawItem.videoFile?.asset?.url || rawItem.videoUrl || undefined;

        // Resolve poster source
        let posterSrc = "";
        if (rawItem.poster?.asset) {
          try {
            posterSrc = urlFor(rawItem.poster).width(1600).url();
          } catch {
            posterSrc = rawItem.poster.asset.url || "";
          }
        }

        // Resolve image source
        let imageSrc = "";
        let fullImageSrc = "";
        if (rawItem.image?.asset) {
          try {
            imageSrc = urlFor(rawItem.image).width(1600).url();
            fullImageSrc = urlFor(rawItem.image).width(2400).quality(90).url();
          } catch {
            imageSrc = rawItem.image.asset.url || "";
            fullImageSrc = imageSrc;
          }
        } else if (rawItem.asset) {
          try {
            imageSrc = urlFor(rawItem).width(1600).url();
            fullImageSrc = urlFor(rawItem).width(2400).quality(90).url();
          } catch {
            imageSrc = rawItem.asset.url || "";
            fullImageSrc = imageSrc;
          }
        }

        const aspect: "landscape" | "portrait" =
          rawItem.aspect === "portrait"
            ? "portrait"
            : rawItem.aspect === "landscape"
            ? "landscape"
            : idx % 3 === 0
            ? "landscape"
            : "portrait";

        const id =
          rawItem._key ||
          rawItem.asset?._id ||
          `sanity-media-${idx}`;

        const alt =
          rawItem.alt ||
          rawItem.title ||
          `${projectTitle} ${videoSrc ? "video" : "photograph"} ${idx + 1}`;

        if (videoSrc) {
          return {
            id,
            type: "video",
            src: posterSrc || imageSrc || "",
            videoSrc,
            posterSrc: posterSrc || imageSrc || undefined,
            alt,
            aspect,
            title: rawItem.title,
            subtitle: rawItem.subtitle,
            category: rawItem.category,
          };
        }

        if (imageSrc) {
          return {
            id,
            type: "image",
            src: imageSrc,
            fullSrc: fullImageSrc || imageSrc,
            alt,
            aspect,
            title: rawItem.title,
            subtitle: rawItem.subtitle,
            category: rawItem.category,
          };
        }
      }

      const normalized = normalizePhotoItem(item as PhotoItem | string, idx, projectTitle);
      if (!normalized?.src) return null;
      return {
        id: normalized.id,
        type: "image",
        src: normalized.src,
        alt: normalized.alt,
        aspect: normalized.aspect || "portrait",
        title: normalized.title,
        subtitle: normalized.subtitle,
        category: normalized.category,
      };
    })
    .filter((media): media is GalleryMediaItem => Boolean(media && (media.videoSrc || media.src)));

  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [previewImage, setPreviewImage] = useState<LightboxImage | null>(null);
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      setShowSwipeHint(true);
      const t = setTimeout(() => setShowSwipeHint(false), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="flex flex-col w-full relative">
      {showSwipeHint && normalizedMedia.length > 0 && (
        <div
          className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-titanium/20 backdrop-blur-sm animate-fade-in-out"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-titanium">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">Scroll to explore</span>
        </div>
      )}

      {normalizedMedia.length === 0 ? (
        <div className="py-16 text-center text-titanium font-mono text-xs uppercase tracking-widest border border-dashed border-titanium/20 rounded-xl">
          Gallery archive being updated
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {normalizedMedia.map((media, index) => {
            let spanClass = "md:col-span-6";
            if (media.aspect === "landscape" && index % 4 === 0) {
              spanClass = "md:col-span-12";
            } else if (media.aspect === "portrait") {
              spanClass = "md:col-span-6";
            } else if (media.aspect === "landscape") {
              spanClass = "md:col-span-6";
            }

            const imgSizes = spanClass === "md:col-span-12"
              ? "(max-width: 768px) 100vw, 95vw"
              : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px";

            const isClickableImage = media.type === "image";
            const openPreview = () => {
              if (!isClickableImage) return;
              setPreviewImage({
                src: media.fullSrc || media.src,
                alt: media.alt || projectTitle,
              });
            };

            return (
              <article
                key={media.id || `media-${index}`}
                className={`group flex flex-col ${spanClass}`}
              >
                <div
                  onClick={isClickableImage ? openPreview : undefined}
                  onKeyDown={
                    isClickableImage
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openPreview();
                          }
                        }
                      : undefined
                  }
                  role={isClickableImage ? "button" : undefined}
                  tabIndex={isClickableImage ? 0 : undefined}
                  aria-label={isClickableImage ? `Preview ${media.alt || projectTitle}` : undefined}
                  className={`relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-carbon/60 border border-titanium/15 transition-all duration-500 group-hover:border-off-white/40 ${
                    isClickableImage ? "cursor-pointer" : ""
                  } ${
                    media.aspect === "landscape"
                      ? spanClass === "md:col-span-12"
                        ? "aspect-[16/9] sm:aspect-[21/9]"
                        : "aspect-[16/10]"
                      : "aspect-[3/4]"
                  }`}
                >
                  {media.type === "video" && media.videoSrc ? (
                    <video
                      src={media.videoSrc}
                      poster={media.posterSrc || undefined}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  ) : (
                    <Image
                      src={media.src}
                      alt={media.alt || projectTitle}
                      fill
                      sizes={imgSizes}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <ImageLightboxModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
};
