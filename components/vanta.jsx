"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CELLS from "vanta/dist/vanta.cells.min.js";

export default function BackgroundEffect({ children }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 768px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (vantaEffect) {
        vantaEffect.destroy();
        setVantaEffect(null);
      }
      return;
    }

    if (vantaRef.current && !vantaEffect) {
      try {
        const effect = CELLS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color1: 0x666666,
          color2: 0xeeeeee,
          size: 0.1,
          speed: 1.8,
        });
        setVantaEffect(effect);
      } catch (err) {
        console.error("Error initializing Vanta:", err);
      }
    }

    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (err) {
          console.error("Error destroying Vanta:", err);
        }
        setVantaEffect(null);
      }
    };
  }, [isMobile, vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="relative h-screen w-screen overflow-hidden font-mono bg-black"
      style={{ color: "white" }}
    >
      {children}
    </div>
  );
}
