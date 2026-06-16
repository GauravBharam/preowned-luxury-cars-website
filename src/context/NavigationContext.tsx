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

import { Suspense } from "react";

const NavigationTracker = ({ setHistory }: { setHistory: React.Dispatch<React.SetStateAction<string[]>> }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

        setHistory((prev) => {
            if (prev.length > 0 && prev[prev.length - 1] === url) {
                return prev;
            }
            return [...prev, url];
        });
    }, [pathname, searchParams, setHistory]);

    return null;
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const [history, setHistory] = useState<string[]>([]);

    const previousPath = history.length > 1 ? history[history.length - 2] : null;
    const currentPath = history.length > 0 ? history[history.length - 1] : "";

    return (
        <NavigationContext.Provider value={{ previousPath, currentPath }}>
            <Suspense fallback={null}>
                <NavigationTracker setHistory={setHistory} />
            </Suspense>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationHistory = () => useContext(NavigationContext);
