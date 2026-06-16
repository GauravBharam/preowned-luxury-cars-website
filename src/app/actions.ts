"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

const dataPath = path.join(process.cwd(), "src", "data", "cars.json");

export async function saveCar(formData: FormData) {
  console.log("saveCar action started");
  try {
    const fileContent = await fs.readFile(dataPath, "utf-8");
    const cars = JSON.parse(fileContent);
    console.log("Loaded cars data");

    // key data
    const id = formData.get("id") ? Number(formData.get("id")) : null;
    const brand = formData.get("brand") as string;
    const name = formData.get("name") as string;
    
    // Sanitize for folder names
    const safeBrand = brand.replace(/[^a-zA-Z0-9]/g, "").trim();
    const safeName = name.replace(/[^a-zA-Z0-9]/g, "").trim();

    // Define upload paths
    const baseUploadPath = path.join(process.cwd(), "public", "uploads");
    const profileUploadPath = path.join(baseUploadPath, "Car-Profile-Shot-Images");
    const galleryUploadPath = path.join(baseUploadPath, safeBrand, safeName, "gallery");
    
    // Ensure directories exist
    await fs.mkdir(profileUploadPath, { recursive: true });
    await fs.mkdir(galleryUploadPath, { recursive: true });

    // Generate slug for filenames: "Brand Model" -> "Brand-Model"
    const slug = `${safeBrand}-${safeName}`.replace(/\s+/g, '-');

    // Handle Image Uploads
    const imageFile = formData.get("imageFile") as File;
    let imagePath = formData.get("existingImage") as string;

    if (imageFile && imageFile.size > 0) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        // Rename: [Brand]-[Model]-profile-shot-image-[timestamp].png
        const timestamp = Date.now();
        const fileName = `${slug}-profile-shot-image-${timestamp}.png`; 
        const filePath = path.join(profileUploadPath, fileName);
        await fs.writeFile(filePath, buffer);
        imagePath = `/uploads/Car-Profile-Shot-Images/${fileName}`;
    }

    // Handle Gallery Uploads
    const galleryFiles = formData.getAll("galleryFiles") as File[];
    
    // Parse the order manifest: array of strings. 
    // Format: "existing:ID_OR_URL" or "new:INDEX"
    const imageOrderRaw = formData.get("imageOrder");
    const imageOrder = imageOrderRaw ? JSON.parse(imageOrderRaw as string) : [];

    // Map to store new file paths: index -> path
    const newFilePaths: Record<number, string> = {};

    if (galleryFiles.length > 0) {
        // Calculate offset based on total existing images across all cars to ensure uniqueness? 
        // Actually, we use a unique slug per car, but for safety lets specific timestamp or random id for new files
        // OR just simple incrementing index is fine as long as we don't overwrite.
        // Better: use timestamp + index
        
        for (let i = 0; i < galleryFiles.length; i++) {
            const file = galleryFiles[i];
            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = path.extname(file.name);
            const timestamp = Date.now();
            // Rename: [Brand]-[Model]-gallery-[timestamp]-[index].ext
            const fileName = `${slug}-gallery-${timestamp}-${i}${ext}`;
            const filePath = path.join(galleryUploadPath, fileName);
            await fs.writeFile(filePath, buffer);
            newFilePaths[i] = `/uploads/${safeBrand}/${safeName}/gallery/${fileName}`;
        }
    }

    // Construct final images array based on order
    let finalGalleryPaths: string[] = [];
    
    console.log("Processing Image Order:", imageOrder);
    console.log("New File Paths Map:", newFilePaths);

    // If no order provided (fallback for legacy/direct calls), append new to existing
    if (!imageOrder || imageOrder.length === 0) {
       console.log("No image order provided, using default append behavior");
       let existing = JSON.parse(formData.get("existingImages") as string || "[]");
       finalGalleryPaths = [...existing, ...Object.values(newFilePaths)];
    } else {
        // Reconstruct from order
        finalGalleryPaths = imageOrder.map((item: string) => {
            if (item.startsWith("new:")) {
                const index = parseInt(item.split(":")[1]);
                const path = newFilePaths[index];
                if (!path) {
                    console.error(`Missing path for new image index: ${index}`);
                }
                return path;
            } else {
                return item; // It's an existing URL
            }
        }).filter(Boolean); // Filter out any undefineds if something went wrong
    }
    
    console.log("Final Gallery Paths:", finalGalleryPaths);

    // Construct Car Object
    const carData = {
        id: id || (Math.max(...(cars.length > 0 ? cars.map((c: any) => c.id) : [0])) + 1),
        name,
        brand,
        type: formData.get("type") as string,
        price: formData.get("price") as string,
        year: Number(formData.get("year")),
        kmDriven: formData.get("kmDriven") as string,
        fuelType: formData.get("fuelType") as string,
        regState: formData.get("regState") as string,
        isBooked: formData.get("isBooked") === "true",
        isSold: formData.get("isSold") === "true",
        image: imagePath,
        images: finalGalleryPaths,
        specs: JSON.parse(formData.get("specs") as string),
    };

    if (id) {
        const index = cars.findIndex((c: any) => c.id === id);
        if (index !== -1) {
            cars[index] = carData;
        }
    } else {
        cars.push(carData);
    }

    await fs.writeFile(dataPath, JSON.stringify(cars, null, 2));
    revalidatePath("/admin/dashboard");
    revalidatePath("/collection");
    revalidatePath("/");
    
    console.log("Car saved successfully:", carData.id);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save car (Detailed):", error);
    // Return the error message to the client for better debugging
    return { success: false, error: error.message || "Failed to save data" };
  }
}

export async function getCar(id: number) {
    try {
        const fileContent = await fs.readFile(dataPath, "utf-8");
        const cars = JSON.parse(fileContent);
        return cars.find((c: any) => c.id === id);
    } catch (error) {
        return null;
    }
}

export async function getAllCars() {
    try {
        const fileContent = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        return [];
    }
}

export async function deleteCar(id: number) {
    try {
        const fileContent = await fs.readFile(dataPath, "utf-8");
        const cars = JSON.parse(fileContent);
        const filteredCars = cars.filter((c: any) => c.id !== id);

        await fs.writeFile(dataPath, JSON.stringify(filteredCars, null, 2));
        revalidatePath("/admin/dashboard");
        revalidatePath("/collection");
        revalidatePath("/"); // Revalidate home in case of featured cars (though usually verified separately)
        
        return { success: true };
    } catch (error) {
        console.error("Failed to delete car:", error);
        return { success: false, error: "Failed to delete data" };
    }
}
