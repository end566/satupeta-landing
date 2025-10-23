import MapView from "../components/MapView.tsx";

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col items-center">
            {/* 🟦 Hero Section */}
            <section className="w-full text-center py-20 px-6 bg-[url('/hero-teluk-bintuni.jpg')] bg-cover bg-center">
                <div className="bg-white/80 backdrop-blur-md max-w-4xl mx-auto rounded-2xl shadow-lg p-10">
                    <h1 className="text-5xl font-bold text-blue-800 mb-4">
                        Satu Peta Bintuni
                    </h1>
                    <p className="text-gray-700 text-lg mb-8">
                        Platform peta interaktif untuk visualisasi data spasial Kabupaten
                        Teluk Bintuni — integrasi data geospasial dalam satu portal.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="#peta"
                            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-full shadow transition"
                        >
                            Lihat Peta
                        </a>
                        <a
                            href="https://telukbintunikab.go.id/"
                            target="_blank"
                            className="px-6 py-3 bg-white border border-blue-700 text-blue-700 font-semibold rounded-full shadow hover:bg-blue-50 transition"
                        >
                            Website Resmi
                        </a>
                    </div>
                </div>
            </section>

            {/* 🗺️ Peta */}
            <section id="peta" className="w-full max-w-6xl px-4 py-16">
                <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">
                    Peta Interaktif
                </h2>
                <MapView />
            </section>

            {/* 🧾 Footer */}
            <footer className="w-full py-6 text-center text-gray-500 text-sm border-t">
                © {new Date().getFullYear()} Pemerintah Kabupaten Teluk Bintuni
            </footer>
        </main>
    );
}
