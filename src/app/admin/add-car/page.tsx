"use client";

import Link from "next/link";
import AdminCarForm from "@/components/AdminCarForm";

export default function AddCar() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">← Back to Dashboard</Link>
                <h1 className="text-3xl font-bold">Add New Luxury Car</h1>
            </div>

            <AdminCarForm />
        </div>
    );
}
