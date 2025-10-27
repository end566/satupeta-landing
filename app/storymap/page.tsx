"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StoryMap from "@/components/StoryMap";
import { LogoutButton } from "@/components/LogoutButton";

export default function StoryMapPage() {
    const [session, setSession] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("/api/auth/session");
                const data = await res.json();

                if (!data || !data.user) {
                    router.push("/login"); // 🔹 redirect kalau belum login
                } else {
                    setSession(data);
                }
            } catch (error) {
                console.error("Gagal memeriksa sesi:", error);
                router.push("/login");
            }
        };

        checkSession();
    }, [router]);

    if (!session) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-600">
                Memeriksa sesi pengguna...
            </main>
        );
    }

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-[90px]">
            <div className="fixed top-[90px] right-8 z-50">
                <LogoutButton
                    className="bg-gray-200 hover:bg-blue-500 text-gray-700 hover:text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium border border-gray-300"
                >
                    Keluar
                </LogoutButton>
            </div>

            <div className="w-full max-w-6xl px-4">
                <StoryMap />
            </div>
        </main>
    );
}
