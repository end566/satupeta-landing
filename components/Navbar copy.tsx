"use client";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo & Judul */}
                <div className="flex items-center gap-3">
                    <img
                        src="/images/logo-bintuni.png"
                        alt="Logo Bintuni"
                        className="w-10 h-10"
                    />
                    <h1 className="text-lg font-semibold text-blue-700">
                        Satu Peta Bintuni
                    </h1>
                </div>

                {/* Menu */}
                <div className="hidden md:flex gap-6 text-gray-700 font-medium">
                    <a href="#beranda" className="hover:text-blue-600">Beranda</a>
                    <a href="#peta" className="hover:text-blue-600">Peta</a>
                    <a href="#tentang" className="hover:text-blue-600">Tentang</a>
                    <a href="#kontak" className="hover:text-blue-600">Kontak</a>
                </div>
            </div>
        </nav>
    );
}
