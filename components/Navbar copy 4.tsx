"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("beranda");
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const handleScroll = () => {
            let current = "beranda";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 80;
                const sectionHeight = section.clientHeight;
                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    current = section.getAttribute("id") || "beranda";
                }
            });
            setActiveSection(current);

            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinkClass = (id: string) =>
        `hover:text-blue-600 transition-colors ${activeSection === id ? "text-blue-700 font-semibold" : "text-gray-700"
        }`;

    return (
        <motion.nav
            className="fixed top-0 w-full bg-white shadow z-50"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }} // muncul setelah preloader selesai
        >
            {/* Scroll Progress Bar */}
            <div
                className="absolute top-0 left-0 h-[3px] bg-blue-600 transition-all duration-200"
                style={{ width: `${scrollProgress}%` }}
            />

            {/* Navbar Content */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center relative">
                <h1 className="text-lg font-bold text-blue-700">Satu Peta</h1>

                <div className="space-x-6 hidden md:flex">
                    <a href="#beranda" onClick={() => setOpen(false)} className={navLinkClass("beranda")}>
                        Beranda
                    </a>
                    <a href="#tentang" onClick={() => setOpen(false)} className={navLinkClass("tentang")}>
                        Tentang
                    </a>
                    <a href="#peta" onClick={() => setOpen(false)} className={navLinkClass("peta")}>
                        Peta
                    </a>
                    <a href="#kontak" onClick={() => setOpen(false)} className={navLinkClass("kontak")}>
                        Kontak
                    </a>
                </div>

                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white shadow-md text-center space-y-3 pb-4">
                    <a href="#beranda" className={navLinkClass("beranda")}>
                        Beranda
                    </a>
                    <a href="#tentang" className={navLinkClass("tentang")}>
                        Tentang
                    </a>
                    <a href="#peta" className={navLinkClass("peta")}>
                        Peta
                    </a>
                    <a href="#kontak" className={navLinkClass("kontak")}>
                        Kontak
                    </a>
                </div>
            )}
        </motion.nav>
    );
}
