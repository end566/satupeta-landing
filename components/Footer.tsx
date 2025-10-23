"use client";

export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white mt-20">
            <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
                <div>
                    <h2 className="font-semibold text-lg mb-2">Satu Peta Teluk Bintuni</h2>
                    <p className="text-sm text-blue-100">
                        Portal informasi spasial Kabupaten Teluk Bintuni untuk mendukung
                        perencanaan pembangunan berbasis data geospasial.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Navigasi</h3>
                    <ul className="text-sm space-y-1 text-blue-100">
                        <li><a href="/#beranda" className="hover:text-white">Beranda</a></li>
                        <li><a href="/#tentang" className="hover:text-white">Tentang</a></li>
                        <li><a href="/#peta" className="hover:text-white">Peta Interaktif</a></li>
                        <li><a href="/storymap" className="hover:text-white">Storymap</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Kontak</h3>
                    <p className="text-sm text-blue-100">
                        Dinas Komunikasi dan Informatika<br />
                        Kabupaten Teluk Bintuni<br />
                        Email: info@bintunikab.go.id
                    </p>
                </div>
            </div>

            <div className="bg-blue-950 text-center py-3 text-sm">
                © {new Date().getFullYear()} URDI for Pemerintah Kabupaten Teluk Bintuni.
            </div>
        </footer>
    );
}
