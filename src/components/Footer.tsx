"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer id="site-footer" className="bg-[#050505] text-white pt-20 pb-10 px-6 md:px-12 border-t border-gray-900 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* 1. Brand */}
                <div className="flex flex-col gap-6">
                    <h2 className="syne text-2xl font-bold uppercase tracking-widest">
                        Deccan Wheels
                    </h2>
                    <p className="text-gray-400 font-light text-sm leading-relaxed">
                        The #1 place to buy and sell pre-owned luxury cars in Pune.
                        Certified quality, unmatched service.
                    </p>
                    <div className="flex gap-4 mt-2">
                        {/* Social Icons */}
                        <Link
                            href="#"
                            className="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 group"
                            aria-label="Instagram"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </Link>
                        <Link
                            href="#"
                            className="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 group"
                            aria-label="LinkedIn"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </Link>
                        <Link
                            href="#"
                            className="w-10 h-10 border border-gray-700 rounded-lg flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 group"
                            aria-label="YouTube"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* 2. Quick Links */}
                <div>
                    <h3 className="syne text-lg font-bold mb-6 uppercase tracking-wide text-white">
                        Quick Links
                    </h3>
                    <ul className="space-y-4 text-gray-400 font-light text-sm">
                        {[
                            { name: "Collection", href: "/collection" },
                            { name: "Sell Your Car", href: "/sell-your-car" },
                            { name: "About Us", href: "/about-us" },
                            { name: "Contact Us", href: "/contact-us" }
                        ].map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="hover:text-safety transition-colors duration-300">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Support */}
                <div>
                    <h3 className="syne text-lg font-bold mb-6 uppercase tracking-wide text-white">
                        Support
                    </h3>
                    <ul className="space-y-4 text-gray-400 font-light text-sm">
                        {["Contact Us", "Privacy Policy", "Terms of Service", "FAQs"].map((link) => (
                            <li key={link}>
                                <Link href="#" className="hover:text-safety transition-colors duration-300">
                                    {link}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 4. Newsletter */}
                <div>
                    <h3 className="syne text-lg font-bold mb-6 uppercase tracking-wide text-white">
                        Newsletter
                    </h3>
                    <p className="text-gray-400 font-light text-sm mb-6">
                        Stay updated with the latest arrivals and exclusive offers.
                    </p>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-safety transition-colors placeholder-gray-600 text-sm"
                        />
                        <button className="absolute right-0 top-3 text-gray-400 hover:text-safety transition-colors">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 text-xs font-light tracking-wide text-center md:text-left">
                    &copy; 2026 Deccan Wheels. All rights reserved.
                </p>
                <p className="text-gray-600 text-xs font-light tracking-wide text-center md:text-right">
                    Made with <span className="text-safety">&hearts;</span> by{" "}
                    <Link href="https://www.inaiways.com" className="hover:text-white transition cursor-pointer">
                        Inaiways
                    </Link>{" "}
                    in Pune
                </p>
            </div>
        </footer>
    );
}
