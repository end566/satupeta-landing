"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Komponen peta dimuat dinamis (tanpa SSR)
const DynamicMap = dynamic(() => import("./MapInner"), { ssr: false });

// Komponen utama untuk wrapper client-side
export default function MapView() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-[500px] w-full bg-gray-100 rounded-2xl animate-pulse" />
        );
    }

    return <DynamicMap />;
}
