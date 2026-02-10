"use client";

import { Smartphone } from "@/lib/definitions";
import { useState, useMemo } from "react";

interface SmartphoneSelectorProps {
  smartphones: Smartphone[];
  selectedPhones: Smartphone[];
  onSelectPhone: (phone: Smartphone) => void;
  maxSelection?: number;
}

export default function SmartphoneSelector({
  smartphones,
  selectedPhones,
  onSelectPhone,
  maxSelection = 4,
}: SmartphoneSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const brands = useMemo(() => {
    return Array.from(new Set(smartphones.map((s) => s.brand_name))).sort();
  }, [smartphones]);

  const filteredSmartphones = useMemo(() => {
    return smartphones.filter((phone) => {
      const matchesSearch =
        searchTerm === "" ||
        phone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.brand_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = selectedBrand === "" || phone.brand_name === selectedBrand;

      return matchesSearch && matchesBrand;
    });
  }, [smartphones, searchTerm, selectedBrand]);

  const isSelected = (phone: Smartphone) => {
    return selectedPhones.some((p) => p.id === phone.id);
  };

  const canSelect = selectedPhones.length < maxSelection;

  return (
    <div className="space-y-4">
      {/* Selection Counter */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-400 to-indigo-600 p-4 text-white shadow-inner shadow-indigo-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Selecciona teléfonos para comparar</h3>
            <p className="mt-1 text-sm opacity-90">
              {selectedPhones.length} de {maxSelection} seleccionados
            </p>
          </div>
          <div className="text-3xl font-bold">
            {selectedPhones.length}/{maxSelection}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="rounded-3xl bg-white p-4 shadow-inner shadow-neutral-400">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Buscar teléfono</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por marca o modelo..."
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Filtrar por marca</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3.5 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todas las marcas</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Phone List */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-inner shadow-neutral-400">
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2">
            {filteredSmartphones.slice(0, 50).map((phone) => {
              const selected = isSelected(phone);
              return (
                <button
                  key={phone.id}
                  onClick={() => onSelectPhone(phone)}
                  disabled={!selected && !canSelect}
                  className={`p-4 text-left transition-all duration-200 ${
                    selected
                      ? "border-l-4 border-indigo-500 bg-indigo-50/50"
                      : "border-l-4 border-transparent hover:bg-neutral-100/50"
                  } ${!selected && !canSelect ? "cursor-not-allowed opacity-40 grayscale" : "cursor-pointer hover:scale-[1.01]"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">
                            {phone.brand_name} {phone.model}
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            {phone.operating_system} • {phone.ram}GB RAM • {phone.storage}GB • $
                            {phone.price.toLocaleString()} | {phone.release_year}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {selected ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {filteredSmartphones.length === 0 && (
            <div className="p-8 text-center text-gray-500">No se encontraron teléfonos con los filtros aplicados</div>
          )}
          {filteredSmartphones.length > 50 && (
            <div className="border-t border-neutral-200 bg-neutral-50 p-4 text-center text-sm text-gray-500">
              Mostrando 50 de {filteredSmartphones.length} resultados. Refina tu búsqueda para ver más.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
