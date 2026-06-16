"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const brands = [
    { name: "Mercedes", logo: "/Images/Logo/mercedes.png" },
    { name: "BMW", logo: "/Images/Logo/bmw.png" },
    { name: "Audi", logo: "/Images/Logo/audi.png" },
    { name: "Ferrari", logo: "/Images/Logo/ferrari.png" },
    { name: "Porsche", logo: "/Images/Logo/porsche.png" },
    { name: "Lamborghini", logo: "/Images/Logo/lamborghini.png" },
    { name: "Maserati", logo: "/Images/Logo/maserati.png" },
    { name: "Bentley", logo: "/Images/Logo/bentely.png" },
    { name: "McLaren", logo: "/Images/Logo/mclaren.png" },
    { name: "Rolls Royce", logo: "/Images/Logo/rollsroyce.png" },
    { name: "Lexus", logo: "/Images/Logo/lexus.png" },
    { name: "Jaguar", logo: "/Images/Logo/jaguar.png" },
    { name: "Land Rover", logo: "/Images/Logo/land-rover.png" },
    { name: "Mini", logo: "/Images/Logo/mini-cooper.png" },
    { name: "Volkswagen", logo: "/Images/Logo/wolkeswagen.png" },
    { name: "Toyota", logo: "/Images/Logo/toyota.png" },
    { name: "Ford", logo: "/Images/Logo/ford.png" },
    { name: "Jeep", logo: "/Images/Logo/jeep.png" },
    { name: "Chevrolet", logo: "/Images/Logo/cheverolet.png" },
    { name: "Mustang", logo: "/Images/Logo/mustang.png" },
    { name: "Volvo", logo: "/Images/Logo/volvo.png" },
];

export default function BrandSearch() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // 1. Title Fade Up
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
        });

        // 2. Logos Staggered Entrance
        if (gridRef.current) {
            gsap.from(gridRef.current.children, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power2.out",
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="brand-search" className="w-full px-6 md:px-12 py-20 bg-white text-black relative z-20">
            <div className="max-w-7xl mx-auto text-center">
                {/* Header */}
                <div ref={titleRef} className="mb-16">
                    <h2 className="syne font-bold text-3xl md:text-5xl mb-4 text-center">
                        #1 Place for All Luxury Cars
                    </h2>
                    <p className="text-gray-600 mb-16 text-lg md:text-xl">
                        Click on any brand to see amazing options
                    </p>
                </div>

                {/* Brand Grid */}
                <div ref={gridRef} className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8 md:gap-x-12 items-start justify-items-center">
                    {brands.map((brand) => (
                        <div
                            key={brand.name}
                            className="brand-item group cursor-pointer flex flex-col items-center gap-3"
                        >
                            <div className="w-16 md:w-20 h-16 flex items-center justify-center">
                                <Image
                                    src={brand.logo}
                                    alt={`${brand.name} Logo`}
                                    width={80}
                                    height={80}
                                    className="object-contain w-full h-full transition-all duration-300 filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                                />
                            </div>
                            <p className="syne text-xs font-semibold text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors duration-300">
                                {brand.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
