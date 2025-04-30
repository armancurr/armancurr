"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CELLS from "vanta/dist/vanta.cells.min.js";

export default function BackgroundEffect({ children }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      try {
        setVantaEffect(
          CELLS({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            color1: 0x666666,
            color2: 0xeeeeee,
            size: 0.1,
            speed: 1.8,
          }),
        );
      } catch (error) {
        console.error("Error initializing Vanta:", error);
      }
    }

    return () => {
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (error) {
          console.error("Error destroying Vanta:", error);
        }
        setVantaEffect(null);
      }
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="relative h-screen w-screen overflow-hidden font-mono"
      style={{ color: "white", backgroundColor: "#111" }}
    >
      {children}
    </div>
  );
}
