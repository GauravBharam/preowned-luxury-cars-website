"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const cars = [
    {
        id: 1,
        name: "Porsche 718 Boxster",
        image: "https://static.wixstatic.com/media/71485a_d24d73a44ac641b58c7801ba88cf14f0~mv2.jpeg?dn=whatsapp-image-2023-01-21-at-14.32.02-2.jpeg",
        videoId: "EoQlWXo2C7Q",
        year: "Model 2018",
        fuel: "Petrol",
        logo: "/Images/Logo/porsche.png",
    },
    {
        id: 2,
        name: "Audi R8 V10+ FSI Quattro",
        image: "https://static.wixstatic.com/media/71485a_0881ba1c915d44a2a9e0deecad43a006~mv2.jpeg?dn=WhatsApp%2520Image%25202025-09-02%2520at%252011.41.10%2520(2).jpeg",
        videoId: "UWy6NV90zKU",
        year: "Model 2021",
        fuel: "Petrol / Hybrid",
        logo: "/Images/Logo/audi.png",
        invertLogo: true,
    },
    {
        id: 3,
        name: "FORD MUSTANG GT 5.0L V8",
        image: "https://static.wixstatic.com/media/71485a_21ae3b91571f449b845d6f1ef9e0ca8a~mv2.jpeg?dn=WhatsApp%2520Image%25202025-08-28%2520at%252015.24.16%2520(2).jpeg",
        videoId: "DFS_r4x_ZkE",
        year: "Model 2017",
        fuel: "Petrol",
        logo: "/Images/Logo/mustang.png",
        invertLogo: true,
    },
    {
        id: 4,
        name: "McLaren 520S Spider",
        image: "https://static.wixstatic.com/media/71485a_5fc185fbe8be4e7991581d83ba2b6b64~mv2.jpg?dn=_.jpg",
        videoId: "O1lL-Jq1YyU",
        year: "Model 2021",
        fuel: "Petrol",
        logo: "/Images/Logo/mclaren.png",
        invertLogo: true,
    },
    {
        id: 5,
        name: "BMW Z4 SDRIVE 20i",
        image: "https://static.wixstatic.com/media/71485a_d7d6a295512b4a5ab432d9c391d5ccd3~mv2.jpg?dn=DSC04111.jpg",
        videoId: "PGyWNzOOQm8",
        year: "Model 2023",
        fuel: "Petrol",
        logo: "/Images/Logo/bmw.png",
    },
    {
        id: 6,
        name: "MERCEDES-BENZ GLE450 4MATIC LWB 3L V6",
        image: "https://static.wixstatic.com/media/71485a_80899061d4e349548c28b1461b7d25bb~mv2.jpeg?dn=WhatsApp%2520Image%25202026-01-25%2520at%252015.43.46.jpeg",
        videoId: "BP4Kfq2SpbA",
        year: "Model 2022",
        fuel: "Petrol / Hybrid",
        logo: "/Images/Logo/mercedes.png",
        invertLogo: true,
    },
];

export default function NewArrivals() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

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

        gsap.from(rowsRef.current, {
            scrollTrigger: {
                trigger: el,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out",
        });
    }, []);

    // Split cars into rows of 2 for layout matching original HTML
    const rows = [cars.slice(0, 2), cars.slice(2, 4), cars.slice(4, 6)];

    return (
        <section ref={sectionRef} id="new-arrivals" className="max-w-7xl mx-auto bg-black text-white relative z-20 py-20 px-6 md:px-12">
            <div className="w-full">
                <h2 ref={titleRef} className="syne font-bold text-3xl md:text-5xl pb-10 text-center">
                    New Arrivals
                </h2>

                {rows.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        ref={(el) => { if (el) rowsRef.current[rowIndex] = el; }}
                        className="flex flex-col gap-8 md:flex-row h-[500px] w-full mb-10 last:mb-0"
                    >
                        {row.map((car) => (
                            <VideoHoverCard key={car.id} car={car} />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

const VideoHoverCard = ({ car }: { car: any }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        videoTimeoutRef.current = setTimeout(() => {
            setIsPlaying(true);
        }, 50);
    };

    const handleMouseLeave = () => {
        if (videoTimeoutRef.current) clearTimeout(videoTimeoutRef.current);
        setIsPlaying(false);
    };

    return (
        <div
            className="arrival-card group relative flex-1 hover:flex-[1.5] transition-[flex] duration-700 ease-out overflow-hidden cursor-pointer rounded-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 z-0 opacity-80 group-hover:opacity-100"
                />
            </div>

            {/* Video Overlay */}
            <div
                className={`video-container absolute inset-0 z-10 transition-opacity duration-500 bg-black pointer-events-none ${isPlaying ? "opacity-100" : "opacity-0"
                    }`}
            >
                {isPlaying && (
                    <iframe
                        className="w-full h-full object-cover pointer-events-none"
                        src={`https://www.youtube.com/embed/${car.videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${car.videoId}&playsinline=1`}
                        title={car.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                )}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-12 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none">

                {/* Top: Logo & Name */}
                <div className="flex flex-col items-center">
                    {car.logo && (
                        <div className={`relative w-16 h-16 mb-4 transition-transform duration-500 group-hover:scale-110 ${car.invertLogo ? "invert" : ""}`}>
                            <Image
                                src={car.logo}
                                alt={`${car.name} Logo`}
                                fill
                                className="object-contain drop-shadow-lg"
                            />
                        </div>
                    )}
                    <h3 className="syne text-2xl font-bold uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 text-center px-4 leading-tight">
                        {car.name}
                    </h3>
                </div>

                {/* Bottom: Specs */}
                <div className="flex flex-col items-start w-full px-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <span className="bg-white/20 backdrop-blur-md text-xs font-semibold px-3 py-1 rounded text-white mb-2">
                        {car.fuel}
                    </span>
                    <p className="syne text-lg font-medium">{car.year}</p>
                </div>
            </div>
        </div>
    );
};
