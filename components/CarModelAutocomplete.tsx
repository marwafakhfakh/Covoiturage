import { useState, useRef, useEffect } from "react";

// Interface pour les props du composant
interface AutocompleteProps {
  models: Array<{ id: number; name: string; brand: number }>;
  brands: Array<{ id: number; name: string }>;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function CarModelAutocomplete({
  models,
  brands,
  value,
  onChange,
  required = false,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fonction pour obtenir le nom de la marque
  const getBrandName = (brandId: number) => {
    return brands.find((b) => b.id === brandId)?.name || "";
  };

  // Obtenir le modèle sélectionné
  const selectedModel = models.find((m) => String(m.id) === value);
  const displayValue = selectedModel
    ? `${getBrandName(selectedModel.brand)} ${selectedModel.name}`
    : "";

  // Filtrer les modèles selon la recherche
  const filteredModels = models.filter((model) => {
    const fullName = `${getBrandName(model.brand)} ${model.name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gérer la navigation au clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredModels.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredModels[highlightedIndex]) {
          handleSelect(filteredModels[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchTerm("");
        inputRef.current?.blur();
        break;
    }
  };

  // Sélectionner un modèle
  const handleSelect = (model: { id: number; name: string; brand: number }) => {
    onChange(String(model.id));
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(0);
  };

  // Réinitialiser l'index surligné quand les résultats changent
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Modèle de voiture {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : displayValue}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a car model..."
          required={required}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition"
        />

        {/* Icône dropdown */}
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            inputRef.current?.focus();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Bouton clear */}
        {value && !isOpen && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setSearchTerm("");
            }}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown liste */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredModels.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No models found
            </div>
          ) : (
            filteredModels.map((model, index) => {
              const fullName = `${getBrandName(model.brand)} ${model.name}`;
              const isSelected = String(model.id) === value;
              const isHighlighted = index === highlightedIndex;

              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => handleSelect(model)}
                  className={`w-full text-left px-4 py-2 transition ${
                    isHighlighted
                      ? "bg-gray-100"
                      : isSelected
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{fullName}</span>
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}