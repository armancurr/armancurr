import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Spinner } from "@phosphor-icons/react";

export default function LocationMap() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);

  const westBengalLocation = {
    lat: 22.5726,
    lng: 88.3639,
  };

  useEffect(() => {
    const initializeMap = async () => {
      const apiKey =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "your_api_key_here";

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
          libraries: ["places", "geometry"],
        });

        const google = await loader.load();

        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: westBengalLocation,
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            keyboardShortcuts: false,
            mapDataProviders: null,
            styles: [
              {
                featureType: "all",
                elementType: "all",
                stylers: [{ invert_lightness: true }],
              },
              {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [{ color: "#18181b" }], // zinc-900
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#09090b" }], // zinc-950
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#71717a" }], // zinc-500
              },
              {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#52525b" }], // zinc-600
              },
              {
                featureType: "road.local",
                elementType: "geometry",
                stylers: [{ color: "#52525b" }], // zinc-600
              },
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [{ color: "#71717a" }], // zinc-500
              },
              {
                featureType: "administrative.country",
                elementType: "geometry.stroke",
                stylers: [{ color: "#a1a1aa" }], // zinc-400
              },
              {
                featureType: "administrative.province",
                elementType: "geometry.stroke",
                stylers: [{ color: "#71717a" }], // zinc-500
              },
              {
                featureType: "poi",
                elementType: "geometry.fill",
                stylers: [{ color: "#3f3f46" }], // zinc-700
              },
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "all",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d4d4d8" }], // zinc-300
              },
              {
                featureType: "all",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#27272a" }], // zinc-800
              },
            ],
          });

          const marker = new google.maps.Marker({
            position: westBengalLocation,
            map: map,
            title: "West Bengal, India",
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="8" fill="#dc2626" stroke="#fafafa" stroke-width="2"/>
                    <circle cx="20" cy="20" r="3" fill="#fafafa"/>
                  </svg>
                `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20),
            },
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; font-family: Arial, sans-serif; background: #27272a; border-radius: 8px;">
                <h3 style="margin: 0 0 5px 0; color: #d4d4d8;">West Bengal</h3>
                <p style="margin: 0; color: #a1a1aa; font-size: 14px;">India</p>
              </div>
            `,
          });

          marker.addListener("click", () => {
            infoWindow.open(map, marker);
          });

          googleMapRef.current = map;
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
    <div className="relative rounded-xl border-2 border-zinc-600 overflow-hidden h-56">
      <div
        ref={mapRef}
        className="absolute inset-0 w-full h-full"
        style={{ minHeight: "100%" }}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
          <div className="text-zinc-300 text-sm">
            <Spinner size={24} className="animate-spin" />
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
          <div className="text-red-400 text-sm text-center px-4">
            {error}
            <br />
            <span className="text-xs text-zinc-400">
              Get your API key from Google Cloud Console
            </span>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 bg-zinc-800/50 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="text-white text-sm font-medium">West Bengal</div>
        <div className="text-white/80 text-xs">India</div>
      </div>
    </div>
  );
}
