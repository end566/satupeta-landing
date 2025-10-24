"use client";

import { useEffect } from "react";

export default function PetaQGISPage() {
    useEffect(() => {
        document.title = "Peta QGIS | Satu Peta Bintuni";
    }, []);

    return (
        <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 pt-24 pb-16">
            {/* Wrapper dengan lebar 80% */}
            <div
                className="w-[80%] mx-auto rounded-xl shadow-lg overflow-hidden border bg-white"
                style={{
                    height: "calc(100vh - 200px)", // sesuaikan agar footer tidak tertutup
                }}
            >
                <iframe
                    src="/qgis/index.html"
                    className="w-full h-full border-none"
                    title="Peta QGIS Bintuni"
                />
            </div>
        </main>
    );
}
