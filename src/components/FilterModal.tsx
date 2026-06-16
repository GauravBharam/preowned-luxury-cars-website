"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { cars } from "@/data/cars";
import Image from "next/image";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Filter States
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedState, setSelectedState] = useState<string>("");
    const [selectedKm, setSelectedKm] = useState<string>("");
    const [selectedFuel, setSelectedFuel] = useState<string>("");
    const [selectedPrice, setSelectedPrice] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");

    // Options
    const yearOptions = ["All", "2000-2010", "2011-2020", "2021-2025"];

    // Extract unique states and brands from data
    const stateOptions = useMemo(() => {
        const states = Array.from(new Set(cars.map(c => c.regState)));
        return ["All", ...states.sort()];
    }, []);

    const brandOptions = useMemo(() => {
        const brands = Array.from(new Set(cars.map(c => c.name.split(" ")[0])));
        return ["All", ...brands.sort()];
    }, []);

    const kmOptions = [
        "All", "0-5000", "5000-10000", "10000-20000", "20000+"
    ];

    const fuelOptions = ["All", "Petrol", "Diesel", "Electric", "Hybrid"];

    const priceOptions = [
        "All",
        "Less than 50L",
        "50L - 1Cr",
        "1Cr - 2Cr",
        "2Cr - 5Cr",
        "More than 5Cr"
    ];

    const carTypes = [
        { name: "Sedan", icon: "🚗" },
        { name: "SUV-MUV", icon: "🚙" },
        { name: "Sports", icon: "🏎️" },
        { name: "Hatchback", icon: "🚐" },
        { name: "Convertible", icon: "🌥️" }, // Placeholder icon
        { name: "Coupe", icon: "🚞" }, // Placeholder icon
    ];

    // Initialize state from URL
    useEffect(() => {
        if (isOpen) {
            setSelectedYear(searchParams.get("year") || "All");
            setSelectedState(searchParams.get("state") || "All");
            setSelectedKm(searchParams.get("km") || "All");
            setSelectedFuel(searchParams.get("fuel") || "All");
            setSelectedPrice(searchParams.get("price") || "All");
            setSelectedType(searchParams.get("type") || "");
            setSelectedBrand(searchParams.get("brand") || "All");
        }
    }, [isOpen, searchParams]);

    // Animations
    useEffect(() => {
        if (isOpen) {
            // Prevent body scroll
            document.body.style.overflow = "hidden";

            gsap.set(overlayRef.current, { opacity: 0 });
            gsap.set(modalRef.current, { y: "100%", opacity: 0 });

            gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" });
            gsap.to(modalRef.current, { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 });
        } else {
            // Restore body scroll
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(modalRef.current, {
            y: "100%",
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: onClose
        });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1 });
    };

    const handleReset = () => {
        setSelectedYear("All");
        setSelectedState("All");
        setSelectedKm("All");
        setSelectedFuel("All");
        setSelectedPrice("All");
        setSelectedType("");
        setSelectedBrand("All");
    };

    const handleApply = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedYear && selectedYear !== "All") params.set("year", selectedYear); else params.delete("year");
        if (selectedState && selectedState !== "All") params.set("state", selectedState); else params.delete("state");
        if (selectedKm && selectedKm !== "All") params.set("km", selectedKm); else params.delete("km");
        if (selectedFuel && selectedFuel !== "All") params.set("fuel", selectedFuel); else params.delete("fuel");
        if (selectedPrice && selectedPrice !== "All") params.set("price", selectedPrice); else params.delete("price");
        if (selectedType) params.set("type", selectedType); else params.delete("type");
        if (selectedBrand && selectedBrand !== "All") params.set("brand", selectedBrand); else params.delete("brand");

        // Simple animation close then push
        handleClose();
        setTimeout(() => {
            router.push(`/collection?${params.toString()}`, { scroll: false });
        }, 400);
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-end md:items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={handleClose}
            ></div>

            {/* Modal */}
            <div
                ref={modalRef}
                className="relative w-full max-w-5xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden h-[90vh] md:h-auto md:max-h-[90vh] flex flex-col mx-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                    <button
                        onClick={handleReset}
                        className="text-sm font-medium text-gray-400 hover:text-black transition-colors syne uppercase tracking-wider"
                    >
                        Reset All
                    </button>
                    <h2 className="text-xl font-bold font-syne text-black">Filters</h2>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div ref={contentRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">

                    {/* 1. Registration Year */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest syne">Registration Year</label>
                        <div className="flex flex-wrap gap-2">
                            {yearOptions.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setSelectedYear(opt)}
                                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 syne ${selectedYear === opt
                                        ? "bg-black text-white shadow-lg scale-[1.02]"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 2. Registration State */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest syne">Registration State</label>
                            <div className="relative">
                                <select
                                    value={selectedState}
                                    onChange={(e) => setSelectedState(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-black text-sm rounded-lg px-4 py-3 pr-8 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all syne"
                                >
                                    <option value="" disabled>Select State</option>
                                    {stateOptions.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* 7. Brands */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest syne">Brand</label>
                            <div className="relative">
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="w-full appearance-none bg-gray-50 border border-gray-200 text-black text-sm rounded-lg px-4 py-3 pr-8 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all syne"
                                >
                                    <option value="" disabled>Select Brand</option>
                                    {brandOptions.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Kms Driven */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest syne">Kms Driven</label>
                        <div className="flex flex-wrap gap-2">
                            {kmOptions.map(km => (
                                <button
                                    key={km}
                                    onClick={() => setSelectedKm(km)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 syne ${selectedKm === km
                                        ? "bg-black text-white"
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400"
                                        }`}
                                >
                                    {km}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 4. Fuel Type */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest syne">Fuel Type</label>
                        <div className="flex flex-wrap gap-3">
                            {fuelOptions.map(fuel => (
                                <button
                                    key={fuel}
                                    onClick={() => setSelectedFuel(fuel)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 syne ${selectedFuel === fuel
                                        ? "bg-rose-500 text-white shadow-lg shadow-rose-200"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    {fuel}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 5. Price Range */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest syne">Price Range</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {priceOptions.map(price => (
                                <button
                                    key={price}
                                    onClick={() => setSelectedPrice(price)}
                                    className={`px-4 py-3 rounded-lg text-center text-sm font-medium transition-all duration-200 syne ${selectedPrice === price
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                        : "bg-white border border-gray-100 shadow-sm text-gray-600 hover:border-gray-300"
                                        }`}
                                >
                                    {price}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 6. Car Type (Grid) */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest syne">Car Type</label>
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                            {carTypes.map(type => (
                                <button
                                    key={type.name}
                                    onClick={() => setSelectedType(selectedType === type.name ? "" : type.name)}
                                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200 group ${selectedType === type.name
                                        ? "border-black bg-gray-50 ring-1 ring-black"
                                        : "border-gray-200 bg-white hover:border-gray-400 hover:shadow-md"
                                        }`}
                                >
                                    <span className="text-2xl md:text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">{type.icon}</span>
                                    <span className="text-xs md:text-sm font-medium syne text-gray-700 group-hover:text-black">{type.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-white md:rounded-b-3xl">
                    <button
                        onClick={handleApply}
                        className="w-full bg-black text-white py-4 rounded-lg font-bold font-syne uppercase tracking-wider hover:bg-gray-900 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl"
                    >
                        Show Cars
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
