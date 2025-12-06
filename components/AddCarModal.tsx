"use client";

import { useState } from "react";
import api from "../api/api";
import Image from "next/image";

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (carData: CarFormData) => void;
}

import { CAR_MODELS } from "./carModels";
import { CAR_TYPES } from "./carTypes";

interface CarFormData {
  model: string;
  type: string;
  color: string;
  serialNumber: string;
  seats: number;
  engineType: string;
  greyCard: string;
  year: number;
  image: File | null;
}

export default function AddCarModal({
  isOpen,
  onClose,
  onSubmit,
}: AddCarModalProps) {
  const [formData, setFormData] = useState<CarFormData>({
    model: "1", // default to 1 as string for FormData
    type: "",
    color: "",
    serialNumber: "",
    seats: 5,
    engineType: "Gasoline",
    greyCard: "",
    year: new Date().getFullYear(),
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("Car form data:", formData);
  
    const data = new FormData();
    data.append("model", formData.model);                 // ex: "1"
    data.append("type", formData.type);
    data.append("color", formData.color);
    data.append("serial_number", formData.serialNumber);
    data.append("nb_place", String(formData.seats));
    data.append("engine_type", formData.engineType);
    data.append("grey_card", formData.greyCard);
    data.append("year", String(formData.year));
    if (formData.image) data.append("image", formData.image);
  
    try {
      const res = await api.post("/api/cars/", data);     // ne PAS mettre headers ici
      console.log("Car created:", res.data);
      onSubmit(formData);
      handleClose();
    } catch (err: any) {
      console.error("Error creating car:", err.response?.data || err);
      alert(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Error creating car. Please try again."
      );
    }
  };
  
  const handleClose = () => {
    setFormData({
      model: "1",
      type: "",
      color: "",
      serialNumber: "",
      seats: 5,
      engineType: "Gasoline",
      greyCard: "",
      year: new Date().getFullYear(),
      image: null,
    });
    setImagePreview("");
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Preview */}
          {imagePreview && (
            <div className="flex justify-center">
              <div className="w-64 h-36 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={imagePreview}
                  alt="Car preview"
                  width={256}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select a type</option>
                {CAR_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color *
              </label>
              <select
                required
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="">Select a color</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Silver">Silver</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Gray">Gray</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Brown">Brown</option>
              </select>
            </div>

            {/* Serial number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serial number *
              </label>
              <input
                type="text"
                required
                value={formData.serialNumber}
                onChange={(e) =>
                  setFormData({ ...formData, serialNumber: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="e.g., 1234567890"
              />
            </div>

            {/* Nb place */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nb place *
              </label>
              <select
                required
                value={formData.seats}
                onChange={(e) =>
                  setFormData({ ...formData, seats: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value={2}>2 seats</option>
                <option value={4}>4 seats</option>
                <option value={5}>5 seats</option>
                <option value={7}>7 seats</option>
                <option value={8}>8 seats</option>
                <option value={9}>9 seats</option>
              </select>
            </div>

            {/* Engine type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Engine type *
              </label>
              <select
                required
                value={formData.engineType}
                onChange={(e) =>
                  setFormData({ ...formData, engineType: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="LPG">LPG</option>
              </select>
            </div>

            {/* Grey card */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grey card *
              </label>
              <input
                type="text"
                required
                value={formData.greyCard}
                onChange={(e) =>
                  setFormData({ ...formData, greyCard: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="e.g., 1234-5678-9012"
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year *
              </label>
              <input
                type="number"
                required
                min="1990"
                max={new Date().getFullYear() + 1}
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model *
              </label>
              <select
                required
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                <option value="1">Model 1 (default)</option>
                {CAR_MODELS.map((model, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
