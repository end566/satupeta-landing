"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white shadow z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-lg font-bold text-blue-700">Satu Peta</h1>
                <div className="space-x-6 hidden md:flex">
                    <a href="#beranda" className="hover:text-blue-600">Beranda</a>
                    <a href="#tentang" className="hover:text-blue-600">Tentang</a>
                    <a href="#peta" className="hover:text-blue-600">Peta</a>
                    <a href="#kontak" className="hover:text-blue-600">Kontak</a>
                </div>
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>
            </div>

            {open && (
                <div className="md:hidden bg-white shadow-md text-center space-y-3 pb-4">
                    <a href="#beranda" className="block hover:text-blue-600">Beranda</a>
                    <a href="#tentang" className="block hover:text-blue-600">Tentang</a>
                    <a href="#peta" className="block hover:text-blue-600">Peta</a>
                    <a href="#kontak" className="block hover:text-blue-600">Kontak</a>
                </div>
            )}
        </nav>
    );
}
