"use client";
import { signOut } from "next-auth/react";

export function LogoutButton({ className }: { className?: string }) {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={`px-4 py-2 rounded-md text-white font-medium transition 
        bg-gradient-to-r from-blue-500 via-slate-500 to-blue-600 
        hover:from-blue-600 hover:via-slate-600 hover:to-blue-700 
        shadow-md hover:shadow-lg ${className || ""}`}
        >
            Keluar
        </button>
    );
}
