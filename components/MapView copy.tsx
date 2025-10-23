"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// ⛔️ Jangan import leaflet di sini!
// import L from "leaflet"; ❌

const MapComponent = dynamic(
    async () => {
        const L = await import("leaflet");
        const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");

        // 🔧 Setup ikon hanya di client
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "/leaflet/marker-icon-2x.png",
            iconUrl: "/leaflet/marker-icon.png",
            shadowUrl: "/leaflet/marker-shadow.png",
        });

        /*
        Kita import Leaflet dan React Leaflet di dalam useEffect() (hanya di client).
        Setelah siap, baru render <MapContainer> dan <GeoJSON>.
        Ini cara paling stabil untuk Next.js v16 + Turbopack.
        Tidak lagi menyentuh L.GeoJSON langsung (yang bikin error tadi).
        */
        return function InnerMap() {
            const [geojsonData, setGeojsonData] = useState<any>(null);
            const [Leaflet, setLeaflet] = useState<any>(null);
            const [ReactLeaflet, setReactLeaflet] = useState<any>(null);

            useEffect(() => {
                // Import Leaflet dan React-Leaflet hanya di client
                Promise.all([import("leaflet"), import("react-leaflet")]).then(
                    ([L, RL]) => {
                        // Perbaiki icon agar muncul
                        delete (L.Icon.Default.prototype as any)._getIconUrl;
                        L.Icon.Default.mergeOptions({
                            iconRetinaUrl: "/leaflet/marker-icon-2x.png",
                            iconUrl: "/leaflet/marker-icon.png",
                            shadowUrl: "/leaflet/marker-shadow.png",
                        });

                        setLeaflet(L);
                        setReactLeaflet(RL);
                    }
                );

                // Ambil data GeoJSON
                fetch("/data/bintuni.geojson")
                    .then((res) => res.json())
                    .then((data) => setGeojsonData(data));
            }, []);

            // Jika modul belum siap
            if (!Leaflet || !ReactLeaflet) {
                return (
                    <div className="h-[500px] w-full bg-gray-100 rounded-2xl animate-pulse" />
                );
            }

            const { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl } = ReactLeaflet;

            return (
                <MapContainer
                    center={[-2.11, 133.53]}
                    zoom={9}
                    scrollWheelZoom={true}
                    className="h-[500px] w-full rounded-2xl shadow-lg"
                >
                    <LayersControl position="topright">
                        {/* 🗺️ Base Layers */}
                        <LayersControl.BaseLayer checked name="OpenStreetMap">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>

                        <LayersControl.BaseLayer name="Satellite">
                            <TileLayer
                                attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            />
                        </LayersControl.BaseLayer>

                        {/* 📍 Overlay: Marker + GeoJSON */}
                        <LayersControl.Overlay checked name="Lokasi Utama">
                            <Marker position={[-2.11, 133.53]}>
                                <Popup>Teluk Bintuni</Popup>
                            </Marker>
                        </LayersControl.Overlay>

                        <LayersControl.Overlay checked name="Batas Wilayah">
                            {geojsonData && (
                                <GeoJSON
                                    data={geojsonData}
                                    style={() => ({
                                        color: "#2563eb",
                                        weight: 2,
                                        fillOpacity: 0.2,
                                    })}
                                    onEachFeature={(feature, layer) => {
                                        layer.bindPopup(feature.properties?.name || "Wilayah");
                                    }}
                                />
                            )}
                        </LayersControl.Overlay>
                    </LayersControl>

                    {/* 🧾 Legenda */}
                    <div
                        className="leaflet-bottom leaflet-left mb-4 ml-4 bg-white/90 rounded-lg shadow px-4 py-2 text-sm"
                        style={{ lineHeight: "1.4em" }}
                    >
                        <b>Legenda</b>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-4 h-4 bg-blue-500 opacity-40 border border-blue-700"></div>
                            <span>Batas Wilayah</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-4 h-4 bg-green-600 opacity-40 border border-green-700"></div>
                            <span>Hutan Mangrove</span>
                        </div>
                    </div>
                </MapContainer>
            );

            /*
                        const { MapContainer, TileLayer, Marker, Popup, GeoJSON } = ReactLeaflet;

                        return (
                            <MapContainer
                                center={[-2.11, 133.53]}
                                zoom={8}
                                scrollWheelZoom={true}
                                className="h-[500px] w-full rounded-2xl shadow-lg"
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[-2.0348058227474173, 133.7317536518912]}>
                                    <Popup>Kantor Bupati Teluk Bintuni</Popup>
                                </Marker>
            
                                {geojsonData && (
                                    <GeoJSON
                                        data={geojsonData}
                                        style={() => ({
                                            color: "#2563eb",
                                            weight: 2,
                                            fillOpacity: 0.2,
                                        })}
                                        onEachFeature={(feature, layer) => {
                                            layer.bindPopup(feature.properties?.name || "Wilayah");
                                        }}
                                    />
                                )}
                            </MapContainer>
                        );
                    };
            */


            /*
            function InnerMapError1()
            
            Leaflet (L) belum tersedia di saat React mencoba render — karena kita import Leaflet secara dinamis di Next.js, bukan langsung.
            L di situ nilainya undefined, jadi muncul: “Cannot convert undefined or null to object”
            
            ✅ Solusi Aman
            Kita tidak boleh panggil <L.GeoJSON ...> langsung di JSX.
            Sebaliknya, gunakan komponen GeoJSON dari React Leaflet setelah di-import.
            */
            return function InnerMapError1() {
                const [geojsonData, setGeojsonData] = useState<any>(null);

                useEffect(() => {
                    fetch("/data/bintuni.geojson")
                        .then((res) => res.json())
                        .then((data) => setGeojsonData(data));
                }, []);

                return (
                    <MapContainer
                        center={[-2.11, 133.53]}
                        zoom={9}
                        scrollWheelZoom={true}
                        className="h-[500px] w-full rounded-2xl shadow-lg"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {geojsonData && (
                            <L.GeoJSON
                                data={geojsonData}
                                style={() => ({
                                    color: "#2563eb",
                                    weight: 2,
                                    fillOpacity: 0.2,
                                })}
                                onEachFeature={(feature, layer) => {
                                    layer.bindPopup(feature.properties.name || "Wilayah");
                                }}
                            />
                        )}
                    </MapContainer>
                );
            };


            return function InnerMapOri() {
                return (
                    <MapContainer
                        //center={[-6.9175, 107.6191]} --> Bandung
                        center={[-2.27, 133.90]}
                        // center={[-2.11, 133.53]} --> kantor Bintuni
                        zoom={8}
                        scrollWheelZoom={true}
                        className="h-[500px] w-full rounded-2xl shadow-lg"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-2.11, 133.53]}>
                            <Popup>Kabupaten Bintuni</Popup>
                        </Marker>
                    </MapContainer>
                );
            };
        },
            { ssr: false }
    }
);

export default function MapView() {
    const [mounted, setMounted] = useState(false);

    // ⏳ Pastikan komponen hanya render di browser
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-[500px] w-full bg-gray-100 rounded-2xl animate-pulse" />;

    return <MapComponent />;
}
