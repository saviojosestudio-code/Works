"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isWorkPage = pathname.startsWith("/work");

  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);

  // Hide on scroll down, show on scroll up (disabled when mobile menu is open)
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) return;
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalOverscroll = document.body.style.overscrollBehavior;
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.overscrollBehavior = originalOverscroll;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  // Track active section on home page
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const sections = ["home", "about", "work", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    setMobileMenuOpen(false);
    if (!isHome) return;
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    {
      name: "Home",
      href: "/",
      isActive: isHome && activeSection === "home",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
        isHome ? handleAnchorClick(e, "home") : undefined,
    },
    {
      name: "Profile",
      href: "/about",
      isActive: isAbout,
      onClick: () => setMobileMenuOpen(false),
    },
    {
      name: "Work",
      href: "/#work",
      isActive: isWorkPage || (isHome && activeSection === "work"),
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
        isHome ? handleAnchorClick(e, "work") : undefined,
    },
    {
      name: "Contact",
      href: "/#contact",
      isActive: isHome && activeSection === "contact",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
        isHome ? handleAnchorClick(e, "contact") : undefined,
    },
  ];

  return (
    <header
      className="fixed top-0 w-full z-50 pt-safe transition-colors bg-black/40 backdrop-blur-md border-b border-white/5"
      style={{
        transform: mobileMenuOpen ? "none" : (visible ? "translateY(0)" : "translateY(-100%)"),
        transition: "transform 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-50">
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center select-none transition-opacity hover:opacity-80 z-50"
          aria-label="RAPHREV Home"
        >
          <Image
            src="/raphrev-logo-white.png"
            alt="RAPHREV Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop Navigation — plain text links */}
        <nav className="hidden sm:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={item.onClick}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-200 ${
                item.isActive
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
          className="sm:hidden p-2 rounded-lg border border-titanium/20 text-off-white hover:text-racing-red hover:border-racing-red/50 transition-colors z-50 focus:outline-none cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dynamic Viewport Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between px-6 sm:hidden overflow-y-auto overscroll-contain border-t border-titanium/15"
            style={{
              height: "100dvh",
              paddingTop: "calc(4.5rem + env(safe-area-inset-top, 0px))",
              paddingBottom: "max(2rem, env(safe-area-inset-bottom, 0px))",
            }}
          >
            <nav className="flex flex-col gap-5 pt-2">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      item.onClick?.(e);
                    }}
                    className={`text-2xl font-bold uppercase tracking-wider flex items-center justify-between pb-4 border-b border-titanium/15 transition-colors ${
                      item.isActive
                        ? "text-racing-red"
                        : "text-off-white hover:text-racing-red active:text-racing-red"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {item.isActive && (
                        <span className="inline-block w-2 h-2 rounded-full bg-racing-red" />
                      )}
                      {item.name}
                    </span>
                    <span className="text-xs font-mono text-titanium font-normal">
                      0{idx + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.25 }}
              className="flex flex-col gap-2 pt-6 border-t border-titanium/15 text-xs text-titanium font-mono mt-auto"
            >
              <div className="flex items-center justify-between">
                <span className="text-off-white font-semibold uppercase tracking-wider">
                  Ajay Johnson // RAPHREV
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-racing-red uppercase font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-racing-red animate-pulse" />
                  Available
                </span>
              </div>
              <span className="text-titanium/70 text-[11px]">DUBAI, UNITED ARAB EMIRATES</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
