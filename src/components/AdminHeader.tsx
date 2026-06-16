"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";

export default function AdminHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("dw_admin_token");
        router.push("/admin/login");
        setLogoutModalOpen(false);
    };

    return (
        <header className="border-b border-white/10 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <Link href="/admin/dashboard">
                <h1 className="text-2xl font-bold tracking-tighter text-white">
                    Deccan Wheels <span className="text-gray-400 font-normal">Admin</span>
                </h1>
            </Link>

            {/* Only show User Info & Logout on non-login pages */}
            {pathname !== "/admin/login" && (
                <div className="flex items-center gap-6">
                    <span className="text-sm text-gray-400 hidden md:block">Welcome, Employee</span>

                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="px-4 py-2 text-sm font-bold text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            {mounted && logoutModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setLogoutModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl shadow-black transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                                    <line x1="12" y1="2" x2="12" y2="12"></line>
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Confirm Logout</h3>
                            <p className="text-gray-400 mb-8">
                                Are you sure you want to log out of the admin portal? You will need to sign in again to access the dashboard.
                            </p>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button
                                    onClick={() => setLogoutModalOpen(false)}
                                    className="w-full py-3 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
}
