"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import FilterModal from "./FilterModal";

export default function FilterSort() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSort = searchParams.get("sort") || "newest";

    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", e.target.value);
        router.push(`/collection?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Filters Button */}
            <button
                onClick={() => setIsFilterModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-black hover:bg-black hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="4" y1="21" x2="4" y2="14"></line>
                    <line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line>
                    <line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                <span className="syne font-semibold text-sm uppercase tracking-wide">Filters</span>
            </button>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-gray-600 text-sm syne uppercase tracking-wide">
                    Sort By:
                </label>
                <select
                    id="sort"
                    value={currentSort}
                    onChange={handleSortChange}
                    className="bg-transparent border border-gray-300 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-safety transition-colors cursor-pointer syne text-sm"
                >
                    <option value="newest" className="bg-white">Newest First</option>
                    <option value="oldest" className="bg-white">Oldest First</option>
                    <option value="price-low" className="bg-white">Price: Low to High</option>
                    <option value="price-high" className="bg-white">Price: High to Low</option>
                    <option value="km-low" className="bg-white">KM: Low to High</option>
                    <option value="km-high" className="bg-white">KM: High to Low</option>
                </select>
            </div>

            <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />
        </div>
    );
}
