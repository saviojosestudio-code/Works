// components/ui/connected-carousel.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { HTMLAttributes, MouseEvent, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string | number;
  stat: string;
  quote: string;
  author: string;
  role: string;
  defaultImage: string;
  selectedImage: string;
  alt?: string;
}

export interface CalendlyCarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
}

type ScreenTier = "mobile" | "tablet" | "desktop";

const VISIBLE_OFFSETS = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const;

const TRANSITION_SPRING = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.75,
} as const;

// Carbon card background — matches --color-carbon exactly
const CARD_BG = "#0B0D0F";

export function CalendlyCarousel({
  items,
  autoPlayInterval = 6000,
  pauseOnHover = false,
  className,
  ...props
}: CalendlyCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);

  const [page, setPage] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tier, setTier] = useState<ScreenTier>("desktop");
  const [viewportWidth, setViewportWidth] = useState<number>(1200);

  const total = items.length;
  const activeIndex = ((page % total) + total) % total;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      if (width < 768) setTier("mobile");
      else if (width < 1120) setTier("tablet");
      else setTier("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (pauseOnHover && isHovered) {
      lastTimeRef.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      elapsedRef.current += delta;

      if (elapsedRef.current >= autoPlayInterval) {
        elapsedRef.current = 0;
        lastTimeRef.current = null;
        setProgress(0);
        setPage((curr) => curr + 1);
        return;
      }

      setProgress(Math.min((elapsedRef.current / autoPlayInterval) * 100, 100));
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animationFrameRef.current !== null)
        cancelAnimationFrame(animationFrameRef.current);
      lastTimeRef.current = null;
    };
  }, [page, pauseOnHover, isHovered, autoPlayInterval]);

  const handlePrev = useCallback(() => {
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    setProgress(0);
    setPage((curr) => curr - 1);
  }, []);

  const handleNext = useCallback(() => {
    elapsedRef.current = 0;
    lastTimeRef.current = null;
    setProgress(0);
    setPage((curr) => curr + 1);
  }, []);

  const handleSelectTab = (event: MouseEvent<HTMLButtonElement>) => {
    const indexStr = event.currentTarget.dataset.index;
    if (indexStr !== undefined) {
      const targetIdx = Number.parseInt(indexStr, 10);
      let diff = targetIdx - activeIndex;
      if (diff > total / 2) diff -= total;
      else if (diff < -total / 2) diff += total;
      elapsedRef.current = 0;
      lastTimeRef.current = null;
      setProgress(0);
      setPage((curr) => curr + diff);
    }
  };

  const handleSelectCard = (event: MouseEvent<HTMLDivElement>) => {
    const offsetStr = event.currentTarget.dataset.offset;
    if (offsetStr !== undefined) {
      const offset = Number.parseInt(offsetStr, 10);
      if (offset !== 0) {
        elapsedRef.current = 0;
        lastTimeRef.current = null;
        setProgress(0);
        setPage((curr) => curr + offset);
      }
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") handlePrev();
    else if (event.key === "ArrowRight") handleNext();
  };

  const activeDimensions = {
    desktop: { width: 762, height: 513 },
    tablet: { width: 560, height: 440 },
    mobile: { width: Math.min(340, viewportWidth - 56), height: 490 },
  }[tier];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full max-w-[1240px] mx-auto flex flex-col items-center select-none outline-none py-4 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Cards stage */}
      <div
        id="carousel-view-panel"
        role="tabpanel"
        aria-live="polite"
        className="relative w-full flex items-center justify-center"
        style={{ height: activeDimensions.height }}
      >
        {VISIBLE_OFFSETS.map((offset) => {
          const virtualIndex = page + offset;
          const itemIndex = ((virtualIndex % total) + total) % total;
          const item = items[itemIndex];
          const isActive = offset === 0;

          const getVariant = () => {
            if (tier === "mobile") {
              const activeW = activeDimensions.width;
              const activeH = activeDimensions.height;
              const gap = 16;
              const peekW = 60;
              const peekH = 410;
              if (offset === 0)
                return { x: -activeW / 2, y: -activeH / 2, width: activeW, height: activeH, opacity: 1, zIndex: 0, pointerEvents: "auto" as const };
              if (offset === -1)
                return { x: -activeW / 2 - gap - peekW, y: -peekH / 2, width: peekW, height: peekH, opacity: 1, zIndex: 100, pointerEvents: "auto" as const };
              if (offset === 1)
                return { x: activeW / 2 + gap, y: -peekH / 2, width: peekW, height: peekH, opacity: 1, zIndex: 100, pointerEvents: "auto" as const };
              return { x: offset < 0 ? -activeW / 2 - 220 : activeW / 2 + 220, y: -peekH / 2, width: peekW, height: peekH, opacity: 0, zIndex: 0, pointerEvents: "none" as const };
            }

            if (tier === "tablet") {
              const activeW = 560;
              const activeH = 440;
              const gap = 18;
              const sideW = 100;
              const sideH = 340;
              if (offset === 0)
                return { x: -activeW / 2, y: -activeH / 2, width: activeW, height: activeH, opacity: 1, zIndex: 0, pointerEvents: "auto" as const };
              if (offset === -1)
                return { x: -activeW / 2 - gap - sideW, y: -sideH / 2, width: sideW, height: sideH, opacity: 1, zIndex: 100, pointerEvents: "auto" as const };
              if (offset === 1)
                return { x: activeW / 2 + gap, y: -sideH / 2, width: sideW, height: sideH, opacity: 1, zIndex: 100, pointerEvents: "auto" as const };
              return { x: offset < 0 ? -activeW / 2 - 240 : activeW / 2 + 240, y: -sideH / 2, width: 74, height: 205, opacity: 0, zIndex: 0, pointerEvents: "none" as const };
            }

            // Desktop
            switch (offset) {
              case 0:  return { x: -381, y: -256.5, width: 762, height: 513, opacity: 1, zIndex: 0, pointerEvents: "auto" as const };
              case -1: return { x: -506, y: -172, width: 105, height: 344, opacity: 1, zIndex: 100, pointerEvents: "auto" as const };
              case 1:  return { x: 401,  y: -172, width: 105, height: 344, opacity: 1, zIndex: 100, pointerEvents: "auto" as const };
              case -2: return { x: -596, y: -102.5, width: 74, height: 205, opacity: 1, zIndex: 100, pointerEvents: "auto" as const };
              case 2:  return { x: 522,  y: -102.5, width: 74, height: 205, opacity: 1, zIndex: 100, pointerEvents: "auto" as const };
              case -3: return { x: -720, y: -102.5, width: 74, height: 205, opacity: 0, zIndex: 0, pointerEvents: "none" as const };
              case 3:  return { x: 646,  y: -102.5, width: 74, height: 205, opacity: 0, zIndex: 0, pointerEvents: "none" as const };
              default: return { x: offset < 0 ? -860 : 860, y: -102.5, width: 74, height: 205, opacity: 0, zIndex: 0, pointerEvents: "none" as const };
            }
          };

          return (
            <motion.div
              key={virtualIndex}
              data-offset={offset}
              onClick={handleSelectCard}
              initial={false}
              animate={getVariant()}
              transition={TRANSITION_SPRING}
              style={{ position: "absolute", left: "50%", top: "50%", willChange: "transform", backgroundColor: CARD_BG }}
              className={cn(
                "rounded-none border border-titanium/15 overflow-visible",
                "shadow-[0_16px_48px_rgba(0,0,0,0.8),0_4px_16px_rgba(0,0,0,0.6)]",
                !isActive && "cursor-pointer"
              )}
            >
              {/* Left connector notch — matches CARD_BG */}
              {offset === -1 && (
                <div aria-hidden="true" className="absolute top-0 bottom-0 flex items-center pointer-events-none z-[100]"
                  style={{ color: CARD_BG, width: 22, height: 42, margin: "auto 0", left: "calc(100% - 1px)" }}>
                  <svg viewBox="0 0 20 37.3338" preserveAspectRatio="none" className="size-full fill-current overflow-visible block">
                    <path d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z" />
                  </svg>
                </div>
              )}
              {offset === 1 && (
                <div aria-hidden="true" className="absolute top-0 bottom-0 flex items-center pointer-events-none z-[100]"
                  style={{ color: CARD_BG, width: 22, height: 42, margin: "auto 0", right: "calc(100% - 1px)" }}>
                  <svg viewBox="0 0 20 37.3338" preserveAspectRatio="none" className="size-full fill-current overflow-visible block">
                    <path d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z" />
                  </svg>
                </div>
              )}
              {offset === -2 && tier === "desktop" && (
                <div aria-hidden="true" className="absolute top-0 bottom-0 flex items-center pointer-events-none z-[100]"
                  style={{ color: CARD_BG, width: 18, height: 28, margin: "auto 0", left: "calc(100% - 1px)" }}>
                  <svg viewBox="0 0 16 28" preserveAspectRatio="none" className="size-full fill-current overflow-visible block">
                    <path d="M0 0C0 0 0.993759 10.1818 8 10.1818C15.0062 10.1818 16 0 16 0V28C16 28 15.0062 17.8182 8 17.8182C0.993759 17.8182 0 28 0 28V0Z" />
                  </svg>
                </div>
              )}
              {offset === 2 && tier === "desktop" && (
                <div aria-hidden="true" className="absolute top-0 bottom-0 flex items-center pointer-events-none z-[100]"
                  style={{ color: CARD_BG, width: 18, height: 28, margin: "auto 0", right: "calc(100% - 1px)" }}>
                  <svg viewBox="0 0 16 28" preserveAspectRatio="none" className="size-full fill-current overflow-visible block">
                    <path d="M0 0C0 0 0.993759 10.1818 8 10.1818C15.0062 10.1818 16 0 16 0V28C16 28 15.0062 17.8182 8 17.8182C0.993759 17.8182 0 28 0 28V0Z" />
                  </svg>
                </div>
              )}

              <div className="size-full overflow-hidden relative" style={{ borderRadius: "inherit" }}>

                {/* Inactive: grayscale thumbnail with titanium tint */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={cn("absolute inset-0 p-1.5", isActive && "pointer-events-none")}
                >
                  <div className="size-full overflow-hidden relative" style={{ borderRadius: "inherit" }}>
                    <Image
                      alt={item.alt || item.author}
                      src={item.defaultImage}
                      fill
                      unoptimized
                      draggable={false}
                      style={{ objectFit: "cover" }}
                      className="size-full object-cover grayscale contrast-[1.1]"
                    />
                    {/* Dark carbon overlay on inactive cards */}
                    <div className="absolute inset-0 bg-carbon/60" />
                  </div>
                </motion.div>

                {/* Active expanded layout */}
                <div className="absolute" style={{ left: "50%", top: "50%", width: activeDimensions.width, height: activeDimensions.height, transform: "translate(-50%, -50%)" }}>
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : offset < 0 ? -822 : 822 }}
                    transition={TRANSITION_SPRING}
                    className={cn(
                      "size-full flex flex-col md:flex-row p-5 sm:p-6 md:p-7 lg:p-8 gap-4 sm:gap-5 md:gap-7",
                      !isActive && "pointer-events-none"
                    )}
                  >
                    {/* ── Left: text content ── */}
                    <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left justify-between gap-3 sm:gap-4">

                      {/* Stat headline */}
                      <h3
                        title={item.stat}
                        className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-off-white leading-tight w-full"
                        style={{ letterSpacing: "-0.03em" }}
                      >
                        {item.stat}
                      </h3>

                      {/* Quote */}
                      <div className="relative w-full min-w-0 my-auto">
                        {/* Decorative quote mark */}
                        <span
                          aria-hidden="true"
                          className="text-4xl sm:text-5xl text-racing-red font-bold leading-none absolute -top-3 -left-1 hidden md:block select-none pointer-events-none"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          "
                        </span>
                        <p className="text-xs sm:text-sm md:text-base text-off-white/80 leading-relaxed font-light md:pl-6">
                          {item.quote}
                        </p>
                      </div>

                      {/* Author badge — pill + connector + role pill */}
                      <div className="flex min-w-0 w-full overflow-hidden items-center md:items-start justify-center md:justify-start">
                        <div className="flex flex-col items-center md:items-start min-w-0">
                          {/* Name tag */}
                          <span className="inline-flex items-center rounded-sm py-1 px-3 text-[10px] font-mono uppercase tracking-widest bg-racing-red text-off-white shrink-0 select-none font-semibold">
                            {item.author}
                          </span>

                          {/* Connector pip */}
                          <div className="shrink-0 flex items-center justify-center md:justify-start px-3 h-[6px] -my-[1px] text-racing-red relative z-10">
                            <svg className="block shrink-0 fill-current overflow-visible" preserveAspectRatio="none" viewBox="0 -2 14 12" width="14" height="10">
                              <path d="M0 -2 V0 C0 0 5.09091 0.49688 5.09091 4 C5.09091 7.50312 0 8 0 8 V10 H14 V8 C14 8 8.90909 7.50312 8.90909 4 C8.90909 0.49688 14 0 14 0 V-2 Z" />
                            </svg>
                          </div>

                          {/* Role tag */}
                          <span className="inline-flex items-center rounded-sm py-1 px-3 text-[10px] font-mono uppercase tracking-widest bg-carbon border border-titanium/30 text-titanium max-w-full select-none">
                            <span title={item.role} className="truncate">{item.role}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ── Right: portrait image ── */}
                    <div
                      className="relative shrink-0 overflow-hidden bg-carbon border border-titanium/10 w-full md:w-[clamp(180px,42%,310px)] flex-1 md:flex-initial md:h-full max-h-[200px] md:max-h-none rounded-none"
                    >
                      <Image
                        alt={item.alt || item.author}
                        src={item.selectedImage}
                        fill
                        unoptimized
                        draggable={false}
                        style={{ objectFit: "cover" }}
                        className="size-full object-cover grayscale-[20%] contrast-[1.05]"
                      />
                      {/* Subtle bottom vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-carbon/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress tab bar — racing-red fill on off-white/titanium track */}
      <div role="tablist" aria-label="Testimonials" className="flex items-center gap-2 mt-6">
        {items.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-index={idx}
              id={`carousel-tab-${idx}`}
              aria-controls="carousel-view-panel"
              onClick={handleSelectTab}
              aria-selected={isSelected}
              aria-label={`Testimonial ${idx + 1}`}
              tabIndex={isSelected ? 0 : -1}
              className={cn(
                "h-[3px] border-0 p-0 cursor-pointer transition-[width] duration-300 ease-out outline-none",
                isSelected
                  ? "w-[72px] bg-titanium/30"
                  : "w-[12px] bg-titanium/20 hover:bg-titanium/40"
              )}
            >
              {isSelected && (
                <div
                  className="h-full bg-racing-red"
                  style={{ transformOrigin: "0% 50%", transform: `scaleX(${progress / 100})` }}
                />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}

