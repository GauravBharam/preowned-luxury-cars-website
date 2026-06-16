"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface NavigationContextType {
    previousPath: string | null;
    currentPath: string;
}

const NavigationContext = createContext<NavigationContextType>({
    previousPath: null,
    currentPath: "",
});

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

        setHistory((prev) => {
            // If the new URL is the same as the current one, don't change history
            if (prev.length > 0 && prev[prev.length - 1] === url) {
                return prev;
            }
            // Add new URL to history
            return [...prev, url];
        });
    }, [pathname, searchParams]);

    // previousPath is the second to last item in the history array
    // currentPath is the last item
    const previousPath = history.length > 1 ? history[history.length - 2] : null;
    const currentPath = history.length > 0 ? history[history.length - 1] : "";

    return (
        <NavigationContext.Provider value={{ previousPath, currentPath }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationHistory = () => useContext(NavigationContext);
