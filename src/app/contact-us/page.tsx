"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CollectionNavbar from "@/components/CollectionNavbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

gsap.registerPlugin(ScrollTrigger);

export default function ContactUs() {
    const heroRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLElement>(null);
    const showroomRef = useRef<HTMLElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        message: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you! We'll be in touch shortly.");
    };

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

            // Form & Info Animation
            // Form & Info Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            });

            // 1. Animate the columns (Info & Form Container)
            tl.fromTo(".contact-section > *",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                }
            );

            // 2. Animate Contact Info Items (Left Column)
            tl.fromTo(".contact-info-item",
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                },
                "-=0.4"
            );

            // 3. Animate Form Fields Internal (Cascading effect)
            tl.fromTo(".contact-form-field",
                { x: 20, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out"
                },
                "-=0.4"
            );

            // Showroom Animation
            // Showroom Animation (Editorial Style)
            gsap.fromTo(".showroom-header",
                { y: 100, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: showroomRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(".showroom-divider",
                { scaleX: 0 },
                {
                    scrollTrigger: {
                        trigger: showroomRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse",
                    },
                    scaleX: 1,
                    duration: 1.5,
                    ease: "expo.out",
                    delay: 0.2
                }
            );

            gsap.fromTo(".showroom-detail",
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: showroomRef.current,
                        start: "top 60%",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power2.out",
                    delay: 0.4
                }
            );

            gsap.fromTo(".showroom-map-container",
                { clipPath: "inset(100% 0 0 0)", grayscale: 1 },
                {
                    scrollTrigger: {
                        trigger: showroomRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                    },
                    clipPath: "inset(0% 0 0 0)",
                    grayscale: 1, // Start grayscale, hover handles color
                    duration: 1.5,
                    ease: "expo.out",
                    delay: 0.2
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden">
            <CollectionNavbar />

            {/* --- HERO SECTION (Enhanced) --- */}
            <section ref={heroRef} className="relative pt-40 pb-20 px-6 md:px-12 min-h-[60vh] flex flex-col justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10"></div>
                    <Image
                        src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=2070"
                        alt="Luxury Car Showroom"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="max-w-7xl mx-auto w-full hero-content text-center md:text-left relative z-20 text-white">
                    {/* Breadcrumb */}
                    {/* Breadcrumb */}
                    <Breadcrumb theme="light" />

                    <h1 className="syne font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
                        Contact <span className="text-white">Us</span>
                    </h1>

                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light mx-auto md:mx-0">
                        Have questions or ready to find your dream car? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* --- CONTACT FORM & INFO SECTION --- */}
            <section ref={formRef} className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 contact-section">

                    {/* Contact Information */}
                    <div className="flex flex-col justify-center space-y-12">
                        <div>
                            <span className="contact-info-item opacity-0 text-gray-400 uppercase tracking-[0.2em] text-xs font-bold block mb-4">Connect With Us</span>
                            <h3 className="contact-info-item opacity-0 syne font-bold text-4xl md:text-5xl mb-6 leading-tight">We'd love to <br />hear from you.</h3>
                            <p className="contact-info-item opacity-0 text-gray-600 font-light text-lg leading-relaxed mb-8 max-w-md">
                                Whether you have a question about our inventory, looking for a specific model, or want to sell your car, our team is ready to assist you.
                            </p>
                        </div>

                        <div>
                            <span className="contact-info-item opacity-0 text-gray-400 uppercase tracking-[0.2em] text-xs font-bold block mb-6">Contact Details</span>
                            <div className="space-y-4">
                                <a href="tel:+919876543210" className="contact-info-item opacity-0 flex items-center gap-4 text-xl group w-fit">
                                    <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    </span>
                                    <span className="group-hover:text-gray-600 transition-colors">+91 98765 43210</span>
                                </a>
                                <a href="mailto:contact@deccanwheels.com" className="contact-info-item opacity-0 flex items-center gap-4 text-xl group w-fit">
                                    <span className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    </span>
                                    <span className="group-hover:text-gray-600 transition-colors">contact@deccanwheels.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="syne font-bold text-2xl mb-8">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="contact-form-field opacity-0">
                                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="contact-form-field opacity-0">
                                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Mobile Number</label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div className="contact-form-field opacity-0">
                                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="contact-form-field opacity-0">
                                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="contact-form-field opacity-0 w-full bg-black text-white font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1 duration-300"
                            >
                                Submit Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* --- VISIT SHOWROOM SECTION (Light Editorial) --- */}
            <section ref={showroomRef} className="py-32 px-6 md:px-12 bg-white">
                <div className="max-w-[1400px] mx-auto">

                    {/* Header - Editorial Style */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 relative">
                        <h2 className="syne font-bold text-7xl md:text-9xl text-black leading-[0.85] tracking-tighter showroom-header">
                            OUR <br /> SPACE
                        </h2>
                        <div className="max-w-xs text-right mt-10 md:mt-0 showroom-header opacity-0">
                            <p className="text-gray-500 font-light text-lg">
                                Where engineering meets art. <br />
                                <span className="text-black font-medium">Come visit the gallery.</span>
                            </p>
                        </div>

                        {/* Animated Divider */}
                        <div className="absolute bottom-[-40px] left-0 w-full h-[1px] bg-gray-200 showroom-divider origin-left"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pt-10">
                        {/* Details Column */}
                        <div className="lg:col-span-4 space-y-16">

                            <div className="space-y-2 showroom-detail">
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-2">Location</span>
                                <p className="text-2xl md:text-3xl font-medium leading-tight text-black">
                                    161/1A, Ganeshkhind Rd,<br />
                                    Modibaug, Shivajinagar,<br />
                                    Pune, 411016
                                </p>
                            </div>

                            <div className="space-y-2 showroom-detail">
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-2">Hours</span>
                                <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
                                    <span className="text-xl text-black">Mon - Sat</span>
                                    <span className="text-xl font-medium text-black">10 am — 7 pm</span>
                                </div>
                                <div className="flex justify-between items-baseline border-b border-gray-100 pb-2">
                                    <span className="text-xl text-black">Sunday</span>
                                    <span className="text-xl font-medium text-black">By Appointment</span>
                                </div>
                            </div>

                            <div className="pt-8 showroom-detail">
                                <a
                                    href="https://maps.app.goo.gl/YWjHGKqbb7bgiWMQ7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex flex-col gap-2"
                                >
                                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-black">Get Directions</span>
                                    <div className="h-[2px] w-full bg-black scale-x-100 group-hover:scale-x-50 transition-transform duration-500 origin-left"></div>
                                </a>
                            </div>

                        </div>

                        {/* Map Column (Editorial Image Style) */}
                        <div className="lg:col-span-8 h-[600px] relative overflow-hidden bg-gray-100 showroom-map-container group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.9231739310717!2d73.84033491014789!3d18.532373568742088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf43dade4bdd%3A0x83badc3117c95af6!2sDeccan%20Wheels!5e0!3m2!1sen!2sin!4v1771304807951!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-100 group-hover:scale-105"
                            ></iframe>

                            {/* Stylish Overlay Label */}
                            <div className="absolute bottom-0 left-0 bg-white px-8 py-4 pointer-events-none">
                                <span className="syne font-bold text-xl tracking-tighter">MAP VIEW</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
