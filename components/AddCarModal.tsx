// "use client";

// import { useState } from "react";
// import api from "../api/api";
// import Image from "next/image";

// interface AddCarModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (carData: CarFormData) => void;
// }

// import { CAR_MODELS } from "./carModels";
// import { CAR_TYPES } from "./carTypes";

// interface CarFormData {
//   model: string;
//   type: string;
//   color: string;
//   serialNumber: string;
//   seats: number;
//   engineType: string;
//   greyCard: string;
//   year: number;
//   image: File | null;
// }

// export default function AddCarModal({
//   isOpen,
//   onClose,
//   onSubmit,
// }: AddCarModalProps) {
//   const [formData, setFormData] = useState<CarFormData>({
//     model: "1", // default to 1 as string for FormData
//     type: "",
//     color: "",
//     serialNumber: "",
//     seats: 5,
//     engineType: "Gasoline",
//     greyCard: "",
//     year: new Date().getFullYear(),
//     image: null,
//   });

//   const [imagePreview, setImagePreview] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     console.log("Car form data:", formData);
  
//     const data = new FormData();
//     data.append("model", formData.model);                 // ex: "1"
//     data.append("type", formData.type);
//     data.append("color", formData.color);
//     data.append("serial_number", formData.serialNumber);
//     data.append("nb_place", String(formData.seats));
//     data.append("engine_type", formData.engineType);
//     data.append("grey_card", formData.greyCard);
//     data.append("year", String(formData.year));
//     if (formData.image) data.append("image", formData.image);
  
//     try {
//       const res = await api.post("/api/cars/", data);     // ne PAS mettre headers ici
//       console.log("Car created:", res.data);
//       onSubmit(formData);
//       handleClose();
//     } catch (err: any) {
//       console.error("Error creating car:", err.response?.data || err);
//       alert(
//         err.response?.data
//           ? JSON.stringify(err.response.data)
//           : "Error creating car. Please try again."
//       );
//     }
//   };
  
//   const handleClose = () => {
//     setFormData({
//       model: "1",
//       type: "",
//       color: "",
//       serialNumber: "",
//       seats: 5,
//       engineType: "Gasoline",
//       greyCard: "",
//       year: new Date().getFullYear(),
//       image: null,
//     });
//     setImagePreview("");
//     onClose();
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
//             <button
//               onClick={handleClose}
//               className="text-gray-400 hover:text-gray-600 text-2xl"
//             >
//               ×
//             </button>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Image Preview */}
//           {imagePreview && (
//             <div className="flex justify-center">
//               <div className="w-64 h-36 rounded-lg overflow-hidden bg-gray-100">
//                 <Image
//                   src={imagePreview}
//                   alt="Car preview"
//                   width={256}
//                   height={144}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Type *
//               </label>
//               <select
//                 required
//                 value={formData.type}
//                 onChange={(e) =>
//                   setFormData({ ...formData, type: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               >
//                 <option value="">Select a type</option>
//                 {CAR_TYPES.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Color */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Color *
//               </label>
//               <select
//                 required
//                 value={formData.color}
//                 onChange={(e) =>
//                   setFormData({ ...formData, color: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               >
//                 <option value="">Select a color</option>
//                 <option value="Black">Black</option>
//                 <option value="White">White</option>
//                 <option value="Silver">Silver</option>
//                 <option value="Blue">Blue</option>
//                 <option value="Red">Red</option>
//                 <option value="Gray">Gray</option>
//                 <option value="Green">Green</option>
//                 <option value="Yellow">Yellow</option>
//                 <option value="Orange">Orange</option>
//                 <option value="Brown">Brown</option>
//               </select>
//             </div>

//             {/* Serial number */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Serial number *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.serialNumber}
//                 onChange={(e) =>
//                   setFormData({ ...formData, serialNumber: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//                 placeholder="e.g., 1234567890"
//               />
//             </div>

//             {/* Nb place */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Nb place *
//               </label>
//               <select
//                 required
//                 value={formData.seats}
//                 onChange={(e) =>
//                   setFormData({ ...formData, seats: parseInt(e.target.value) })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               >
//                 <option value={2}>2 seats</option>
//                 <option value={4}>4 seats</option>
//                 <option value={5}>5 seats</option>
//                 <option value={7}>7 seats</option>
//                 <option value={8}>8 seats</option>
//                 <option value={9}>9 seats</option>
//               </select>
//             </div>

//             {/* Engine type */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Engine type *
//               </label>
//               <select
//                 required
//                 value={formData.engineType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, engineType: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               >
//                 <option value="Gasoline">Gasoline</option>
//                 <option value="Diesel">Diesel</option>
//                 <option value="Electric">Electric</option>
//                 <option value="Hybrid">Hybrid</option>
//                 <option value="LPG">LPG</option>
//               </select>
//             </div>

//             {/* Grey card */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Grey card *
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.greyCard}
//                 onChange={(e) =>
//                   setFormData({ ...formData, greyCard: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//                 placeholder="e.g., 1234-5678-9012"
//               />
//             </div>

//             {/* Year */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Year *
//               </label>
//               <input
//                 type="number"
//                 required
//                 min="1990"
//                 max={new Date().getFullYear() + 1}
//                 value={formData.year}
//                 onChange={(e) =>
//                   setFormData({ ...formData, year: parseInt(e.target.value) })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               />
//             </div>

//             {/* Image */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               />
//             </div>

//             {/* Model */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Model *
//               </label>
//               <select
//                 required
//                 value={formData.model}
//                 onChange={(e) =>
//                   setFormData({ ...formData, model: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
//               >
//                 <option value="1">Model 1 (default)</option>
//                 {CAR_MODELS.map((model, idx) => (
//                   <option key={idx + 1} value={idx + 1}>
//                     {model}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex gap-4 pt-4 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
//             >
//               Add Car
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import api from "../api/api";
import Image from "next/image";

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (carData: any) => void;
}

