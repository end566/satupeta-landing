"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { storyLayers } from "./StoryLayers";

// Dynamic import agar tidak SSR
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then(m => m.GeoJSON), { ssr: false });

import { RefObject } from "react";

interface StoryItemProps {
    story: any;
    activeStory: any;
    setActiveStory: (story: any) => void;
}

function StoryItem({ story, activeStory, setActiveStory }: StoryItemProps) {
    const [ref, inView] = useInView({ threshold: 0.6 });

    useEffect(() => {
        if (inView) setActiveStory(story);
    }, [inView, story, setActiveStory]);

    const isActive = activeStory.id === story.id;

    return (
        <motion.div
            ref={ref}
            id={`story-${story.id}`}
            onClick={() => setActiveStory(story)}
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
                {story.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{story.text}</p>
        </motion.div>
    );
}


export default function StoryMap() {
    const [activeStory, setActiveStory] = useState(storyLayers[0]);
    const [geojson, setGeojson] = useState<any>(null);
    const mapRef = useRef<any>(null);
    const [mounted, setMounted] = useState(false); // ✅ mencegah render di SSR

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            fetch(activeStory.layer)
                .then(res => res.json())
                .then(data => setGeojson(data))
                .catch(() => setGeojson(null));
        }
    }, [activeStory, mounted]);

    useEffect(() => {
        const map = mapRef.current;
        if (map && map.flyTo) {
            map.flyTo(activeStory.center, activeStory.zoom, {
                duration: 2,
                easeLinearity: 0.25,
            });
        }
    }, [activeStory]);

    // 🧱 Jika belum mounted, jangan render peta dulu
    if (!mounted) {
        return (
            <div className="h-[500px] flex items-center justify-center text-gray-500">
                Memuat peta...
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            {/* Panel kiri */}


            <div className="md:w-1/2 w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-white/90 backdrop-blur-md p-8 space-y-24">
                {storyLayers.map((s) => (
                    <StoryItem
                        key={s.id}
                        story={s}
                        activeStory={activeStory}
                        setActiveStory={setActiveStory}
                    />
                ))}
            </div>

            {/*
            <div className="md:w-1/2 w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-white/90 backdrop-blur-md p-8 space-y-24">
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
                            onClick={() => setActiveStory(s)}
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
                            <p className="text-gray-700">{s.text}</p>
                        </motion.div>
                    );
                })}
            </div>
*/}
            {/* Peta kanan */}
            {/*<div className="md:w-1/2 w-full h-screen sticky top-0 z-0">*/}
            <div className="md:w-1/2 w-full h-[calc(100vh-90px)] sticky top-[90px] z-0">
                {/* ↑ tambahkan top-[90px] supaya mulai di bawah navbar, 
                  dan kurangi tinggi total peta (100vh - 90px) */}
                <MapContainer
                    center={activeStory.center}
                    zoom={activeStory.zoom}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                    ref={mapRef}
                >

                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {geojson && (
                        <GeoJSON
                            key={activeStory.id}
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
