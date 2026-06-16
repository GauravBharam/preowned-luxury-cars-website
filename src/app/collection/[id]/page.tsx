"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { animate, stagger, random } from "animejs";
import CollectionNavbar from "@/components/CollectionNavbar";
import Breadcrumb from "@/components/Breadcrumb";
import SearchByType from "@/components/SearchByType";
import BrandSearch from "@/components/BrandSearch";
import Footer from "@/components/Footer";
import { cars } from "@/data/cars";

gsap.registerPlugin(ScrollTrigger);

// Icons
const CloseIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);
const YearIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);
const FuelIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);
const KMIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const StateIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);
const CheckIcon = () => (
    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);
const ModelIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19H5V8h14m-3-5v2.206l-1.6 2.454a1 1 0 01-.836.454H9.436a1 1 0 01-.836-.454L7 5.206V3"></path><circle cx="7.5" cy="14.5" r="1.5"></circle><circle cx="16.5" cy="14.5" r="1.5"></circle></svg>
);
const ColorIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
);
const InteriorIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
);
const RegNoIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M15 11h3m-3 4h2"></path></svg>
);
const OwnerIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
);
const InsuranceIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
);
const ServiceIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);
const WarrantyIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
);

export default function CarDetailPage() {
    const params = useParams();
    const id = Number(params.id);
    const car = cars.find((c) => c.id === id);

    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(1);
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const mainRef = useRef<HTMLElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!car) return;

        // Clean values for animation
        const targetYear = car.year;
        // Parse KM: "12,000 km" -> 12000
        const targetKm = parseInt(car.kmDriven.replace(/[^0-9]/g, "")) || 0;

        const ctx = gsap.context(() => {
            // Animate Year
            if (statsRef.current[0]) {
                gsap.fromTo(statsRef.current[0],
                    { innerText: 0 },
                    {
                        innerText: targetYear,
                        duration: 1,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: statsRef.current[0],
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        }
                    }
                );
            }
            // Animate KM
            if (statsRef.current[1]) {
                gsap.fromTo(statsRef.current[1],
                    { innerText: 0 },
                    {
                        innerText: targetKm,
                        duration: 1.2,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: statsRef.current[1],
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                        onUpdate: function () {
                            if (statsRef.current[1]) {
                                statsRef.current[1].innerText = Math.round(this.targets()[0].innerText).toLocaleString();
                            }
                        }
                    }
                );
            }
        }, mainRef);

        return () => ctx.revert();
    }, [car]);

    useLayoutEffect(() => {
        if (!car) return;

        const ctx = gsap.context(() => {
            // Content Entry
            gsap.from(contentRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.1
            });



        }, mainRef);

        return () => ctx.revert();
    }, [car]);

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <p>Car not found.</p>
            </div>
        );
    }

    const openGallery = (index: number) => {
        setCurrentImageIndex(index);
        setIsGalleryOpen(true);
    };

    const imageList = [car.images[car.images.length - 1], ...car.images, car.images[0]];

    const nextImage = () => {
        if (!isTransitioning) return;
        setCurrentImageIndex((prev) => prev + 1);
    };

    const prevImage = () => {
        if (!isTransitioning) return;
        setCurrentImageIndex((prev) => prev - 1);
    };

    useEffect(() => {
        if (currentImageIndex === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentImageIndex(imageList.length - 2);
            }, 500); // Wait for transition
        } else if (currentImageIndex === imageList.length - 1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentImageIndex(1);
            }, 500);
        } else {
            setIsTransitioning(true);
        }
    }, [currentImageIndex, imageList.length]);

    // Reset transition state after jump
    useEffect(() => {
        if (!isTransitioning) {
            // Force reflow/next tick to re-enable transition
            const timer = setTimeout(() => {
                setIsTransitioning(true);
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    // Helper to extract brand and model
    const getCarDetails = (fullName: string) => {
        // If brand is explicitly set in data, use it
        if (car && car.brand) {
            return { brand: car.brand, model: car.name };
        }

        const specialBrands = ["Rolls Royce", "Land Rover", "Range Rover", "Aston Martin", "Mercedes-Benz"];
        for (const brand of specialBrands) {
            if (fullName.startsWith(brand)) {
                return { brand, model: fullName.replace(brand, "").trim() };
            }
        }
        const parts = fullName.split(" ");
        return { brand: parts[0], model: parts.slice(1).join(" ") };
    };

    const { brand, model } = car ? getCarDetails(car.name) : { brand: "", model: "" };

    // Anime.js Animation for Brand & Profile Shot
    useLayoutEffect(() => {
        if (!car) return;

        // 1. Kinetic Brand Name Reveal (Explosion to Order)
        // Set initial random state
        const letterElements = document.querySelectorAll(".brand-letter");
        if (letterElements.length) {
            animate(letterElements, {
                opacity: [0, 1],
                translateX: () => random(-500, 500),
                translateY: () => random(-500, 500),
                translateZ: () => random(-1000, 1000),
                rotate: () => random(-180, 180),
                scale: [0, 1],
                duration: 2500,
                delay: stagger(50),
                easing: "easeOutExpo",
                endDelay: 500,
                // Animate to normal state
                keyframes: [
                    { translateX: 0, translateY: 0, translateZ: 0, rotate: 0, scale: 1, duration: 2000 }
                ]
            });
        }

        // 2. Shutter Reveal for Car Image
        // Animate the shutters opening
        animate(".shutter-panel", {
            scaleY: [1, 0],
            transformOrigin: "top",
            duration: 1200,
            delay: stagger(100, { from: 'center' }),
            easing: "easeInOutQuart"
        });

        // Slight Zoom on Car Image itself
        animate(".profile-car-img", {
            scale: [1.2, 1],
            opacity: [0, 1],
            duration: 2000,
            delay: 500,
            easing: "easeOutQuad"
        });

    }, [car]);

    // Generate shutters
    const shutters = Array.from({ length: 12 }).map((_, i) => (
        <div
            key={i}
            className="shutter-panel absolute top-0 h-full bg-white z-20 border-r border-gray-100"
            style={{
                left: `${(i / 12) * 100}%`,
                width: `${(100 / 12)}%`
            }}
        />
    ));

    return (
        <main ref={mainRef} className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
            <CollectionNavbar />

            {/* HERO SECTION */}
            <div ref={contentRef} className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">

                {/* 1. Background Brand Name (Watermark) */}
                <div className="absolute top-36 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none flex justify-center items-center z-0 perspective-[1000px]">
                    <span className="syne font-black text-7xl md:text-9xl leading-none text-gray-900/5 opacity-100 uppercase tracking-tighter whitespace-nowrap">
                        {brand.split("").map((char, i) => (
                            <span key={i} className="brand-letter inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </span>
                </div>

                {/* 2. Main Profile Shot with Shutters */}
                <div className="profile-shot-container relative z-10 w-full max-w-7xl aspect-[16/9] md:aspect-[2.2/1] -mt-10 md:-mt-20 overflow-hidden">
                    {/* The Image */}
                    <div className="relative w-full h-full profile-car-img opacity-0">
                        <Image
                            src={car.image || "/car-profile-shot.png"}
                            alt={car.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>

                    {/* The Shutters Overlay */}
                    <div className="absolute inset-0 w-full h-full z-30 pointer-events-none flex">
                        {shutters}
                    </div>
                </div>

                {/* 3. Car Name & Info (Details below car) */}
                <div className="relative z-10 flex flex-col items-center -mt-12 md:-mt-16">
                    {/* Car Type Tag */}
                    <div className="mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-white/50 backdrop-blur-sm px-2 py-1 rounded">
                            {car.type}
                        </span>
                    </div>

                    <h1 className="syne text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight">
                        {model}
                    </h1>

                    {/* Fuel Tag */}
                    <div className="mb-6">
                        <span className="px-5 py-2 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-600 bg-gray-50/80 backdrop-blur-sm">
                            {car.fuelType}
                        </span>
                    </div>

                    {/* Short Description */}
                    <p className="max-w-xl text-gray-500 leading-relaxed text-sm md:text-base mx-auto mb-8">
                        Experience the pinnacle of automotive engineering with this pristine {car.name}.
                        Finished in {car.specs.exteriorColor}, it represents the perfect blend of performance and luxury.
                    </p>

                    {/* Price */}
                    <div className="mb-20 flex flex-col items-center gap-6">
                        <span className="syne text-3xl md:text-5xl font-bold text-black tracking-tight">{car.price}</span>

                        <div className="flex items-center gap-4">
                            <button
                                className="bg-black text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                disabled={car.isBooked}
                            >
                                {car.isBooked ? 'Sold Out' : 'Reserve This Car'}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </button>

                            <a
                                href={`https://wa.me/919876543210?text=I'm interested in the ${car.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold text-sm hover:bg-[#128C7E] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 duration-200 flex items-center gap-2"
                                aria-label="Chat on WhatsApp"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>

                    {/* Stats & Front Shot Section */}
                    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-4 md:px-12 mt-16">
                        {/* Left: Stats & Action */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-16">
                            <div className="grid grid-cols-1 gap-12 w-full">
                                {/* Stat 1: Year */}
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex items-baseline gap-1">
                                        <span ref={(el) => { if (el) statsRef.current[0] = el }} className="syne text-6xl md:text-8xl font-bold text-black leading-none">
                                            0
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500 mt-2">Registered Year</span>
                                </div>

                                {/* Stat 2: KM / Power (Mocking Power for now as per ref image, or using KM if data missing) */}
                                {/* NOTE: Using KM as placeholder but styling like the ref "220 kW / 300 PS" */}
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex items-baseline gap-2">
                                        <span ref={(el) => { if (el) statsRef.current[1] = el }} className="syne text-6xl md:text-8xl font-bold text-black leading-none">
                                            0
                                        </span>
                                        <span className="syne text-2xl text-black font-medium">km driven</span>
                                    </div>
                                    <span className="text-sm text-gray-500 mt-2">Total Distance</span>
                                </div>

                                {/* Stat 3: Speed / Ownership */}
                                <div className="flex flex-col items-center md:items-start">
                                    <div className="flex items-baseline gap-1">
                                        <span className="syne text-6xl md:text-8xl font-bold text-black leading-none">
                                            {car.specs.owner ? car.specs.owner.split(" ")[0] : "-"}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500 mt-2">Ownership</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsSpecsOpen(true)}
                                className="px-10 py-5 border border-black text-black font-medium text-sm hover:bg-black hover:text-white transition-all duration-300 rounded"
                            >
                                View all technical details
                            </button>
                        </div>

                        {/* Right: Front Profile Shot */}
                        <div className="relative w-full h-full min-h-[250px] md:min-h-[300px] flex items-center justify-center">
                            <Image
                                src={car.images?.[0] || car.image || "/car-profile-shot.png"}
                                alt="Front View"
                                width={800}
                                height={600}
                                className="object-cover drop-shadow-2xl h-[350px] h-[500px]"
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* Technical Details Drawer */}
            <div className={`fixed inset-0 z-[9999] transition-visibility duration-500 ${isSpecsOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isSpecsOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsSpecsOpen(false)}
                />

                {/* Drawer Panel */}
                <div className={`absolute top-0 left-0 bottom-0 w-full md:w-1/2 bg-white shadow-2xl overflow-y-auto transition-transform duration-500 transform ${isSpecsOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
                    <div className="p-8 flex-1">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="syne text-2xl font-bold uppercase tracking-wide">Technical Details</h2>
                            <button
                                onClick={() => setIsSpecsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "Make / Model", value: car.name },
                                { label: "Year", value: car.year },
                                { label: "Kilometers", value: car.kmDriven },
                                { label: "Fuel Type", value: car.fuelType },
                                { label: "State", value: car.regState },
                                { label: "Exterior Color", value: car.specs.exteriorColor },
                                { label: "Interior Trim", value: car.specs.interiorColor },
                                { label: "Registration No.", value: car.specs.regNo },
                                { label: "Ownership", value: car.specs.owner },
                                { label: "Insurance", value: car.specs.insurance },
                                { label: "Service Package", value: car.specs.servicePack },
                                { label: "Warranty", value: car.specs.warranty },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-1 border-b border-gray-100 pb-4 md:border-0 md:pb-0">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.label}</span>
                                    <span className="syne text-lg font-bold text-black">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fixed Bottom Reserve Button */}
                    <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0">
                        <button
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg tracking-wide hover:bg-gray-800 transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={car.isBooked}
                        >
                            {car.isBooked ? 'Sold Out' : 'Reserve This Car'}
                        </button>
                    </div>
                </div>
            </div>





            {/* Infinite Centered Gallery Slider */}
            <div className="relative w-full py-10 bg-white overflow-hidden flex flex-col items-center">
                <div className="relative w-full max-w-[1920px] mx-auto h-[600px] md:h-[700px]">
                    {/* Track Container */}
                    <div
                        className={`flex h-full items-center ${isTransitioning ? 'transition-transform duration-500 ease-out' : 'transition-none'}`}
                        style={{
                            transform: `translateX(calc(-${currentImageIndex * 60}vw + 20vw))`, // Center the current image
                            width: `${imageList.length * 60}vw`
                        }}
                    >
                        {imageList.map((img, idx) => (
                            <div
                                key={idx}
                                className="relative h-full w-[60vw] flex-shrink-0 px-2 cursor-pointer"
                                onClick={() => {
                                    // Handle clicks on clones correctly
                                    if (idx === 0) setCurrentImageIndex(imageList.length - 2);
                                    else if (idx === imageList.length - 1) setCurrentImageIndex(1);
                                    else setCurrentImageIndex(idx);
                                }}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={img}
                                        alt={`Gallery Image ${idx}`}
                                        fill
                                        className="object-cover"
                                        priority={Math.abs(currentImageIndex - idx) <= 1}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg hover:bg-white transition-all"
                    aria-label="Previous Image"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg hover:bg-white transition-all"
                    aria-label="Next Image"
                >
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>

            <SearchByType />
            <BrandSearch />

            <Footer />
        </main>
    );
}
