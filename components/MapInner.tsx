"use client";

import { MapContainer, TileLayer, Marker, Popup, LayersControl, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// ✅ Perbaiki ikon Leaflet agar tampil benar
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const { BaseLayer, Overlay } = LayersControl;

export default function MapInner() {
    const [geojsonData, setGeojsonData] = useState<any>(null);

    // ✅ Contoh ambil GeoJSON lokal (bisa diganti API Bappeda/Kominfo)
    useEffect(() => {
        fetch("/data/bintuni.geojson")
            .then((res) => res.json())
            .then((data) => setGeojsonData(data))
            .catch((err) => console.error("Gagal memuat GeoJSON:", err));
    }, []);

    return (
        <MapContainer
            center={[-2.1125, 133.527]}
            zoom={9}
            scrollWheelZoom={true}
            zoomControl={true}
            className="h-full w-full"
        >
            {/* LayersControl: untuk memilih base dan overlay */}
            <LayersControl position="topright">
                {/* Base layers */}
                <BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </BaseLayer>

                <BaseLayer name="ESRI Satellite">
                    <TileLayer
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </BaseLayer>

                <BaseLayer name="Google Roadmap">
                    <TileLayer
                        attribution='&copy; Google Maps'
                        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    />
                </BaseLayer>

                {/* Overlay: data tematik */}
                {geojsonData && (
                    <Overlay checked name="Batas Kabupaten">
                        <GeoJSON
                            data={geojsonData}
                            style={() => ({
                                color: "#2563eb",
                                weight: 2,
                                fillColor: "#93c5fd",
                                fillOpacity: 0.4,
                            })}
                            onEachFeature={(feature, layer) => {
                                if (feature.properties?.NAMOBJ) {
                                    layer.bindPopup(`<strong>${feature.properties.NAMOBJ}</strong>`);
                                }
                            }}
                        />
                    </Overlay>
                )}

                <Overlay name="Kantor Bupati">
                    <Marker position={[-2.1125, 133.527]}>
                        <Popup>
                            <strong>Kabupaten Teluk Bintuni</strong><br />
                            Papua Barat, Indonesia.
                        </Popup>
                    </Marker>
                </Overlay>
            </LayersControl>
        </MapContainer>
    );
}
