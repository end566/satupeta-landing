"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { storyLayers } from "./StoryLayers";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then(m => m.GeoJSON), { ssr: false });

export default function StoryMap() {
    const [activeStory, setActiveStory] = useState(storyLayers[0]);
    const [geojson, setGeojson] = useState<any>(null);

    // Load GeoJSON setiap kali cerita berubah
    useEffect(() => {
        fetch(activeStory.layer)
            .then(res => res.json())
            .then(data => setGeojson(data))
            .catch(err => console.error("Gagal memuat GeoJSON:", err));
    }, [activeStory]);

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Panel teks kiri */}
            <div className="md:w-1/2 w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-white/90 backdrop-blur-md p-8 space-y-24">

                {/*{storyLayers.map((s) => {
                    const [ref, inView] = useInView({ threshold: 0.6 });
                    useEffect(() => {
                        if (inView) setActiveStory(s);
                    }, [inView]);
                    return (
                        <motion.div
                            key={s.id}
                            ref={ref}
                            className="snap-start"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-blue-700 mb-2">
                                {s.title}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">{s.text}</p>
                        </motion.div>
                    );
                })}*/}

                {storyLayers.map((s) => {
                    const [ref, inView] = useInView({ threshold: 0.6 });
                    useEffect(() => {
                        if (inView) setActiveStory(s);
                    }, [inView]);

                    const isActive = activeStory.id === s.id;

                    return (
                        <motion.div
                            key={s.id}
                            ref={ref}
                            onClick={() => setActiveStory(s)} // 🖱️ Klik cerita
                            className={`snap-start cursor-pointer p-4 rounded-xl transition-all duration-300 ${isActive
                                ? "bg-blue-50 ring-2 ring-blue-500 shadow-md"
                                : "hover:bg-gray-100"
                                }`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2
                                className={`text-2xl font-bold mb-2 ${isActive ? "text-blue-700" : "text-gray-800"
                                    }`}
                            >
                                {s.title}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">{s.text}</p>
                        </motion.div>
                    );
                })}


            </div>

            {/* Peta kanan */}
            <div className="md:w-1/2 w-full h-screen sticky top-0 z-0">
                <MapContainer
                    key={activeStory.id}
                    center={activeStory.center}
                    zoom={activeStory.zoom}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {geojson && (
                        <GeoJSON
                            data={geojson}
                            style={() => ({
                                color: activeStory.color,
                                weight: 2,
                                fillOpacity: 0.4,
                            })}
                            onEachFeature={(feature, layer) => {
                                if (feature.properties?.NAMOBJ)
                                    layer.bindPopup(`<b>${feature.properties.NAMOBJ}</b>`);
                            }}
                        />
                    )}
                </MapContainer>
            </div>
        </div>
    );
}
