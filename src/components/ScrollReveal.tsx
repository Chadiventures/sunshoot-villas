"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "pop";

type ScrollRevealProps = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass =
    direction === "left"
      ? "scroll-reveal-left"
      : direction === "right"
        ? "scroll-reveal-right"
        : direction === "pop"
          ? "scroll-reveal-pop"
          : "scroll-reveal-up";

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`scroll-reveal ${dirClass} ${visible ? "scroll-reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
