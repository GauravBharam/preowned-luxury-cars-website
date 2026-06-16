import { Syne } from "next/font/google";
import "../globals.css";

const syne = Syne({ subsets: ["latin"] });

export const metadata = {
    title: "Deccan Wheels - Admin Portal",
    description: "Employee Management System",
};

import AdminHeader from "@/components/AdminHeader";

// ... existing code ...

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`min-h-screen bg-black text-white ${syne.className}`}>
            {/* Admin Header */}
            <AdminHeader />

            <main className="p-6 md:p-12 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
}
