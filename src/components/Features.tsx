"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

import Link from "next/link";

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);
    const card1Ref = useRef<HTMLAnchorElement>(null);
    const card2Ref = useRef<HTMLAnchorElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (!sectionRef.current) return;

            const cards = [card1Ref.current, card2Ref.current];

            gsap.fromTo(cards,
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        once: true,
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "power2.out",
                    clearProps: "all"
                });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="features-section" className="w-full grid grid-cols-1 md:grid-cols-2 h-[75vh] overflow-hidden bg-black text-white">

            {/* Card 1: Premium Selection */}
            <Link
                href="/collection"
                ref={card1Ref}
                className="relative group h-full w-full overflow-hidden cursor-pointer block"
            >
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop"
                        alt="Luxury Interior"
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 md:p-16 w-full flex flex-col items-start transform transition-transform duration-500 ease-out group-hover:-translate-y-2 z-10">
                    <span className="syne text-xs font-bold tracking-[0.2em] text-safety mb-4 uppercase inline-block border-b border-safety pb-1">
                        Premium Selection
                    </span>
                    <h2 className="syne text-4xl md:text-6xl font-bold text-white mb-6 leading-none">
                        Buy<br />Pre-Owned
                    </h2>
                    <p className="text-gray-300 text-lg font-light max-w-md leading-relaxed opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                        Curated excellence. Every vehicle verifies our promise of absolute confidence and luxury.
                    </p>
                    <div className="mt-8 flex items-center gap-3 opacity-0 translate-y-4 transition-all duration-500 delay-200 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="text-white text-sm uppercase tracking-widest font-semibold group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all">Explore Collection</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                </div>

                {/* Big Numeral */}
                <span className="absolute top-8 right-8 text-6xl md:text-8xl font-bold text-white/5 syne pointer-events-none select-none z-0">
                    01
                </span>
            </Link>

            {/* Card 2: Certified Engineering */}
            <Link
                href="/about-us"
                ref={card2Ref}
                className="relative group h-full w-full overflow-hidden cursor-pointer bg-neutral-900 block"
            >
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1498887960847-2a5e46312788?q=80&w=2070&auto=format&fit=crop"
                        alt="Car Engine"
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-50 group-hover:opacity-90 grayscale group-hover:grayscale-0"
                    />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 md:p-16 w-full flex flex-col items-start transform transition-transform duration-500 ease-out group-hover:-translate-y-2 z-10">
                    <span className="syne text-xs font-bold tracking-[0.2em] text-safety mb-4 uppercase inline-block border-b border-safety pb-1">
                        Engineering Certified
                    </span>
                    <h2 className="syne text-4xl md:text-6xl font-bold text-white mb-6 leading-none">
                        Like New<br />Condition
                    </h2>
                    <p className="text-gray-300 text-lg font-light max-w-md leading-relaxed opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                        Rigorous 151-point inspection. We ensure perfection in every mechanical component.
                    </p>
                    <div className="mt-8 flex items-center gap-3 opacity-0 translate-y-4 transition-all duration-500 delay-200 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="text-white text-sm uppercase tracking-widest font-semibold">Explore About Us</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                </div>

                {/* Big Numeral */}
                <span className="absolute top-8 right-8 text-6xl md:text-8xl font-bold text-white/5 syne pointer-events-none select-none z-0">
                    02
                </span>
            </Link>

        </section>
    );
}
