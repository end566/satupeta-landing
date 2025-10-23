import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import StoryMap from "@/components/StoryMap";
import LogoutButton from "@/components/LogoutButton";
import UserGreeting from "@/components/UserGreeting";

export default async function StoryMapPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    return (
        <div className="relative">
            {/* Header atas: Greeting + Logout */}
            <div className="absolute top-4 right-4 flex items-center gap-3 z-[1000]">
                <UserGreeting />
                <LogoutButton />
            </div>

            {/* Konten utama peta */}
            <StoryMap />
        </div>
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
