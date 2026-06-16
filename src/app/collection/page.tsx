"use client";

import { useLayoutEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollectionNavbar from "@/components/CollectionNavbar";
import Breadcrumb from "@/components/Breadcrumb";
import FilterSort from "@/components/FilterSort";
import CarCard from "@/components/CarCard";
import SearchByType from "@/components/SearchByType";
import BrandSearch from "@/components/BrandSearch";
import Footer from "@/components/Footer";
import { cars } from "@/data/cars";

gsap.registerPlugin(ScrollTrigger);

function CollectionContent() {
    const mainRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Filter Logic
    const searchParams = useSearchParams();
    const typeFilter = searchParams.get("type");
    const yearFilter = searchParams.get("year");
    const stateFilter = searchParams.get("state");
    const kmFilter = searchParams.get("km");
    const fuelFilter = searchParams.get("fuel");
    const priceFilter = searchParams.get("price");
    const brandFilter = searchParams.get("brand");
    const sortParam = searchParams.get("sort") || "newest";

    const parsePrice = (p: string) => parseInt(p.replace(/[^0-9]/g, ""));
    const parseKm = (k: string) => parseInt(k.replace(/[^0-9]/g, ""));

    let displayedCars = cars.filter(car => {
        // Type Filter
        if (typeFilter && car.type.toLowerCase() !== typeFilter.toLowerCase()) return false;

        // Brand Filter
        if (brandFilter && brandFilter !== "All") {
            const filterLower = brandFilter.toLowerCase();
            const carBrand = (car.brand || "").toLowerCase();
            const carName = car.name.toLowerCase();

            // Match if brand equals filter OR (fallback) name starts with filter
            // stricter brand check prevents "Ford" matching "Ford Endeavour" if brand is actually "Ford"
            // but here we want to find cars OF that brand.
            // If car.brand is present, use that. 
            if (car.brand) {
                if (carBrand !== filterLower) return false;
            } else {
                // Fallback for legacy data without brand field
                if (!carName.startsWith(filterLower)) return false;
            }
        }

        // State Filter
        if (stateFilter && stateFilter !== "All" && car.regState !== stateFilter) return false;

        // Fuel Filter
        if (fuelFilter && fuelFilter !== "All" && car.fuelType !== fuelFilter) return false;

        // Year Filter
        if (yearFilter && yearFilter !== "All") {
            const [start, end] = yearFilter.split("-").map(Number);
            if (yearFilter.includes("-")) {
                if (car.year < start || car.year > end) return false;
            }
            // Add other year logic if needed, but currently only ranges are used
        }

        // KM Filter
        if (kmFilter && kmFilter !== "All") {
            const carKm = parseKm(car.kmDriven);
            if (kmFilter.includes("+")) {
                const min = parseInt(kmFilter.replace("+", ""));
                if (carKm < min) return false;
            } else {
                const [min, max] = kmFilter.split("-").map(Number);
                if (carKm < min || carKm > max) return false;
            }
        }

        // Price Filter
        if (priceFilter && priceFilter !== "All") {
            const carPrice = parsePrice(car.price);

            if (priceFilter === "Less than 50L") {
                if (carPrice >= 5000000) return false;
            } else if (priceFilter === "More than 5Cr") {
                if (carPrice <= 50000000) return false;
            } else {
                // Handle ranges like "50L - 1Cr"
                // Normalize string to comparable numbers
                const parseRangeValue = (val: string) => {
                    if (val.includes("L")) return parseFloat(val.replace("L", "")) * 100000;
                    if (val.includes("Cr")) return parseFloat(val.replace("Cr", "")) * 10000000;
                    return 0;
                };

                const parts = priceFilter.split(" - ");
                if (parts.length === 2) {
                    const min = parseRangeValue(parts[0]);
                    const max = parseRangeValue(parts[1]);
                    if (carPrice < min || carPrice > max) return false;
                }
            }
        }

        return true;
    });

    // Sorting Logic
    displayedCars.sort((a, b) => {
        const parsePrice = (p: string) => parseInt(p.replace(/[^0-9]/g, ""));
        const parseKm = (k: string) => parseInt(k.replace(/[^0-9]/g, ""));

        switch (sortParam) {
            case "price-low":
                return parsePrice(a.price) - parsePrice(b.price);
            case "price-high":
                return parsePrice(b.price) - parsePrice(a.price);
            case "km-low":
                return parseKm(a.kmDriven) - parseKm(b.kmDriven);
            case "km-high":
                return parseKm(b.kmDriven) - parseKm(a.kmDriven);
            case "oldest":
                return a.year - b.year;
            case "newest":
            default:
                return b.year - a.year;
        }
    });

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".car-card-wrapper", { y: 60, opacity: 0 });
            gsap.set([headerRef.current, filterRef.current], { y: 30, opacity: 0 });

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.to(headerRef.current, {
                y: 0,
                opacity: 1,
                duration: 1
            })
                .to(filterRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8
                }, "-=0.6");

            // Scroll Reveal Batching
            ScrollTrigger.batch(".car-card-wrapper", {
                start: "top 85%",
                onEnter: (batch) => {
                    gsap.to(batch, {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        stagger: 0.15,
                        overwrite: true,
                        ease: "power3.out"
                    });
                },
                onLeaveBack: (batch) => {
                    gsap.to(batch, {
                        y: 60,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        overwrite: true,
                        ease: "power3.in"
                    });
                },
                once: false
            });

        }, mainRef);

        return () => ctx.revert();
    }, [displayedCars]); // Re-run animation on filter change

    return (
        <main ref={mainRef} className="min-h-screen bg-white">
            <CollectionNavbar />

            <div className="pt-[120px] px-6 md:px-12 max-w-7xl mx-auto">
                <div ref={headerRef}>
                    <Breadcrumb theme="dark" />

                    <h1 className="syne text-4xl md:text-5xl font-bold text-black mt-8 mb-6">
                        {typeFilter ? `${typeFilter} Collection` : "Our Collection"}
                    </h1>

                    <div className="w-full h-px bg-gray-200 mb-8"></div>
                </div>

                <div ref={filterRef}>
                    <FilterSort />
                </div>

                {displayedCars.length > 0 ? (
                    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-20">
                        {displayedCars.map((car) => (
                            <div key={car.id} className="car-card-wrapper h-full">
                                <CarCard car={car} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-20 text-center py-20">
                        <p className="text-xl text-gray-500 font-syne">No cars found for "{typeFilter}".</p>
                        <a href="/collection" className="mt-4 inline-block text-black underline hover:text-gray-600">View all cars</a>
                    </div>
                )}
            </div>


            <SearchByType />
            <BrandSearch />

            <Footer />
        </main >
    );
}

export default function CollectionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
            <CollectionContent />
        </Suspense>
    );
}
