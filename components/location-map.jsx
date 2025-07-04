import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Spinner } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

export default function LocationMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  const kolkataLocation = {
    lat: 22.5726,
    lng: 88.3639,
  };

  useEffect(() => {
    const initializeMap = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

      if (apiKey === "your_api_key_here") {
        setError(
          "Please add your Google Maps API key to environment variables",
        );
        setIsLoading(false);
        return;
      }

      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
        });

        const google = await loader.load();

        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: kolkataLocation,
            zoom: 6,
            disableDefaultUI: true,
            keyboardShortcuts: false,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            scaleControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDoubleClickZoom: false,
            styles: [
              { elementType: "geometry", stylers: [{ color: "#18181b" }] },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#18181b" }],
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#a1a1aa" }],
              },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#e4e4e7" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#a1a1aa" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#27272a" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#3f3f46" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#27272a" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#52525b" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#09090b" }],
              },
            ],
          });

          new google.maps.Marker({
            position: kolkataLocation,
            map: map,
            title: "West Bengal, India",
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#18181b" stroke="#e4e4e7" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#e4e4e7"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
              anchor: new google.maps.Point(12, 12),
            },
          });

          const hideElements = () => {
            const mapContainer = mapRef.current;
            if (mapContainer) {
              const style = document.createElement("style");
              style.textContent = `
                .gm-style-cc,
                .gm-style .gm-style-cc,
                .gm-style-mtc,
                .gm-bundled-control,
                .gm-fullscreen-control,
                .gmnoprint,
                .gm-style-cc a,
                .gm-style-cc span,
                .gm-style-cc div,
                [title="Open this area in Google Maps (opens a new window)"],
                [title="Click to toggle between metric and imperial units"],
                [title="Map Data"],
                [title="Keyboard shortcuts"],
                [title="Terms of Use"] {
                  display: none !important;
                }
                .gm-style .gm-style-iw-c {
                  display: none !important;
                }
                .gm-style .gm-style-iw-t::after {
                  display: none !important;
                }
              `;
              document.head.appendChild(style);
            }
          };

          setTimeout(hideElements, 1000);

          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error loading Google Maps:", err);
        setError("Failed to load Google Maps. Please check your API key.");
        setIsLoading(false);
      }
    };

    initializeMap();
  }, []);

  return (
    <div className="relative rounded-xl border border-zinc-700 overflow-hidden h-56">
      {/* Map container - always present for Google Maps to attach to */}
      <motion.div
        ref={mapRef}
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading || error ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Loading spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-zinc-900"
          >
            <Spinner size={20} className="animate-spin text-zinc-400" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-zinc-900"
          >
            <div className="text-zinc-400 text-sm text-center px-4">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading || error ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-4 left-4 bg-zinc-800/50 backdrop-blur-sm rounded-lg px-3 py-2"
      >
        <div className="text-white text-sm font-medium">West Bengal</div>
        <div className="text-white/80 text-xs">India</div>
      </motion.div>
    </div>
  );
}
