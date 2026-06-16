"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Car } from "@/data/cars";

interface CarCardProps {
    car: Car;
}

export default function CarCard({ car }: CarCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <Link href={`/collection/${car.id}`} className="block h-full">
            <div className="group bg-white rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-gray-100 transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1 relative cursor-pointer">
                {/* Image Section - Full Bleed */}
                <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                    {!imageError ? (
                        <Image
                            src={car.images?.[0] || car.image || "/car-profile-shot.png"}
                            alt={car.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                    )}

                    {/* Status Tags - Sold takes precedence */}
                    {car.isSold ? (
                        <div className="absolute top-6 left-0 z-30 drop-shadow-lg">
                            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pl-4 pr-6 py-1.5 rounded-r-full flex items-center gap-2 shadow-inner border-y border-r border-white/20 transform hover:scale-105 transition-transform origin-left">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                                <span className="font-black uppercase tracking-[0.15em] text-[10px] leading-tight drop-shadow-sm">Sold Out</span>
                            </div>
                        </div>
                    ) : car.isBooked ? (
                        <div className="absolute top-6 left-0 z-30 drop-shadow-lg">
                            <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white pl-4 pr-6 py-1.5 rounded-r-full flex items-center gap-2 shadow-inner border-y border-r border-white/20 transform hover:scale-105 transition-transform origin-left">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                                <span className="font-black uppercase tracking-[0.15em] text-[10px] leading-tight drop-shadow-sm">Booked</span>
                            </div>
                        </div>
                    ) : null}

                    {/* Fuel & State Badges - Grouped Top Right */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                        {/* Fuel Badge */}
                        <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-white/20">
                            <span className={`w-2 h-2 rounded-full ${car.fuelType === 'Petrol' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]'}`}></span>
                            <span className="text-xs font-bold uppercase tracking-wider text-black">{car.fuelType}</span>
                        </div>

                        {/* State Badge */}
                        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold tracking-wider shadow-sm border border-white/10">
                            {car.regState}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="syne text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-black transition-colors line-clamp-1">
                        {car.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-4 flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-black tracking-tight">{car.price}</span>
                    </div>

                    {/* Structured Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-gray-100 border-b mb-6 bg-gray-50/50 rounded-xl px-2">
                        <div className="text-center relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-6 after:w-[1px] after:bg-gray-200 last:after:hidden">
                            <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Make</span>
                            <span className="block text-sm font-bold text-gray-900">{car.year}</span>
                        </div>
                        <div className="text-center relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-6 after:w-[1px] after:bg-gray-200 last:after:hidden">
                            <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Odometer</span>
                            <span className="block text-sm font-bold text-gray-900">{car.kmDriven.replace(" km", "")} <span className="text-[10px] font-normal text-gray-500">km</span></span>
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-0.5">Fuel</span>
                            <span className="block text-sm font-bold text-gray-900">{car.fuelType}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-3">
                        <button className="flex-1 bg-black text-white py-3.5 rounded-lg text-sm font-bold tracking-wide hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group/btn relative overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">Request Call Back</span>
                        </button>

                        <button
                            className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-50 text-green-600 border border-green-100 hover:bg-green-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-green-200 hover:-translate-y-1 group/wa"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigating to detail page on WA click
                                // Add WA logic here if needed
                            }}
                        >
                            <svg className="w-5 h-5 transition-transform group-hover/wa:scale-110" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
