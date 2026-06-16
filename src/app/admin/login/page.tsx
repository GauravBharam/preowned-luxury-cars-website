"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Mock Authentication
        if (email === "admin@deccanwheels.com" && password === "admin123") {
            // Set a mock token or just redirect (client-side only for demo)
            localStorage.setItem("dw_admin_token", "mock-token-123");
            router.push("/admin/dashboard");
        } else {
            setError("Invalid credentials. Try admin@deccanwheels.com / admin123");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Employee Login</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="admin@deccanwheels.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="admin123"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
