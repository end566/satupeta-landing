"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Kirim login ke NextAuth
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res?.ok) {
            // Simpan preferensi "remember me" di localStorage
            if (rememberMe) localStorage.setItem("rememberMe", "true");
            else localStorage.removeItem("rememberMe");

            router.push("/storymap");
        } else {
            setError("Username atau password salah");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-500">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-80 space-y-4"
            >
                <h1 className="text-2xl font-bold text-center text-blue-700">
                    Login Admin
                </h1>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded p-2"
                />

                {/* ✅ Checkbox Remember Me */}
                <label className="flex items-center space-x-2 text-sm">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Ingat saya</span>
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
