"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MapView from "../components/MapView";
import FadeInWhenVisible from "../components/FadeInWhenVisible";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section
                id="beranda"
                className="relative w-full h-[400px] flex items-center justify-center text-center mt-[64px]"
            >
                <img
                    src="/images/bintuni-view.jpg"
                    alt="Teluk Bintuni"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />

                <motion.div
                    className="relative z-10 text-white"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                    >
                        Satu Peta Teluk Bintuni
                    </motion.h1>

                    <motion.p
                        className="text-lg max-w-2xl mx-auto mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                    >
                        Platform peta interaktif untuk menampilkan data spasial dan potensi
                        wilayah Kabupaten Teluk Bintuni.
                    </motion.p>

                    <motion.a
                        href="#peta"
                        className="inline-block bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform duration-300 text-white px-6 py-3 rounded-full font-medium shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        Lihat Peta ↓
                    </motion.a>
                </motion.div>
            </section>

            {/* Tentang Section */}
            <section id="tentang" className="w-full max-w-5xl px-4 mt-20 mb-20 text-center">
                <FadeInWhenVisible>
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700">Tentang Kami</h2>
                    <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                        Satu Peta Teluk Bintuni adalah inisiatif digital Pemerintah Kabupaten Teluk Bintuni
                        untuk menyediakan data spasial terpadu, terbuka, dan mudah diakses.
                        Platform ini mendukung transparansi, perencanaan pembangunan, dan layanan publik berbasis geospasial.
                    </p>
                </FadeInWhenVisible>
            </section>

            {/* Peta Section */}
            <section id="peta" className="w-full max-w-6xl px-4 mt-10 mb-20">
                <FadeInWhenVisible>
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700 text-center">
                        Peta Interaktif
                    </h2>
                    <MapView />
                </FadeInWhenVisible>
            </section>

            {/* Kontak Section */}
            <section id="kontak" className="w-full max-w-5xl px-4 mb-20 text-center">
                <FadeInWhenVisible delay={0.2}>
                    <h2 className="text-2xl font-semibold mb-4 text-blue-700">Kontak</h2>
                    <p className="text-gray-700">
                        Dinas Komunikasi dan Informatika Kabupaten Teluk Bintuni <br />
                        📍 Jl. Raya Bintuni Km. 2, Teluk Bintuni, Papua Barat <br />
                        📧{" "}
                        <a
                            href="mailto:kominfo@bintunikab.go.id"
                            className="text-blue-600 hover:underline"
                        >
                            kominfo@bintunikab.go.id
                        </a>
                    </p>
                </FadeInWhenVisible>
            </section>

            <Footer />
        </main>
    );
}
