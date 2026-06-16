"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const carTypes = [
    {
        name: "Sedan",
        image: "https://static.wixstatic.com/media/71485a_f2fd8754525e470ab2474255fbac63d2~mv2.jpeg/v1/fit/w_1768,h_522,q_90,enc_avif,quality_auto/71485a_f2fd8754525e470ab2474255fbac63d2~mv2.jpeg",
    },
    {
        name: "SUV-MUV",
        image: "https://static.wixstatic.com/media/71485a_aba742a111d04b89b4abcb50125cfc8a~mv2.jpeg",
    },
    {
        name: "Sports",
        image: "https://static.wixstatic.com/media/71485a_d7d6a295512b4a5ab432d9c391d5ccd3~mv2.jpg?dn=DSC04111.jpg",
    },
    {
        name: "Hatchback",
        image: "https://static.wixstatic.com/media/71485a_2a996255d2034672b5d5dfe86cfc24ba~mv2.jpg?dn=DSC03110.jpg",
    },
    {
        name: "Convertible",
        image: "https://static.wixstatic.com/media/71485a_8426d9bce04c4327bb6129f08272f187~mv2.jpg?dn=DSC04636.jpg",
    },
    {
        name: "Coupe",
        image: "https://static.wixstatic.com/media/71485a_aa32b034fd4b4db39bb832d588f4aab6~mv2.jpeg",
    },
];

export default function SearchByType() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // 1. Title & Subtitle Fade Up
        gsap.from(titleRef.current, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
        });

        // 2. Cards Staggered Entrance
        gsap.from(cardsRef.current, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.out",
        });
    }, []);

    return (
        <section
            id="search-by-type"
            ref={sectionRef}
            className="w-full px-6 md:px-12 py-20 bg-white text-black relative z-20"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div ref={titleRef} className="mb-10 text-left">
                    <h2 className="syne font-bold text-3xl md:text-5xl mb-4 text-black">
                        Search Cars by Type
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl">
                        Click on a Car type to see amazing options
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {carTypes.map((car, index) => (
                        <div
                            key={car.name}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="group cursor-pointer relative overflow-hidden rounded-xl aspect-[16/9]"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                                style={{ backgroundImage: `url(${car.image})` }}
                            ></div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-300"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end z-10">
                                <h3 className="font-medium text-lg tracking-wide text-white">
                                    {car.name}
                                </h3>
                                <span className="text-white text-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
