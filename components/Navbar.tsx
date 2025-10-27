"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isPetaQGIS = pathname === "/petaqgis";
    const isStoryMap = pathname === "/storymap";


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = [
        { label: "Beranda", href: "/#beranda" },
        { label: "Tentang", href: "/#tentang" },
        { label: "Peta", href: "/#peta" },
        { label: "PetaQGIS", href: "/petaqgis" },
        { label: "StoryMap", href: "/storymap" },
        { label: "Kontak", href: "/#kontak" },
    ];

    const handleNavigation = async (href: string) => {
        if (href.startsWith("#")) {
            const targetId = href.substring(1);

            if (pathname === "/") {
                const target = document.getElementById(targetId);
                if (target) target.scrollIntoView({ behavior: "smooth" });
            } else {
                router.push("/");
                setTimeout(() => {
                    const target = document.getElementById(targetId);
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                }, 800);
            }
        } else {
            router.push(href);
        }
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isPetaQGIS || isStoryMap
                ? "bg-white text-black shadow-md"
                : scrolled
                    ? "bg-white text-black shadow-md"
                    : "bg-transparent text-white"
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <a href="/#beranda" className="flex items-center space-x-2">
                    <Image
                        src="/logo-bintuni.png"
                        alt="Logo Bintuni"
                        width={40}
                        height={40}
                        className="object-contain"
                        //priority
                        //priority={pathname === "/"} // ✅ preload hanya di homepage
                        loading="lazy" //menunda load sampai gambar benar-benar dibutuhkan di viewport, sehingga warning preload hilang
                    />

                    <span
                        className={`text-xl font-bold tracking-wide drop-shadow-sm transition-colors duration-300 ${scrolled || isPetaQGIS || isStoryMap
                            ? "text-blue-700"
                            : "text-white"
                            }`}
                    >
                        Bintuni One Map
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`font-medium transition-all duration-200 ${scrolled || isPetaQGIS || isStoryMap
                                ? "text-gray-800 hover:text-blue-700"
                                : "text-white hover:text-blue-200"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Button */}
                <button
                    className={`md:hidden p-2 ${scrolled || isPetaQGIS || isStoryMap ? "text-gray-800" : "text-white"
                        }`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden fixed top-[64px] left-0 right-0 bg-white/30 backdrop-blur-xl border-t border-white/20 shadow-lg"
                    >
                        <div className="flex flex-col space-y-4 py-4 px-6">
                            {menuItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="text-gray-800 hover:text-blue-700 font-medium"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
