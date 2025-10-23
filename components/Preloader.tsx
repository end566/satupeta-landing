"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // durasi 2 detik
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    // className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]" --> putih
                    className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]"
                // className="fixed inset-0 bg-blue-900 flex flex-col items-center justify-center z-[9999]" --> biru tua
                // className="fixed inset-0 bg-blue-900 flex flex-col items-center justify-center z-[9999]"
                >
                    {/* Logo atau Teks */}
                    <motion.h1
                        //className="text-2xl md:text-3xl font-bold text-blue-700 mb-6" --> biru
                        className="text-2xl md:text-3xl font-bold text-blue-700 mb-6"
                        //className="text-2xl md:text-3xl font-bold text-white mb-6" --> putih</motion.div>
                        //</AnimatePresence>className="text-2xl md:text-3xl font-bold text-white mb-6"

                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Satu Peta Teluk Bintuni
                    </motion.h1>

                    {/* Animasi Titik */}
                    <div className="flex space-x-2">
                        {[0, 1, 2].map((i) => (
                            <motion.span
                                key={i}
                                className="w-3 h-3 bg-blue-600 rounded-full"
                                animate={{ y: [0, -8, 0] }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    repeatDelay: 0.1,
                                    delay: i * 0.15,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
