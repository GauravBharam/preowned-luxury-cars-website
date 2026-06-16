"use client";

import { useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const toggleBtnRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Overlay Fade In
            tl.fromTo(
                ".hero-overlay",
                { opacity: 0 },
                { opacity: 1, duration: 1.5 }
            )
                // Headline Slide Up
                .to(
                    headlineRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "power4.out",
                    },
                    "-=0.5"
                )
                // Button Slide Up
                .fromTo(
                    buttonRef.current,
                    {
                        y: 30,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out", // Smooth natural ease
                        onComplete: () => {
                            // Enable transitions for hover effects after animation
                            if (buttonRef.current) {
                                buttonRef.current.style.transition = "all 0.3s ease";
                            }
                        }
                    },
                    "-=0.8"
                );
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Video Autoplay Handling
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }
    }, []);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                toggleBtnRef.current?.classList.remove("paused");
            } else {
                videoRef.current.pause();
                toggleBtnRef.current?.classList.add("paused");
            }
        }
    };

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
            >
                <source src="/Video/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Gradient Overlay */}
            <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 pointer-events-none"></div>

            {/* Hero Content */}
            <div className="absolute z-10 w-full max-w-2xl flex flex-col items-start text-left left-6 md:left-24 top-1/2 md:top-2/3 -translate-y-1/2 hero-content px-6 md:px-0">
                <h1
                    ref={headlineRef}
                    className="hero-headline text-3xl md:text-5xl font-bold font-syne uppercase tracking-tighter leading-tight opacity-0 translate-y-8 drop-shadow-2xl text-white mb-8"
                >
                    Get your Dream car at Deccan Wheels
                </h1>

                <Link href="/collection">
                    <button
                        ref={buttonRef}
                        className="discover-btn px-10 py-4 border border-white bg-transparent text-white font-bold text-sm tracking-widest uppercase cursor-pointer hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1 backdrop-blur-sm rounded-lg opacity-0"
                    >
                        View Collection
                    </button>
                </Link>
            </div>

            {/* Video Control Button */}
            <button
                ref={toggleBtnRef}
                onClick={toggleVideo}
                className="absolute bottom-8 right-8 z-20 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all group"
                aria-label="Toggle Video Playback"
            >
                {/* Pause Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-white group-[.paused]:hidden"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
                {/* Play Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 text-white hidden group-[.paused]:block ml-0.5"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
            </button>
        </section>
    );
}
