"use client";

import { Smartphone } from "@/lib/definitions";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface SmartphoneTableProps {
  smartphones: Smartphone[];
}

export default function SmartphoneTable({ smartphones }: SmartphoneTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemsPerPage = 20;

  // Read state from URL search parameters
  const searchTerm = searchParams.get("search") || "";
  const selectedBrands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const selectedOS = searchParams.get("os")?.split(",").filter(Boolean) || [];
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minRAM = searchParams.get("minRAM") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Helper function to update URL search parameters
  const updateSearchParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.set(key, value.join(","));
        } else {
          params.set(key, value);
        }
      });

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  // Get unique brands and OS
  const brands = useMemo(() => {
    return Array.from(new Set(smartphones.map((s) => s.brand_name))).sort();
  }, [smartphones]);

  const operatingSystems = useMemo(() => {
    return Array.from(new Set(smartphones.map((s) => s.operating_system))).sort();
  }, [smartphones]);

  // Filter smartphones
  const filteredSmartphones = useMemo(() => {
    return smartphones.filter((phone) => {
      // Search filter
      if (searchTerm && !phone.model.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(phone.brand_name)) {
        return false;
      }

      // OS filter
      if (selectedOS.length > 0 && !selectedOS.includes(phone.operating_system)) {
        return false;
      }

      // Price filter
      if (minPrice && phone.price < parseInt(minPrice)) {
        return false;
      }
      if (maxPrice && phone.price > parseInt(maxPrice)) {
        return false;
      }

      // RAM filter
      if (minRAM && phone.ram < parseInt(minRAM)) {
        return false;
      }

      return true;
    });
  }, [smartphones, searchTerm, selectedBrands, selectedOS, minPrice, maxPrice, minRAM]);

  // Pagination
  const totalPages = Math.ceil(filteredSmartphones.length / itemsPerPage);
  const paginatedSmartphones = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSmartphones.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSmartphones, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage !== 1 && searchParams.toString()) {
      updateSearchParams({ page: "1" });
    }
  }, [searchTerm, selectedBrands.join(","), selectedOS.join(","), minPrice, maxPrice, minRAM]);

  const toggleBrand = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    updateSearchParams({ brands: newBrands, page: "1" });
  };

  const toggleOS = (os: string) => {
    const newOS = selectedOS.includes(os) ? selectedOS.filter((o) => o !== os) : [...selectedOS, os];
    updateSearchParams({ os: newOS, page: "1" });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="space-y-4 rounded-2xl bg-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filtros</h3>
          <button onClick={clearFilters} className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-800">
            Limpiar filtros
          </button>
        </div>

        {/* Search */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Buscar modelo</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => updateSearchParams({ search: e.target.value, page: "1" })}
            placeholder="Ej: iPhone, Galaxy..."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Filter */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Marca</label>
            <div className="max-h-32 space-y-1 overflow-y-auto rounded-xl border border-gray-300 p-2">
              {brands.map((brand) => (
                <label key={brand} className="flex cursor-pointer items-center space-x-2">
                  <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                  <span className="text-lg lg:text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* OS Filter */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Sistema Operativo</label>
            <div className="space-y-1">
              {operatingSystems.map((os) => (
                <label key={os} className="flex cursor-pointer items-center space-x-2">
                  <input type="checkbox" checked={selectedOS.includes(os)} onChange={() => toggleOS(os)} />
                  <span className="text-lg lg:text-sm">{os}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Rango de Precio</label>
            <div className="space-y-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => updateSearchParams({ minPrice: e.target.value, page: "1" })}
                placeholder="Mínimo"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => updateSearchParams({ maxPrice: e.target.value, page: "1" })}
                placeholder="Máximo"
              />
            </div>
          </div>

          {/* RAM Filter */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">RAM Mínima (GB)</label>
            <input
              type="number"
              value={minRAM}
              onChange={(e) => updateSearchParams({ minRAM: e.target.value, page: "1" })}
              placeholder="Ej: 8"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          Mostrando {paginatedSmartphones.length} de {filteredSmartphones.length} resultados
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Precio</th>
                <th>OS</th>
                <th>RAM (GB)</th>
                <th>Almacenamiento (GB)</th>
                <th>Pantalla (")</th>
                <th>Batería (mAh)</th>
                <th>Cámara (MP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedSmartphones.map((phone) => (
                <tr key={phone.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{phone.brand_name}</td>
                  <td>{phone.model}</td>
                  <td className="font-semibold text-green-600!">${phone.price.toLocaleString()}</td>
                  <td>{phone.operating_system}</td>
                  <td>{phone.ram}</td>
                  <td>{phone.storage}</td>
                  <td>{phone.screen_size}</td>
                  <td>{phone.battery_capacity}</td>
                  <td>{phone.camera_mp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => updateSearchParams({ page: String(Math.max(currentPage - 1, 1)) })}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Anterior
              </button>
              <button
                onClick={() => updateSearchParams({ page: String(Math.min(currentPage + 1, totalPages)) })}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Página <span className="font-medium">{currentPage}</span> de{" "}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex -space-x-px rounded-xl shadow-sm">
                  <button
                    onClick={() => updateSearchParams({ page: String(Math.max(currentPage - 1, 1)) })}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => updateSearchParams({ page: String(pageNum) })}
                        className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                          currentPage === pageNum
                            ? "z-10 border-indigo-500 bg-indigo-50 text-indigo-600"
                            : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => updateSearchParams({ page: String(Math.min(currentPage + 1, totalPages)) })}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