// Types pour correspondre au backend
interface Brand {
  id: number;
  name: string;
  logo: string | null;
}

interface Model {
  id: number;
  name: string;
  brand: number;
}

interface CarFormData {
  model: string; // ID du modèle
  type: string;
  color: string;
  serial_number: string;
  nb_place: number;
  engine_type: string;
  grey_card: string;
  year: number;
  image: File | null;
}

const CAR_TYPES = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van",
  "Truck",
  "Sports Car"
];

const CAR_COLORS = [
  "Black",
  "White",
  "Silver",
  "Gray",
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Orange",
  "Brown",
  "Beige",
  "Gold"
];

const ENGINE_TYPES = [
  "Gasoline",
  "Diesel",
  "Electric",
  "Hybrid",
  "Plug-in Hybrid",
  "LPG",
  "CNG"
];

export default function AddCarModal({
  isOpen,
  onClose,
  onSubmit,
}: AddCarModalProps) {
  const [formData, setFormData] = useState<CarFormData>({
    model: "",
    type: "",
    color: "",
    serial_number: "",
    nb_place: 5,
    engine_type: "Gasoline",
    grey_card: "",
    year: new Date().getFullYear(),
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  
  // Charger les modèles depuis l'API
  const [models, setModels] = useState<Model[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingModels, setLoadingModels] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchModelsAndBrands();
    }
  }, [isOpen]);

  const fetchModelsAndBrands = async () => {
    try {
      setLoadingModels(true);
      const [modelsRes, brandsRes] = await Promise.all([
        api.get("/api/models/"),
        api.get("/api/brands/")
      ]);

      const modelsList = modelsRes.data.results || modelsRes.data || [];
      const brandsList = brandsRes.data.results || brandsRes.data || [];

      setModels(modelsList);
      setBrands(brandsList);

      // Définir le premier modèle par défaut s'il existe
      if (modelsList.length > 0) {
        setFormData(prev => ({ ...prev, model: modelsList[0].id.toString() }));
      }
    } catch (err) {
      console.error("Error fetching models/brands:", err);
      setError("Failed to load car models. Please try again.");
    } finally {
      setLoadingModels(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.model) {
      setError("Please select a car model");
      setLoading(false);
      return;
    }

    console.log("Submitting car data:", formData);

    const data = new FormData();
    data.append("model", formData.model);
    data.append("type", formData.type);
    data.append("color", formData.color);
    data.append("serial_number", formData.serial_number);
    data.append("nb_place", String(formData.nb_place));
    data.append("engine_type", formData.engine_type);
    data.append("grey_card", formData.grey_card);
    data.append("year", String(formData.year));
    
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await api.post("/api/cars/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Car created successfully:", res.data);
      onSubmit(res.data);
      handleClose();
    } catch (err: any) {
      console.error("Error creating car:", err.response?.data || err);
      
      // Afficher les erreurs de validation du backend
      if (err.response?.data) {
        const errors = err.response.data;
        const errorMessages = Object.entries(errors)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        setError(errorMessages || "Failed to add car. Please check your information.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      model: models.length > 0 ? models[0].id.toString() : "",
      type: "",
      color: "",
      serial_number: "",
      nb_place: 5,
      engine_type: "Gasoline",
      grey_card: "",
      year: new Date().getFullYear(),
      image: null,
    });
    setImagePreview("");
    setError("");
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  // Obtenir le nom de la marque pour un modèle
  const getBrandName = (brandId: number) => {
    const brand = brands.find(b => b.id === brandId);
    return brand ? brand.name : "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Add New Car</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              type="button"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
            </div>
          )}

          {/* Loading Models */}
          {loadingModels && (
            <div className="text-center py-4 text-gray-500">
              Loading car models...
            </div>
          )}

          {/* Image Preview */}
          {imagePreview && (
            <div className="flex justify-center">
              <div className="w-64 h-36 rounded-lg overflow-hidden bg-gray-100 relative">
                <Image
                  src={imagePreview}
                  alt="Car preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model - IMPORTANT: Doit être en premier */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Model * {loadingModels && <span className="text-gray-400">(Loading...)</span>}
              </label>
              <select
                required
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                disabled={loadingModels || models.length === 0}
              >
                <option value="">Select a model</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {getBrandName(model.brand)} {model.name}
                  </option>
                ))}
              </select>
              {!loadingModels && models.length === 0 && (
                <p className="mt-1 text-sm text-red-600">
                  No models available. Please add models in the admin panel first.
                </p>
              )}
            </div>

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
                {CAR_COLORS.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Serial Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serial Number * <span className="text-gray-400 text-xs">(Must be unique)</span>
              </label>
              <input
                type="text"
                required
                value={formData.serial_number}
                onChange={(e) =>
                  setFormData({ ...formData, serial_number: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="e.g., ABC123XYZ789"
              />
            </div>

            {/* Number of Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Seats *
              </label>
              <select
                required
                value={formData.nb_place}
                onChange={(e) =>
                  setFormData({ ...formData, nb_place: parseInt(e.target.value) })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                {[2, 4, 5, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num} seat{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Engine Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Engine Type *
              </label>
              <select
                required
                value={formData.engine_type}
                onChange={(e) =>
                  setFormData({ ...formData, engine_type: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                {ENGINE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Grey Card */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grey Card Number *
              </label>
              <input
                type="text"
                required
                value={formData.grey_card}
                onChange={(e) =>
                  setFormData({ ...formData, grey_card: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="e.g., GC-1234-5678"
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

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Image <span className="text-gray-400 text-xs">(Optional, max 5MB)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || loadingModels || models.length === 0}
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}