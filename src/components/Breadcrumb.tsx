"use client";

import Link from "next/link";
import { useNavigationHistory } from "@/context/NavigationContext";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
    currentPageName?: string;
    theme?: "light" | "dark"; // light = white text (for dark bg), dark = black text (for light bg)
    className?: string;
    items?: any[]; // Keep for backward compatibility but ignore
}

// Helper to format path segments into readable titles
const formatTitle = (path: string): string => {
    if (path === "/" || path === "") return "Home";

    // Remove query params
    const cleanPath = path.split("?")[0];

    // Get last segment
    const segment = cleanPath.split("/").filter(Boolean).pop();
    if (!segment) return "Home";

    // Handle standard slugs
    return segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export default function Breadcrumb({ currentPageName, theme = "light", className }: BreadcrumbProps) {
    const { previousPath } = useNavigationHistory();
    const pathname = usePathname();

    // Default to "Home" if no history or if previous is same as current 
    const prevLink = previousPath && previousPath !== pathname ? previousPath : "/";
    const prevTitle = formatTitle(prevLink);

    // Use provided prop or derive from current path
    const currentTitle = currentPageName || formatTitle(pathname);

    return (
        <div className={`flex items-center gap-2 text-sm mb-6 uppercase tracking-widest font-medium z-20 relative ${theme === "light" ? "text-white/60" : "text-gray-500"} ${className || ""}`}>
            <Link
                href={prevLink}
                className={`transition-colors ${theme === "light" ? "hover:text-white" : "hover:text-black"}`}
            >
                {prevTitle}
            </Link>
            <span>&gt;</span>
            <span className={theme === "light" ? "text-white" : "text-black font-semibold"}>
                {currentTitle}
            </span>
        </div>
    );
}
