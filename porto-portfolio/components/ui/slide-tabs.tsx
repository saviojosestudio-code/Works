"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export interface SlideTabItem {
  name: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isActive?: boolean;
}

export type SlideTabsVariant = "default" | "titanium";

interface SlideTabsProps {
  tabs: SlideTabItem[];
  activeIndex?: number;
  variant?: SlideTabsVariant;
}

const variantStyles: Record<
  SlideTabsVariant,
  { border: string; cursor: string; text: string }
> = {
  default: {
    border: "border-off-white/60",
    cursor: "bg-off-white/20",
    text: "text-off-white",
  },
  titanium: {
    border: "border-titanium/60",
    cursor: "bg-titanium/25",
    text: "text-off-white",
  },
};

export const SlideTabs: React.FC<SlideTabsProps> = ({
  tabs,
  activeIndex = 0,
  variant = "default",
}) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [selected, setSelected] = useState(activeIndex);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);
  const styles = variantStyles[variant];

  // Sync selected state when activeIndex prop changes (e.g., route changes)
  useEffect(() => {
    setSelected(activeIndex);
  }, [activeIndex]);

  // When selected tab changes, animate cursor to that tab's position
  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected]);

  return (
    <ul
      onMouseLeave={() => {
        // On mouse leave, snap cursor back to the currently selected tab
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect();
          setPosition({
            left: selectedTab.offsetLeft,
            width,
            opacity: 1,
          });
        }
      }}
      className={`relative flex w-fit rounded-full border-2 p-1 transition-colors duration-500 bg-black/20 backdrop-blur-sm ${styles.border}`}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab.name}
          ref={(el) => {
            tabsRef.current[i] = el;
          }}
          href={tab.href}
          textClass={styles.text}
          setPosition={setPosition}
          onClick={(e) => {
            setSelected(i);
            tab.onClick?.(e);
          }}
        >
          {tab.name}
        </Tab>
      ))}

      <Cursor position={position} cursorClass={styles.cursor} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: (pos: { left: number; width: number; opacity: number }) => void;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href: string;
  textClass: string;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, setPosition, onClick, href, textClass }, ref) => {
    return (
      <li
        ref={ref}
        onMouseEnter={() => {
          const el = (ref as React.RefObject<HTMLLIElement>)?.current;
          if (!el) return;
          const { width } = el.getBoundingClientRect();
          setPosition({
            left: el.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        className="relative z-10 flex items-center cursor-pointer"
      >
        <Link
          href={href}
          onClick={onClick}
          className={`block px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest mix-blend-difference md:px-5 md:py-2 md:text-xs whitespace-nowrap transition-colors duration-500 ${textClass}`}
        >
          {children}
        </Link>
      </li>
    );
  }
);

Tab.displayName = "Tab";

interface CursorProps {
  position: { left: number; width: number; opacity: number };
  cursorClass: string;
}

const Cursor: React.FC<CursorProps> = ({ position, cursorClass }) => {
  return (
    <motion.li
      animate={{ ...position }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute top-1/2 -translate-y-1/2 z-0 h-8 rounded-full md:h-9 transition-colors duration-500 ${cursorClass}`}
      aria-hidden="true"
    />
  );
};
