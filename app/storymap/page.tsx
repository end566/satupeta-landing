"use client";

import { LogoutButton } from "@/components/LogoutButton";
import StoryMap from "@/components/StoryMap";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function StoryMapPage() {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/auth/session");
            const data = await res.json();
            if (!data) {
                redirect("/login");
            } else {
                setSession(data);
            }
        })();
    }, []);

    if (!session) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
                Loading...
            </main>
        );
    }

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-[90px]">
            {/* 🔴 Tombol Logout - sticky di kanan atas */}
            <div className="fixed top-[90px] right-8 z-50">
                <LogoutButton
                    //className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                    className="bg-gray-200 hover:bg-blue-500 text-gray-700 hover:text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium border border-gray-300"
                >
                    Keluar
                </LogoutButton>

            </div>

            {/* 📜 Konten utama StoryMap */}
            <div className="w-full max-w-6xl px-4">
                <StoryMap />
            </div>
        </main>
    );
}


{/*

"use client";

import StoryMap from "@/components/StoryMap";

export default function StoryMapPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
                        StoryMap Teluk Bintuni
                    </h1>
                    <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
                        Jelajahi berbagai tema pembangunan dan potensi wilayah Kabupaten
                        Teluk Bintuni secara interaktif.
                    </p>
*/}
{/* Panggil komponen */ }
{/*                    
                    <StoryMap />
                </div>
            </section>
        </main>
    );
}

*/}
