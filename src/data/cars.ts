import carsData from "./cars.json";

export interface Car {
    id: number;
    name: string;
    brand?: string;
    type: string;
    image: string;
    images: string[];
    price: string;
    year: number;
    kmDriven: string;
    fuelType: string;
    regState: string;
    isBooked?: boolean;
    isSold?: boolean;
    specs: {
        exteriorColor: string;
        interiorColor: string;
        insurance: string;
        owner: string;
        regNo: string;
        servicePack: string;
        warranty: string;
    };
}

export const cars: Car[] = carsData as Car[];
