import { getAllCars } from "@/app/actions";
import DashboardContent from "./DashboardContent";

export const dynamic = 'force-dynamic'; // Ensure it's not statically cached

export default async function AdminDashboard() {
    const cars = await getAllCars();

    return (
        <DashboardContent cars={cars} />
    );
}
