"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function MapInner() {
    const [geojsonData, setGeojsonData] = useState<any>(null);
    const [Leaflet, setLeaflet] = useState<any>(null);
    const [ReactLeaflet, setReactLeaflet] = useState<any>(null);

    useEffect(() => {
        Promise.all([import("leaflet"), import("react-leaflet")]).then(([L, RL]) => {
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "/leaflet/marker-icon-2x.png",
                iconUrl: "/leaflet/marker-icon.png",
                shadowUrl: "/leaflet/marker-shadow.png",
            });

            setLeaflet(L);
            setReactLeaflet(RL);
        });

        // Ambil data GeoJSON
        fetch("/data/bintuni.geojson")
            .then((res) => res.json())
            .then((data) => setGeojsonData(data));
    }, []);

    if (!Leaflet || !ReactLeaflet) {
        return (
            <div className="h-[500px] w-full bg-gray-100 rounded-2xl animate-pulse" />
        );
    }

    const { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl } =
        ReactLeaflet;

    return (
        <MapContainer
            center={[-2.11, 133.53]} // Teluk Bintuni
            zoom={9}
            zoomControl={true}
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

                {/* 📍 Overlay */}
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
}
