// src/components/profile/EditCarModal.tsx
import { useState, useEffect } from 'react';
import { X, Upload, Car as CarIcon, Palette, Fuel, Calendar, Hash, FileText } from 'lucide-react';
import api from '../../api/api';

// ============================================================================
// TYPES - Correspond à votre backend Django
// ============================================================================

interface VehicleType {
  id: number;
  name: string;
}

interface Color {
  id: number;
  name: string;
  code: string;
}

interface EngineType {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
  brand: Brand;
}

interface CarData {
  id: number;
  vehicle_type: number;
  color: number;
  engine_type: number;
  model: number;
  serial_number: string;
  nb_place: number;
  grey_card: string;
  year: number;
  image?: string;
}

interface EditCarModalProps {
  car: CarData;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// ============================================================================
// COMPOSANT EDIT CAR MODAL
// ============================================================================

export default function EditCarModal({ car, isOpen, onClose, onSuccess }: EditCarModalProps) {
  const [formData, setFormData] = useState({
    vehicle_type: car.vehicle_type,
    color: car.color,
    engine_type: car.engine_type,
    model: car.model,
    serial_number: car.serial_number,
    nb_place: car.nb_place,
    grey_card: car.grey_card,
    year: car.year,
    image: car.image || ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(car.image || '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // États pour stocker les données depuis l'API
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [engineTypes, setEngineTypes] = useState<EngineType[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Charger les données depuis l'API au montage du composant
  useEffect(() => {
    const fetchData = async () => {
      if (!isOpen) return;
      
      setLoadingData(true);
      try {
        const [vehicleTypesRes, colorsRes, engineTypesRes, modelsRes] = await Promise.all([
          api.get('/api/vehicle-types/'),
          api.get('/api/colors/'),
          api.get('/api/engine-types/'),
          api.get('/api/models/')
        ]);

        setVehicleTypes(vehicleTypesRes.data);
        setColors(colorsRes.data);
        setEngineTypes(engineTypesRes.data);
        setModels(modelsRes.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setErrors({ submit: 'Erreur lors du chargement des données' });
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nb_place' || name === 'year' || name === 'vehicle_type' || 
              name === 'color' || name === 'engine_type' || name === 'model' 
        ? parseInt(value) 
        : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'L\'image ne doit pas dépasser 5MB' }));
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.serial_number.trim()) {
      newErrors.serial_number = 'Le numéro de série est requis';
    }
    if (!formData.grey_card.trim()) {
      newErrors.grey_card = 'La carte grise est requise';
    }
    if (formData.nb_place < 1) {
      newErrors.nb_place = 'Le nombre de places doit être au moins 1';
    }
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Année invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const data = new FormData();
      
      // Ajouter tous les champs
      data.append('vehicle_type', String(formData.vehicle_type));
      data.append('color', String(formData.color));
      data.append('engine_type', String(formData.engine_type));
      data.append('model', String(formData.model));
      data.append('serial_number', formData.serial_number.toUpperCase().trim());
      data.append('nb_place', String(formData.nb_place));
      data.append('grey_card', formData.grey_card);
      data.append('year', String(formData.year));
      
      // Ajouter l'image seulement si une nouvelle a été sélectionnée
      if (imageFile) {
        data.append('image', imageFile);
      }

      console.log('🚗 Envoi PATCH /api/cars/' + car.id + '/');

      await api.patch(`/api/cars/${car.id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('✅ Voiture modifiée avec succès !');
      onSuccess();
      onClose();
    } catch (error: unknown) {
      console.error('❌ Erreur:', error);
      
      const err = error as { response?: { data?: Record<string, unknown> } };
      
      if (err.response?.data) {
        const errors = err.response.data;
        let msg = 'Erreurs:\n';
        for (const [field, errorMsg] of Object.entries(errors)) {
          msg += `${field}: ${Array.isArray(errorMsg) ? errorMsg[0] : errorMsg}\n`;
        }
        setErrors({ submit: msg });
      } else {
        setErrors({ submit: 'Erreur lors de la mise à jour' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slideUp">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <CarIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Modifier le véhicule</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {loadingData ? (
          <div className="p-8 text-center">
            <p>Chargement...</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Photo du véhicule
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Choisir une image
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      PNG, JPG jusqu'à 5MB
                    </p>
                    {errors.image && (
                      <p className="mt-1 text-xs text-red-500">{errors.image}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Modèle
                  </label>
                  <select
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {models.map(model => (
                      <option key={model.id} value={model.id}>
                        {model.brand.name} {model.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Type de véhicule
                  </label>
                  <select
                    name="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {vehicleTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Couleur
                  </label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {colors.map(color => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Fuel className="w-4 h-4" />
                    Type de moteur
                  </label>
                  <select
                    name="engine_type"
                    value={formData.engine_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    {engineTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Numéro de série
                  </label>
                  <input
                    type="text"
                    name="serial_number"
                    value={formData.serial_number}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.serial_number ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ex: ABC123XYZ"
                  />
                  {errors.serial_number && (
                    <p className="text-xs text-red-500">{errors.serial_number}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Carte grise
                  </label>
                  <input
                    type="text"
                    name="grey_card"
                    value={formData.grey_card}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.grey_card ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Numéro de carte grise"
                  />
                  {errors.grey_card && (
                    <p className="text-xs text-red-500">{errors.grey_card}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nombre de places
                  </label>
                  <input
                    type="number"
                    name="nb_place"
                    value={formData.nb_place}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.nb_place ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.nb_place && (
                    <p className="text-xs text-red-500">{errors.nb_place}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Année
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.year ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.year && (
                    <p className="text-xs text-red-500">{errors.year}</p>
                  )}
                </div>
              </div>

              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 whitespace-pre-wrap">{errors.submit}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}