"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  gradientFirst,
  gradientSecond,
  gradientThird,
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const gradients = {
    dark: {
      gradientFirst: gradientFirst || "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 95%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
      gradientSecond: gradientSecond || "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
      gradientThird: gradientThird || "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
    },
    light: {
      gradientFirst: gradientFirst || "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .13) 0, hsla(210, 100%, 55%, .06) 50%, hsla(210, 100%, 45%, 0) 80%)",
      gradientSecond: gradientSecond || "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .09) 0, hsla(210, 100%, 55%, .03) 80%, transparent 100%)",
      gradientThird: gradientThird || "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .07) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
    },
  };

  const {
    gradientFirst: g1,
    gradientSecond: g2,
    gradientThird: g3,
  } = isDark ? gradients.dark : gradients.light;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.7, 1] }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
    >
      <motion.div
        animate={{ x: [0, xOffset, 0] }}
        transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: g1,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={`absolute top-0 left-0`}
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: g2,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`absolute top-0 left-0 origin-top-left`}
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: g3,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`absolute top-0 left-0 origin-top-left`}
        />
      </motion.div>
      <motion.div
        animate={{ x: [0, -xOffset, 0] }}
        transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: g1,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={`absolute top-0 right-0`}
        />
        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: g2,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`absolute top-0 right-0 origin-top-right`}
        />
        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: g3,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`absolute top-0 right-0 origin-top-right`}
        />
      </motion.div>
    </motion.div>
  );
}; 