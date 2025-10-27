"use client";

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white mt-20">
            <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
                {/* Kolom 1 - Logo & Deskripsi */}
                <div className="flex items-center gap-4 p-3 bg-white/10 rounded-xl backdrop-blur-sm shadow-sm">
                    <Image
                        src="/bintuni-one-map.jpg"
                        alt="Bintuni One Map Logo"
                        width={70}
                        height={70}
                        className="rounded-md object-contain"
                    />
                    <p className="text-sm text-blue-100 leading-snug">
                        Portal informasi spasial Kabupaten Teluk Bintuni untuk mendukung
                        perencanaan pembangunan berbasis data geospasial.
                    </p>
                </div>

                {/* Kolom 2 - Navigasi */}
                <div>
                    <h3 className="font-semibold mb-2">Navigasi</h3>
                    <ul className="text-sm space-y-1 text-blue-100">
                        <li><a href="/#beranda" className="hover:text-white">Beranda</a></li>
                        <li><a href="/#tentang" className="hover:text-white">Tentang</a></li>
                        <li><a href="/#peta" className="hover:text-white">Peta Interaktif</a></li>
                        <li><a href="/storymap" className="hover:text-white">Storymap</a></li>
                    </ul>
                </div>

                {/* Kolom 3 - Kontak */}
                <div>
                    <h3 className="font-semibold mb-2">Kontak</h3>
                    <p className="text-sm text-blue-100">
                        Bappelitbangda<br />
                        Kabupaten Teluk Bintuni<br />
                        Email: bappelitbangda@telukbintunikab.go.id
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-blue-950 text-center py-3 text-sm">
                © {new Date().getFullYear()} URDI for Pemerintah Kabupaten Teluk Bintuni.
            </div>
        </footer>
    );
}
