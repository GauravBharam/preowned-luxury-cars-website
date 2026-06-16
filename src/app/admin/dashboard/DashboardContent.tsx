"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Car } from "@/data/cars";
import { deleteCar } from "@/app/actions";

export default function DashboardContent({ cars }: { cars: Car[] }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [carToDelete, setCarToDelete] = useState<{ id: number; name: string } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Check for auth token
        const token = localStorage.getItem("dw_admin_token");
        if (!token) {
            router.push("/admin/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleDeleteClick = (e: React.MouseEvent, id: number, name: string) => {
        e.preventDefault();
        setCarToDelete({ id, name });
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (carToDelete) {
            const result = await deleteCar(carToDelete.id);
            if (!result.success) {
                alert("Failed to delete car");
            }
            setDeleteModalOpen(false);
            setCarToDelete(null);
        }
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false);
        setCarToDelete(null);
    };

    if (!isAuthenticated) return null;

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Inventory</h2>
                    <p className="text-gray-400 mt-2">Manage your showroom collection</p>
                </div>
                <Link
                    href="/admin/add-car"
                    className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                >
                    <span className="text-xl">+</span> Add New Car
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cars.map((car) => (
                    <div key={car.id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover shadow-2xl hover:shadow-white/5 flex flex-col">
                        {/* Image Container */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                                src={car.images?.[0] || car.image || "/car-profile-shot.png"}
                                alt={car.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            {/* Status Badge */}
                            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider border backdrop-blur-md ${car.isSold
                                ? "bg-red-500/20 border-red-500/30 text-red-500"
                                : car.isBooked
                                    ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                                    : "bg-white/10 border-white/20 text-white"
                                }`}>
                                {car.isSold ? "● SOLD" : car.isBooked ? "● BOOKED" : "● AVAILABLE"}
                            </div>

                            {/* Price Tag Overlay */}
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-2xl font-bold text-white tracking-tight">{car.price}</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-gray-300 transition-colors">{car.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <span className="flex items-center gap-1">
                                        🗓 {car.year}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                                    <span className="flex items-center gap-1">
                                        🚀 {car.fuelType}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                                    <span className="flex items-center gap-1">
                                        🛣 {car.kmDriven}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-white/5">
                                <Link
                                    href={`/admin/edit-car/${car.id}`}
                                    className="flex justify-center items-center gap-2 py-2.5 rounded-lg bg-white/5 text-sm font-medium text-white hover:bg-white/10 transition-colors border border-white/5 group-hover:border-white/10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                    </svg>
                                    Edit
                                </Link>
                                <button
                                    onClick={(e) => handleDeleteClick(e, car.id, car.name)}
                                    className="flex justify-center items-center gap-2 py-2.5 rounded-lg bg-red-500/10 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-colors border border-red-500/10 group-hover:border-red-500/20"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Delete Modal */}
            {mounted && deleteModalOpen && carToDelete && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={cancelDelete}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl shadow-black transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                    <line x1="12" y1="9" x2="12" y2="13"></line>
                                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Delete Car?</h3>
                            <p className="text-gray-400 mb-8">
                                Are you certain you wish to remove <span className="text-white font-semibold">{carToDelete.name}</span> from the inventory? This action is permanent and cannot be undone.
                            </p>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button
                                    onClick={cancelDelete}
                                    className="w-full py-3 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
