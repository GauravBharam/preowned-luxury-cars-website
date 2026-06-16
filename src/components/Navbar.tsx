"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuItemsRef.current, {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2,
            });
        } else {
            gsap.to(menuItemsRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.5,
            });
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="absolute top-0 w-full h-[70px] md:h-[90px] flex items-center justify-between z-[1100] mix-blend-difference px-4 md:px-16 transition-all duration-300">
                {/* 1. Hamburger (Left) */}
                <div
                    className={`hamburger flex flex-col justify-between w-6 h-3 cursor-pointer z-[1200] relative ${isOpen ? "active" : ""}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    role="button"
                    tabIndex={0}
                >
                    <span className={`block w-full h-[1.5px] bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[5px]" : ""}`}></span>
                    <span className={`block w-full h-[1.5px] bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[5px]" : ""}`}></span>
                </div>

                {/* 2. Logo (Center) */}
                <Link href="/" className="syne text-base sm:text-lg md:text-xl font-bold uppercase tracking-widest text-white mix-blend-difference absolute left-1/2 -translate-x-1/2 z-[1150]">
                    Deccan Wheels
                </Link>

                {/* 3. Contact Button (Right) */}
                <button className="syne text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white border border-white/40 hover:bg-white hover:text-black transition-all px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hidden md:block">
                    Contact
                </button>

                {/* Mobile Spacer */}
                <div className="w-6 md:hidden"></div>
            </nav>

            {/* Fullscreen Menu Overlay */}
            <div
                ref={overlayRef}
                className={`fixed inset-0 bg-[#050505] z-40 flex flex-col justify-center items-center gap-4 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                {["Home", "Collections", "Services", "About Us", "Contact"].map((item, index) => (
                    <Link
                        key={item}
                        href="#"
                        ref={(el) => {
                            if (el) menuItemsRef.current[index] = el;
                        }}
                        className="menu-item text-[5vw] font-syne font-extrabold text-[#333] hover:text-white uppercase cursor-pointer opacity-0 translate-y-12 transition-colors duration-400 ease-linear hover:stroke-white hover:stroke-1 leading-tight"
                        onClick={() => setIsOpen(false)}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </>
    );
}
