import { getCar } from "@/app/actions";
import AdminCarForm from "@/components/AdminCarForm";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function EditCarPage({ params }: PageProps) {
    // Next.js 15+ awaits params
    const { id } = await params;
    const carId = parseInt(id);
    const car = await getCar(carId);

    if (!car) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">← Back to Dashboard</Link>
                <h1 className="text-3xl font-bold">Edit Car: {car.name}</h1>
            </div>

            <AdminCarForm initialData={car} />
        </div>
    );
}
