"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import FadeInSection from "@/components/FadeInSection";
import MapView from "@/components/MapView";
import StoryMap from "@/components/StoryMap";


export default function Home() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 400], [0, 100]); // kecepatan gerak background

    return (
        <main className="min-h-screen w-full bg-white">
            {/* ==== HERO SECTION DENGAN PARALLAX ==== */}
            <section
                id="beranda"
                ref={ref}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                {/* Background Parallax */}
                <motion.div
                    style={{
                        backgroundImage: "url('/bintuni.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        y,
                    }}
                    className="absolute inset-0 z-0 scale-105"
                />

                {/* Overlay gelap */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Konten Hero */}
                <motion.div
                    className="relative z-10 text-center text-white px-4"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Satu Peta Kabupaten Teluk Bintuni
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto">
                        Platform geospasial terintegrasi untuk pembangunan berkelanjutan di Teluk Bintuni
                    </p>
                </motion.div>
            </section>

            {/* ==== SECTION TENTANG ==== */}
            <section id="tentang" className="py-24 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4">
                    <FadeInSection>
                        <h2 className="text-3xl font-bold text-blue-700 mb-6">Tentang</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Satu Peta Teluk Bintuni adalah inisiatif Pemerintah Daerah untuk menyediakan akses
                            data spasial yang akurat dan mudah digunakan oleh masyarakat, investor, dan lembaga
                            publik.
                        </p>
                    </FadeInSection>
                </div>
            </section>

            {/* ==== SECTION PETA ==== */}
            <section id="peta" className="relative z-0 py-24 bg-white text-center">
                <FadeInSection>
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">Peta Interaktif</h2>
                    <div className="relative z-0 h-[500px] max-w-6xl mx-auto rounded-2xl shadow-lg">
                        <MapView />
                    </div>
                </FadeInSection>
            </section>


            {/* ==== SECTION KONTAK ==== */}
            <section id="kontak" className="py-24 bg-gray-50">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <FadeInSection>
                        <h2 className="text-3xl font-bold text-blue-700 mb-6">Kontak</h2>
                        <p className="text-gray-700 mb-4">
                            Hubungi kami untuk informasi lebih lanjut atau kolaborasi:
                        </p>
                        <p className="text-gray-800 font-semibold">
                            Dinas Komunikasi dan Informatika Kabupaten Teluk Bintuni
                        </p>
                        <p className="text-gray-600">Email: diskominfo@bintunikab.go.id</p>
                    </FadeInSection>
                </div>
            </section>
        </main>
    );
}
