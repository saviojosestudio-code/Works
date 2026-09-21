"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";


export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isWorkPage = pathname.startsWith("/work");

  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

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
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-base sm:text-lg font-bold tracking-tight uppercase select-none transition-opacity hover:opacity-90 z-50"
        >
          <span className="text-off-white">RAPH</span>
          <span className="text-racing-red">REV</span>
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
          className="sm:hidden p-2 rounded-lg border border-titanium/20 text-off-white hover:text-racing-red hover:border-racing-red/50 transition-colors z-50 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Full-Screen Overlay Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 bg-black/80 backdrop-blur-2xl z-40 flex flex-col justify-between p-6 sm:hidden animate-in fade-in slide-in-from-top-4 duration-200 border-t border-titanium/15">
            <nav className="flex flex-col gap-6 pt-6">
              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className={`text-2xl font-bold uppercase tracking-wider flex items-center justify-between pb-4 border-b border-titanium/15 transition-colors ${
                    item.isActive
                      ? "text-racing-red"
                      : "text-off-white hover:text-racing-red"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-xs font-mono text-titanium font-normal">
                    0{idx + 1}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2 pt-6 border-t border-titanium/15 text-xs text-titanium font-mono">
              <span className="text-off-white font-semibold uppercase">
                Ajay Johnson // RAPHREV
              </span>
              <span>DUBAI, UNITED ARAB EMIRATES</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
