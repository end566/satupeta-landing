"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Preloader = () => {
    const [show, setShow] = useState(true);
    const [fadeIn, setFadeIn] = useState(false);
    const animationDuration = 5000; // total durasi animasi 5 detik

    useEffect(() => {
        // Efek muncul logo
        const timer1 = setTimeout(() => {
            setFadeIn(true);
            // 🔇 Efek suara dihapus
        }, 100);

        // Sembunyikan preloader setelah 5 detik
        const timer2 = setTimeout(() => setShow(false), animationDuration);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [animationDuration]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
            {/* Logo dengan animasi dari kecil ke besar dan fade-in */}
            <div
                className={`transition-all duration-[4000ms] ease-out transform ${fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
            >
                <Image
                    src="/bintuni-one-map.jpg"
                    alt="Logo Bintuni One Map"
                    width={300}
                    height={300}
                    className="max-w-[50vw] h-auto object-contain select-none"
                    priority
                />
            </div>

            {/* Animasi titik di bawah logo */}
            <div className="flex space-x-2 mt-8">
                <span className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                <span className="w-3 h-3 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
            </div>
        </div>
    );
};

export default Preloader;
