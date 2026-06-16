"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { saveCar } from "@/app/actions";
import { Car } from "@/data/cars";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function AdminCarForm({ initialData }: { initialData?: Car }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saveModalOpen, setSaveModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<Car>>({
        ...initialData,
        specs: {
            exteriorColor: "",
            interiorColor: "",
            insurance: "",
            owner: "",
            regNo: "",
            servicePack: "",
            warranty: "",
            ...(initialData?.specs || {})
        }
    });

    // Update profile preview when file changes
    useEffect(() => {
        if (selectedProfileImage) {
            const url = URL.createObjectURL(selectedProfileImage);
            setProfilePreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setProfilePreview(null);
        }
    }, [selectedProfileImage]);

    // Unified Gallery State
    interface GalleryItem {
        id: string; // Unique ID for key
        type: 'existing' | 'new';
        url: string; // For display
        file?: File; // Only for new
        originalIndex?: number; // To track index in original existingImages array
    }

    // Sortable Item Component
    const SortableGalleryItem = ({ id, item, index, onRemove }: { id: string, item: GalleryItem, index: number, onRemove: (index: number) => void }) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging
        } = useSortable({ id: id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
            zIndex: isDragging ? 999 : 'auto',
        };

        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="relative group aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10 flex flex-col touch-none"
            >
                <div className="relative flex-grow overflow-hidden">
                    <img src={item.url} alt={`Gallery ${index}`} className="w-full h-full object-cover pointer-events-none" />

                    {/* Remove Button - needs to stop propagation to prevent drag start */}
                    <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(index);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                        title="Remove Image"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    {/* New Badge */}
                    {item.type === 'new' && (
                        <p className="absolute bottom-0 w-full bg-green-900/80 text-[10px] text-white p-1 text-center truncate pointer-events-none">New Change</p>
                    )}
                </div>

                {/* Drag Handle Overlay (optional visual cue) */}
                <div className="absolute inset-0 transition-colors group-hover:bg-white/5 pointer-events-none" />

                {/* Number Badge */}
                <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded pointer-events-none">
                    {index + 1}
                </div>
            </div>
        );
    };

    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

    // Initialize gallery items when initialData changes
    useEffect(() => {
        if (initialData?.images && galleryItems.length === 0) {
            const items: GalleryItem[] = initialData.images.map((img, index) => ({
                id: `existing-${index}`,
                type: 'existing',
                url: img,
                originalIndex: index
            }));
            setGalleryItems(items);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const fileInput = e.target as HTMLInputElement;
            if (name === 'imageFile') {
                if (fileInput.files && fileInput.files[0]) {
                    setSelectedProfileImage(fileInput.files[0]);
                    // Clear existing image if replacing
                    setFormData(prev => ({ ...prev, image: "" }));
                }
            } else if (name === 'galleryFiles') {
                if (fileInput.files) {
                    const newFiles = Array.from(fileInput.files);
                    const newItems: GalleryItem[] = newFiles.map((file, index) => ({
                        id: `new-${Date.now()}-${index}`,
                        type: 'new',
                        url: URL.createObjectURL(file), // Preview URL
                        file: file
                    }));

                    setGalleryItems(prev => [...prev, ...newItems]);
                }
            }
            // Reset input value to allow selecting the same file again if needed
            e.target.value = '';
            return;
        }

        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        if (name.startsWith("specs.")) {
            const specField = name.split(".")[1];
            setFormData((prev: any) => ({
                ...prev,
                specs: { ...prev.specs, [specField]: val }
            }));
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: val }));
        }
    };

    // Reordering Handlers
    // Reordering Handlers
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Require 8px movement before drag starts to prevent accidental drags
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setGalleryItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const removeGalleryItem = (index: number) => {
        setGalleryItems(prev => {
            const itemToRemove = prev[index];
            if (itemToRemove.type === 'new' && itemToRemove.url) {
                URL.revokeObjectURL(itemToRemove.url); // Cleanup
            }
            return prev.filter((_, i) => i !== index);
        });
    };

    // Unused existing methods (kept for safety if referenced elsewhere, but effectively replaced)
    const removeNewProfileImage = () => {
        setSelectedProfileImage(null);
    };

    const removeExistingProfileImage = () => {
        setFormData(prev => ({ ...prev, image: "" }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaveModalOpen(true);
    };

    const confirmSave = async () => {
        setLoading(true);

        const data = new FormData();
        data.append("id", formData.id?.toString() || "");
        data.append("name", formData.name || "");
        data.append("brand", formData.brand || "");
        data.append("type", formData.type || "");
        data.append("price", formData.price || "");
        data.append("year", formData.year?.toString() || "");
        data.append("kmDriven", formData.kmDriven || "");
        data.append("fuelType", formData.fuelType || "");
        data.append("regState", formData.regState || "");
        data.append("isBooked", formData.isBooked ? "true" : "false");
        data.append("isSold", formData.isSold ? "true" : "false");
        data.append("specs", JSON.stringify(formData.specs));

        // Append existing images (for fallback/safety, though order is now main source of truth)
        // We still send the ORIGINAL existing images list so the server knows what "existing:URL" refers to?
        // Actually, "existing:URL" just uses the URL string, so we don't strictly need the array if we trust the URLs.
        // BUT, `actions.ts` might expect `existingImages` for some legacy reason or if `imageOrder` is missing.
        data.append("existingImage", formData.image || "");
        data.append("existingImages", JSON.stringify(formData.images || []));

        if (selectedProfileImage) {
            data.append("imageFile", selectedProfileImage);
        }

        // Process Gallery Items
        // 1. Separate new files
        const newFiles = galleryItems.filter(item => item.type === 'new').map(item => item.file) as File[];

        // 2. Append new files to FormData
        for (let i = 0; i < newFiles.length; i++) {
            data.append("galleryFiles", newFiles[i]);
            console.log(`Appending gallery file ${i}:`, newFiles[i].name, newFiles[i].size);
        }

        // 3. Construct Order Manifest
        // For new files, valid index is their index in the `newFiles` array we just created.
        const imageOrder = galleryItems.map((item, index) => {
            // Log item details for debugging
            console.log(`Processing item ${index}:`, item.id, item.type);

            if (item.type === 'existing') {
                return item.url;
            } else {
                // Find index of this specific file object in the filtered newFiles array
                const newIndex = newFiles.indexOf(item.file!);
                if (newIndex === -1) console.error(`File not found in newFiles for item ${item.id}`);
                return `new:${newIndex}`;
            }
        });

        console.log("Image Order Manifest:", imageOrder);
        data.append("imageOrder", JSON.stringify(imageOrder));

        try {
            const result = await saveCar(data);

            if (result.success) {
                setLoading(false);
                setSaveModalOpen(false);
                router.push("/admin/dashboard");
            } else {
                console.error("Save failed:", result.error);
                alert("Failed to save car: " + result.error);
                setLoading(false);
                setSaveModalOpen(false);
            }
        } catch (error) {
            console.error("Error calling saveCar:", error);
            alert("An error occurred while saving. Please check the console.");
            setLoading(false);
            setSaveModalOpen(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">

            {/* Basic Info Section */}
            <div>
                <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm text-gray-400 mb-2">Car Model Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. 911 GT3" />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Brand</label>
                        <input name="brand" value={formData.brand || ""} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. Porsche" />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white">
                            <option value="" className="bg-black">Select Type</option>
                            <option value="Coupe" className="bg-black">Coupe</option>
                            <option value="Sedan" className="bg-black">Sedan</option>
                            <option value="SUV-MUV" className="bg-black">SUV-MUV</option>
                            <option value="Convertible" className="bg-black">Convertible</option>
                            <option value="Sports" className="bg-black">Sports</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Price (INR)</label>
                        <input name="price" value={formData.price} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. ₹ 1,50,00,000" />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Year</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. 2023" />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">KM Driven</label>
                        <input name="kmDriven" value={formData.kmDriven} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. 5,000 km" />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Fuel Type</label>
                        <select name="fuelType" value={formData.fuelType} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white">
                            <option value="" className="bg-black">Select Fuel</option>
                            <option value="Petrol" className="bg-black">Petrol</option>
                            <option value="Diesel" className="bg-black">Diesel</option>
                            <option value="Hybrid" className="bg-black">Hybrid</option>
                            <option value="Electric" className="bg-black">Electric</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Registration State</label>
                        <input name="regState" value={formData.regState} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. MH" />
                    </div>
                </div>

                {/* Status Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Availability</label>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 p-3 bg-white/10 border border-white/10 rounded-lg">
                                    <input
                                        type="checkbox"
                                        name="isBooked"
                                        checked={formData.isBooked || false}
                                        onChange={handleChange}
                                        className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                                    />
                                    <span className="text-white font-medium">Mark as Booked</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white/10 border border-white/10 rounded-lg">
                                    <input
                                        type="checkbox"
                                        name="isSold"
                                        checked={formData.isSold || false}
                                        onChange={handleChange}
                                        className="w-5 h-5 accent-red-500 rounded cursor-pointer"
                                    />
                                    <span className="text-white font-medium">Mark as Sold</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                "Sold" takes precedence over "Booked".
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Images Section */}
            <div>
                <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Car Images</h3>

                <div className="space-y-8">
                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Car Profile Shot (Horizontal)
                            <span className="block text-xs text-gray-500 mt-1">
                                Must be a PNG with transparent background.
                            </span>
                        </label>

                        <div className="flex gap-4 items-start">
                            <input
                                type="file"
                                accept="image/png"
                                name="imageFile"
                                onChange={handleChange}
                                className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 transition-colors"
                            />
                        </div>

                        {/* Preview Area for Profile */}
                        <div className="mt-4 flex flex-wrap gap-4">
                            {/* Existing Profile Image */}
                            {formData.image && !selectedProfileImage && (
                                <div className="relative group w-48 aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                                    <img src={formData.image} alt="Current Profile" className="w-full h-full object-contain" />
                                    <button
                                        type="button"
                                        onClick={removeExistingProfileImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        title="Remove Image"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    <p className="absolute bottom-0 w-full bg-black/50 text-xs text-white p-1 text-center truncate">Existing</p>
                                </div>
                            )}

                            {/* New Profile Image Preview */}
                            {selectedProfileImage && profilePreview && (
                                <div className="relative group w-48 aspect-video bg-white/5 rounded-lg overflow-hidden border border-green-500/50">
                                    <img src={profilePreview} alt="New Profile" className="w-full h-full object-contain" />
                                    <button
                                        type="button"
                                        onClick={removeNewProfileImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-100 hover:scale-110 transition-all"
                                        title="Remove Selection"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    <p className="absolute bottom-0 w-full bg-green-900/80 text-xs text-white p-1 text-center truncate">New Upload</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Gallery Images */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">
                            Gallery Images
                            <span className="block text-xs text-gray-500 mt-1">
                                Upload up to 10 images. New uploads will be added to the list.
                            </span>
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            name="galleryFiles"
                            onChange={handleChange}
                            className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-200 transition-colors"
                        />

                        {/* Gallery Grid with Drag and Drop */}
                        <div className="mt-4">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={galleryItems.map(item => item.id)}
                                    strategy={rectSortingStrategy}
                                >
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {galleryItems.map((item, index) => (
                                            <SortableGalleryItem
                                                key={item.id}
                                                id={item.id}
                                                item={item}
                                                index={index}
                                                onRemove={removeGalleryItem}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                            {galleryItems.length === 0 && (
                                <p className="text-gray-500 text-sm text-center py-8 border border-dashed border-white/10 rounded-lg">
                                    No images uploaded yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Specs Section */}
            <div>
                <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Exterior Color</label>
                        <input name="specs.exteriorColor" value={formData.specs?.exteriorColor} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. Guards Red" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Interior Color</label>
                        <input name="specs.interiorColor" value={formData.specs?.interiorColor} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. Black Leather" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Owner Serial</label>
                        <select name="specs.owner" value={formData.specs?.owner || ""} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white">
                            <option value="" disabled className="bg-black text-gray-400">Select Owner Serial</option>
                            <option value="1st Owner" className="bg-black">1st Owner</option>
                            <option value="2nd Owner" className="bg-black">2nd Owner</option>
                            <option value="3rd Owner" className="bg-black">3rd Owner+</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Registration No.</label>
                        <input name="specs.regNo" value={formData.specs?.regNo} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. MH 12 AB 1234" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Insurance Validity</label>
                        <input name="specs.insurance" value={formData.specs?.insurance} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. Zero Dep (Valid till 2025)" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Service Package</label>
                        <input name="specs.servicePack" value={formData.specs?.servicePack} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. 5 Year Service Included" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Warranty Status</label>
                        <input name="specs.warranty" value={formData.specs?.warranty} onChange={handleChange} required className="w-full p-3 bg-white/10 border border-white/10 rounded-lg text-white" placeholder="e.g. Under Warranty" />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {loading ? "Saving..." : "Save Car to Inventory"}
                </button>
            </div>
            {/* Save Confirmation Modal */}
            {mounted && saveModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setSaveModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-[#0F0F0F] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl shadow-black transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                    <polyline points="7 3 7 8 15 8"></polyline>
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Save Changes?</h3>
                            <p className="text-gray-400 mb-8">
                                Are you sure you want to save these changes to the inventory? This will update the car details on the website.
                            </p>

                            <div className="grid grid-cols-2 gap-4 w-full">
                                <button
                                    type="button"
                                    onClick={() => setSaveModalOpen(false)}
                                    className="w-full py-3 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmSave}
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 flex justify-center items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Confirm Save"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </form >
    );
}
