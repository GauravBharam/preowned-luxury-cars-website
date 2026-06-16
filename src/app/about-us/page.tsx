"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollectionNavbar from "@/components/CollectionNavbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";




gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
    const heroRef = useRef<HTMLElement>(null);
    const storyRef = useRef<HTMLElement>(null);
    const whyUsRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo(".hero-content > *",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    delay: 0.2
                }
            );

            // Video Reveal
            gsap.fromTo(".hero-video",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    delay: 0.8
                }
            );

            // Story Animation
            gsap.fromTo(".story-content > *",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: storyRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );

            // Why Us Animation
            gsap.fromTo(".why-card",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: whyUsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );

            // Full Width Video Animation
            gsap.fromTo(".rally-video",
                { scale: 0.95, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: videoRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden">
            <CollectionNavbar />

            {/* --- HERO SECTION --- */}
            <section ref={heroRef} className="pt-32 pb-20 px-6 md:px-12 bg-gray-50">
                <div className="max-w-7xl mx-auto text-center hero-content">
                    {/* Breadcrumb */}
                    {/* Breadcrumb */}
                    <Breadcrumb theme="dark" />

                    <h1 className="syne font-bold text-5xl md:text-7xl lg:text-8xl text-black mb-6 leading-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900">Deccan Wheels</span>
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-light">
                        Pune's most trusted destination for pre-owned luxury cars. Passion, precision, and performance since 2001.
                    </p>

                    {/* Showroom Walkthrough Video */}
                    <div className="hero-video relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/PzmFiGV6nM0?si=JvQxYlF4qZ8z6v8_"
                            title="Deccan Wheels Showroom Walkthrough"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* --- OUR STORY SECTION (Redesigned) --- */}
            <section ref={storyRef} className="py-24 px-6 md:px-12 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto relative">
                    {/* Background Text Watermark */}
                    <div className="absolute -top-20 -left-20 text-[200px] font-bold text-gray-50 opacity-30 select-none z-0 pointer-events-none hidden lg:block syne">
                        2001
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
                        {/* Left Column: Image Composition */}
                        <div className="relative">
                            <div className="relative h-[600px] w-full rounded-sm overflow-hidden shadow-2xl">
                                <Image
                                    src="/porsche.webp"
                                    alt="Luxury Car Showroom"
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-white">
                                    <p className="uppercase tracking-[0.3em] text-xs font-semibold mb-2">Established</p>
                                    <h3 className="syne font-bold text-4xl">Since 2001</h3>
                                </div>
                            </div>

                            {/* Floating Card */}
                            <div className="hidden lg:block absolute -bottom-10 -right-10 bg-black text-white p-8 max-w-xs shadow-2xl border-l-4 border-white">
                                <p className="syne text-xl italic font-light leading-relaxed">
                                    "We transform the love for luxury cars into a profession."
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Editorial Text */}
                        <div className="story-content pt-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-[1px] w-12 bg-black"></div>
                                <span className="uppercase tracking-[0.3em] text-sm font-bold">The Visionary</span>
                            </div>

                            <h2 className="syne font-bold text-5xl md:text-6xl mb-10 leading-[0.9] text-black">
                                Driven by <span className="italic font-serif">Passion</span>,<br />
                                Defined by <span className="italic font-serif">Class</span>.
                            </h2>

                            <div className="space-y-8 text-gray-600 font-light text-lg leading-relaxed">
                                <p>
                                    <span className="float-left text-7xl font-serif font-bold text-black mr-4 mt-[-1rem] drop-cap">D</span>
                                    eccan Wheels was founded in 2001 by <strong className="text-black font-semibold">Mr. Mallikarjun Niture</strong>, a car enthusiast particularly passionate about luxury vehicles. He transformed his love for automotive excellence into a profession, and thus, a legacy was born.
                                </p>
                                <p>
                                    We understand that we operate in a niche, premium segment where class matters. This reflects in our customer-centric approach. Our professionals carefully listen to and review your needs to present excellent options to match them—from the perfect car to tailored finance and insurance.
                                </p>
                                <p>
                                    Figures speak for our success. With over <strong className="text-black font-semibold">5070+ customers served</strong>, we’ve built an unmatched reputation as Pune's most reliable destination for pre-owned luxury cars.
                                </p>

                                <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">Founder</p>
                                        <p className="syne font-bold text-xl text-black">Mallikarjun Niture</p>
                                    </div>
                                    <div className="font-serif italic text-4xl text-gray-300 select-none">
                                        M. Niture
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- WHY CHOOSE US SECTION --- */}
            <section ref={whyUsRef} className="py-32 px-6 md:px-12 bg-black text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-gray-400 uppercase tracking-[0.2em] text-sm font-medium mb-4 block">Excellence Standard</span>
                        <h2 className="syne font-bold text-5xl md:text-7xl mb-8">Why Choose Us?</h2>
                        <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            We don't just sell cars; we deliver an experience of trust, transparency, and excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Better Understanding",
                                desc: "Tailored financing options from banks and credit unions to suit your specific needs.",
                                icon: (
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                )
                            },
                            {
                                title: "Greater Involvement",
                                desc: "A rigorous 151-point inspection checklist ensures every vehicle meets our premium standards.",
                                icon: (
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                )
                            },
                            {
                                title: "Active Management",
                                desc: "Honest, transparent business practices that build lasting foundations of trust.",
                                icon: (
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                )
                            },
                            {
                                title: "Quality Assurance",
                                desc: "Your one-stop destination in Pune for buying or selling luxury cars with absolute confidence.",
                                icon: (
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                                )
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="why-card group relative bg-zinc-900 border border-zinc-800 p-10 flex flex-col items-start hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-500">
                                <div className="mb-8 w-14 h-14 rounded-full bg-black border border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:border-white transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="syne font-bold text-2xl mb-4 text-white group-hover:translate-x-2 transition-transform duration-300">{item.title}</h3>
                                <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SPORTS RALLY VIDEO SECTION (Gallery Theme) --- */}
            <section ref={videoRef} className="py-32 text-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-20">
                        <span className="text-gray-500 font-medium tracking-[0.3em] text-xs uppercase mb-6 block">Community & Passion</span>
                        <h2 className="syne font-bold text-5xl md:text-7xl mb-8 text-black tracking-tight">
                            Sports Car Rally
                        </h2>
                        <div className="w-24 h-[2px] bg-black mx-auto"></div>
                    </div>

                    {/* Gallery Frame Container */}
                    <div className="rally-video relative mx-auto w-full max-w-6xl p-4 bg-white rounded-xl shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700 ease-out border border-gray-100">
                        <div className="relative w-full aspect-[21/9] rounded-lg overflow-hidden bg-black">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/rmIvp6nZewE?si=7xX1p8j8q7k9v5z1&autoplay=0&controls=1&rel=0"
                                title="Deccan Wheels Sports Car Rally"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                        {/* Caption */}
                        <div className="absolute -bottom-12 right-4 text-right hidden md:block">
                            <p className="syne font-bold text-lg text-gray-300 rotate-[-2deg]">Est. 2023</p>
                        </div>
                    </div>

                    <div className="mt-20 max-w-2xl mx-auto text-center">
                        <p className="text-gray-500 font-light text-lg italic">
                            "More than just cars, it's about the people who drive them."
                        </p>
                    </div>
                </div>
            </section>









            <Footer />
        </main>
    );
}
