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
                        {["Instagram", "LinkedIn", "YouTube"].map((social) => (
                            <Link
                                key={social}
                                href="#"
                                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 group"
                                aria-label={social}
                            >
                                {/* Icons are placeholders for now to keep it clean, or could use lucide-react if installed */}
                                <span className="sr-only">{social}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="16"></line>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 2. Quick Links */}
                <div>
                    <h3 className="syne text-lg font-bold mb-6 uppercase tracking-wide text-white">
                        Quick Links
                    </h3>
                    <ul className="space-y-4 text-gray-400 font-light text-sm">
                        {["Inventory", "Sell Your Car", "Certified 151", "Finance", "Blog"].map((link) => (
                            <li key={link}>
                                <Link href="#" className="hover:text-safety transition-colors duration-300">
                                    {link}
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
