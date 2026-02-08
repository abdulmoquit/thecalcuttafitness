import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className="rounded-full bg-primary"
          animate={{
            width: isHovering ? 48 : 16,
            height: isHovering ? 48 : 16,
            x: isHovering ? -24 : -8,
            y: isHovering ? -24 : -8,
            opacity: 0.8,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full border border-primary/40"
          animate={{
            width: isHovering ? 64 : 32,
            height: isHovering ? 64 : 32,
            x: isHovering ? -32 : -16,
            y: isHovering ? -32 : -16,
          }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        />
      </motion.div>
      <style>{`* { cursor: none !important; } @media (pointer: coarse) { * { cursor: auto !important; } }`}</style>
    </>
  );
};

export default CustomCursor;
