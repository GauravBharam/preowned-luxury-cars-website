"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollectionNavbar from "@/components/CollectionNavbar";
import Footer from "@/components/Footer";
import BrandSearch from "@/components/BrandSearch";
import Breadcrumb from "@/components/Breadcrumb";

gsap.registerPlugin(ScrollTrigger);

// --- Animated Counter Component ---
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const proxy = { val: 0 };
            gsap.to(proxy, {
                val: end,
                duration: duration,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: countRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                onUpdate: () => {
                    setCount(Math.floor(proxy.val));
                }
            });
        }, countRef);

        return () => ctx.revert();
    }, [end, duration]);

    return <span ref={countRef}>{count}{suffix}</span>;
};

// --- FAQ Data ---
const faqs = [
    {
        question: "How long does the process take?",
        answer: "Our streamlined process is designed to get you an offer within 29 minutes of inspection. The entire sale can be completed in as little as 24 hours."
    },
    {
        question: "What documents do I need to sell my car?",
        answer: "You'll need your RC (Registration Certificate), Insurance policy, pollution certificate, and ID proof. Service history records are also highly recommended for the best valuation."
    },
    {
        question: "Do you buy cars with outstanding loans?",
        answer: "Yes, we can handle the loan foreclosure process for you. The outstanding amount will be deducted from the final offer price."
    },
    {
        question: "Is the inspection free?",
        answer: "Yes, our luxury car inspection service is completely free and comes with no obligation to sell."
    },
    {
        question: "How is the price determined?",
        answer: "We use AI-driven market data combined with a physical inspection by our luxury car experts to offer a fair and competitive price based on your car's condition and market demand."
    }
];

export default function SellYourCar() {
    // Refs for animations
    const heroRef = useRef<HTMLDivElement>(null);
    const howItWorksRef = useRef<HTMLElement>(null);
    const highlightsRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLElement>(null);
    const faqRef = useRef<HTMLElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        brand: "",
        model: "",
        message: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you! We will contact you shortly.");
        // Here you would typically send the data to your backend
    };

    // GSAP Animations
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Hero Animation
            gsap.from(".hero-content > *", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });

            // How It Works Animation
            // How It Works Animation
            gsap.fromTo(".step-card",
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: howItWorksRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );

            // Highlights Animation
            gsap.fromTo(".highlight-item",
                { scale: 0.8, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: highlightsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                });

            // FAQ Animation
            gsap.fromTo(".faq-item",
                { y: 20, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: faqRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                });

        });

        return () => ctx.revert();
    }, []);

    // Scroll to Form
    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden">
            <CollectionNavbar />

            {/* --- 1. HERO SECTION --- */}
            <section ref={heroRef} className="relative w-full h-screen min-h-[600px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                        alt="Sell Your Luxury Car"
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full hero-content">
                    {/* Breadcrumb */}
                    {/* Breadcrumb */}
                    <Breadcrumb theme="light" />

                    <h1 className="syne font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
                        Sell Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Luxury Car</span>
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
                        Experience a seamless, transparent, and premium car selling process. Get the best value for your vehicle in minutes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={scrollToForm}
                            className="bg-white text-black px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                            Request a Call Back
                        </button>
                        <a
                            href="https://wa.me/919876543210?text=I'm%20interested%20in%20selling%20my%20car"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-[#128C7E] transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* --- 2. HOW IT WORKS --- */}
            <section ref={howItWorksRef} className="py-24 px-6 md:px-12 bg-gray-50 text-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="syne font-bold text-4xl md:text-6xl mb-6">
                            Sell us your Luxury Car<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900">in 29 minutes!</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
                            Our streamlined process is precise, transparent, and incredibly fast.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>

                        {[
                            {
                                title: "Submit Details",
                                desc: "Share your car's details and photos via our form.",
                                icon: (
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                )
                            },
                            {
                                title: "Free Inspection",
                                desc: "Our experts visit you for a detailed checkup.",
                                icon: (
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                )
                            },
                            {
                                title: "Get Best Offer",
                                desc: "Receive a competitive offer instantly.",
                                icon: (
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                )
                            },
                            {
                                title: "Instant Payment",
                                desc: "Get paid immediately and we handle the paperwork.",
                                icon: (
                                    <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                )
                            }
                        ].map((step, idx) => (
                            <div key={idx} className="step-card group relative bg-white p-8 rounded-none border border-gray-100 hover:border-black transition-all duration-300 flex flex-col items-center text-center z-10 shadow-sm hover:shadow-2xl opacity-0">
                                <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300 border border-gray-100 shadow-inner">
                                    <div className="group-hover:invert transition-all duration-300">
                                        {step.icon}
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 text-xs font-bold text-gray-200 group-hover:text-black/10 transition-colors">
                                    0{idx + 1}
                                </div>
                                <h3 className="syne font-bold text-xl mb-3">{step.title}</h3>
                                <p className="text-gray-500 font-light text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <button
                            onClick={scrollToForm}
                            className="bg-black text-white px-12 py-5 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-gray-900 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2 mx-auto group"
                        >
                            Request a Call Back
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* --- 3. HIGHLIGHTS --- */}
            <section ref={highlightsRef} className="py-20 bg-black text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10">
                    {[
                        { end: 151, suffix: "", text: "Check Points" },
                        { end: 29, suffix: "", text: "Minutes Offer" },
                        { end: 5070, suffix: "+", text: "Delighted Customers" }
                    ].map((item, idx) => (
                        <div key={idx} className="highlight-item flex flex-col items-center">
                            <span className="syne font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 leading-none mb-4 min-w-[120px]">
                                <AnimatedCounter end={item.end} suffix={item.suffix} />
                            </span>
                            <span className="text-xl md:text-2xl font-light tracking-widest uppercase border-t border-white/20 pt-4 w-1/2">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 4. FORM SECTION --- */}
            <section ref={formRef} id="sell-form" className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-black py-8 px-8 text-center">
                        <h2 className="syne font-bold text-2xl md:text-3xl text-white">Share Your Car Details</h2>
                        <p className="text-gray-400 mt-2">Fill out the form below to get started</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Brand Name</label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                                    placeholder="e.g. Mercedes-Benz"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Model Name</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                                    placeholder="e.g. C-Class 220d"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Message (Optional)</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300 resize-none"
                                placeholder="Any specific details about your car..."
                            ></textarea>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Upload Photos (Max 3)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="text-4xl mb-2">📸</div>
                                <p className="text-sm text-gray-500">Click or drag & drop to upload car photos</p>
                                <input type="file" multiple accept="image/*" className="hidden" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-5 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-800 transition-all shadow-lg text-lg mt-6"
                        >
                            Submit Details
                        </button>
                    </form>
                </div>
            </section>

            {/* --- 5. BRAND TRUST --- */}
            <BrandSearch />

            {/* --- 6. FAQ SECTION --- */}
            <section ref={faqRef} className="py-24 px-6 md:px-12 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="syne font-bold text-3xl md:text-5xl mb-12 text-center text-black">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="faq-item bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <details className="group">
                                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-lg hover:bg-gray-50 transition-colors">
                                        <span className="group-open:font-bold">{faq.question}</span>
                                        <span className="transition-transform group-open:rotate-180">
                                            <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                        </span>
                                    </summary>
                                    <p className="text-gray-600 mt-0 px-6 pb-6 leading-relaxed group-open:animate-fadeIn">
                                        {faq.answer}
                                    </p>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
