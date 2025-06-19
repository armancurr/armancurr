import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Spinner } from "@phosphor-icons/react";

export default function LocationMap() {
  const [currentTime, setCurrentTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);

  // Jalandhar, Punjab, India coordinates
  const jalandharLocation = {
    lat: 31.326,
    lng: 75.5762,
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const chicagoTime = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Chicago" }),
      );
      const timeString = chicagoTime.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(timeString + " CDT");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      // You'll need to get a Google Maps API key from https://console.cloud.google.com/apis/credentials
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
            center: jalandharLocation,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
              {
                featureType: "all",
                elementType: "geometry.fill",
                stylers: [
                  {
                    weight: "2.00",
                  },
                ],
              },
              {
                featureType: "all",
                elementType: "geometry.stroke",
                stylers: [
                  {
                    color: "#9c9c9c",
                  },
                ],
              },
              {
                featureType: "all",
                elementType: "labels.text",
                stylers: [
                  {
                    visibility: "on",
                  },
                ],
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [
                  {
                    color: "#f2f2f2",
                  },
                ],
              },
              {
                featureType: "landscape",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#ffffff",
                  },
                ],
              },
              {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#ffffff",
                  },
                ],
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "all",
                stylers: [
                  {
                    saturation: -100,
                  },
                  {
                    lightness: 45,
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#eeeeee",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#7b7b7b",
                  },
                ],
              },
              {
                featureType: "road",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#ffffff",
                  },
                ],
              },
              {
                featureType: "road.highway",
                elementType: "all",
                stylers: [
                  {
                    visibility: "simplified",
                  },
                ],
              },
              {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [
                  {
                    visibility: "off",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [
                  {
                    color: "#46bcec",
                  },
                  {
                    visibility: "on",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [
                  {
                    color: "#c8d7d4",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                  {
                    color: "#070707",
                  },
                ],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [
                  {
                    color: "#ffffff",
                  },
                ],
              },
            ],
          });

          // Add a marker for Jalandhar
          const marker = new google.maps.Marker({
            position: jalandharLocation,
            map: map,
            title: "Jalandhar, Punjab, India",
            icon: {
              url:
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="8" fill="#ff6b6b" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="20" cy="20" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20),
            },
          });

          // Add info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 5px 0; color: #333;">Jalandhar, Punjab</h3>
                <p style="margin: 0; color: #666; font-size: 14px;">India</p>
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
    <div className="relative rounded-xl border-4 border-[#C0C9EE] overflow-hidden h-56">
      <div
        ref={mapRef}
        className="absolute inset-0 w-full h-full"
        style={{ minHeight: "100%" }}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-nord-200 text-sm">
            <Spinner size={24} className="animate-spin" />
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-red-600 text-sm text-center px-4">
            {error}
            <br />
            <span className="text-xs text-gray-500">
              Get your API key from Google Cloud Console
            </span>
          </div>
        </div>
      )}

      {/* Location Info Overlay */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="text-white text-sm font-medium">Jalandhar, Punjab</div>
        <div className="text-white/80 text-xs">India</div>
      </div>

      {/* Time Display */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5">
        <div className="text-white text-sm font-medium">{currentTime}</div>
      </div>
    </div>
  );
}
