"use client";

import { useSession } from "next-auth/react";

export default function UserGreeting() {
    const { data: session } = useSession();

    if (!session) return null;

    return (
        <div className="text-white bg-blue-700/80 px-4 py-2 rounded-lg shadow-md text-sm font-medium">
            👋 Halo, {session.user?.name || "Admin"}
        </div>
    );
}
