"use client";

import { Smartphone } from "@/lib/definitions";
import { useState } from "react";

interface SmartphoneComparisonTableProps {
  selectedPhones: Smartphone[];
  onRemovePhone: (id: number) => void;
}

export default function SmartphoneComparisonTable({
  selectedPhones,
  onRemovePhone,
}: SmartphoneComparisonTableProps) {
  if (selectedPhones.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-2 shadow-inner shadow-neutral-400 text-center">
        <div className="mx-auto max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No hay teléfonos seleccionados
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Selecciona hasta 4 teléfonos para comparar sus especificaciones
          </p>
        </div>
      </div>
    );
  }

  const specCategories = [
    {
      title: "Información General",
      specs: [
        { label: "Marca", key: "brand_name" },
        { label: "Modelo", key: "model" },
        { label: "Precio", key: "price", format: (val: number) => `$${val.toLocaleString()}` },
        { label: "Año de Lanzamiento", key: "release_year" },
      ],
    },
    {
      title: "Pantalla",
      specs: [
        { label: "Tamaño", key: "screen_size", format: (val: number) => `${val}"` },
        { label: "Tasa de Refresco", key: "refresh_rate", format: (val: number) => `${val} Hz` },
      ],
    },
    {
      title: "Rendimiento",
      specs: [
        { label: "Sistema Operativo", key: "operating_system" },
        { label: "Chipset", key: "chipset" },
        { label: "GPU", key: "gpu" },
        { label: "RAM", key: "ram", format: (val: number) => `${val} GB` },
        { label: "Almacenamiento", key: "storage", format: (val: number) => `${val} GB` },
      ],
    },
    {
      title: "Cámaras",
      specs: [
        { label: "Cámara Principal", key: "camera_mp", format: (val: number) => `${val} MP` },
        { label: "Cámara Frontal", key: "front_camera_mp", format: (val: number) => `${val} MP` },
      ],
    },
    {
      title: "Batería y Carga",
      specs: [
        { label: "Capacidad", key: "battery_capacity", format: (val: number) => `${val} mAh` },
        { label: "Carga Rápida", key: "fast_charging" },
      ],
    },
    {
      title: "Diseño",
      specs: [
        { label: "Peso", key: "weight", format: (val: number) => `${val} g` },
        { label: "Grosor", key: "thickness", format: (val: number) => `${val} mm` },
        { label: "Material", key: "body_material" },
      ],
    },
    {
      title: "Conectividad",
      specs: [
        { label: "Dual SIM", key: "dual_sim" },
        { label: "Red", key: "network_support" },
        { label: "Bluetooth", key: "bluetooth_version" },
        { label: "WiFi", key: "wifi_version" },
        { label: "USB", key: "usb_type" },
      ],
    },
    {
      title: "Seguridad",
      specs: [{ label: "Sensor de Huella", key: "fingerprint_sensor" }],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header with phone cards */}
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full gap-4 pb-4">
          {selectedPhones.map((phone) => (
            <div
              key={phone.id}
              className="flex-shrink-1 w-full rounded-3xl bg-gradient-to-br from-indigo-400 to-indigo-600 p-4 shadow-lg text-white relative"
            >
              <button
                onClick={() => onRemovePhone(phone.id)}
                className="absolute top-3 right-3 z-10 bg-white/20 hover:bg-white/30 rounded-full p-1.5 transition-colors cursor-pointer"
                title="Eliminar de comparación"
              >
                <svg className="w-4 h-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-sm font-medium opacity-90">{phone.brand_name}</div>
              <div className="mt-1 text-xl font-bold">{phone.model}</div>
              <div className="mt-4 text-2xl font-bold">${phone.price.toLocaleString()}</div>
              <div className="mt-1 text-sm opacity-75">{phone.operating_system}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-inner shadow-neutral-400 border border-neutral-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <tbody>
              {specCategories.map((category, categoryIndex) => (
                <>
                  {/* Category Header */}
                  <tr key={`category-${categoryIndex}`}>
                    <td
                      colSpan={selectedPhones.length + 1}
                      className="bg-white px-6 py-3 text-left text-sm font-bold text-black uppercase tracking-wider border-b-2 border-indigo-200"
                    >
                      {category.title}
                    </td>
                  </tr>
                  {/* Specs in this category */}
                  {category.specs.map((spec, specIndex) => (
                    <tr
                      key={`${categoryIndex}-${specIndex}`}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700 bg-neutral-50 border-r border-neutral-200 whitespace-nowrap w-48">
                        {spec.label}
                      </td>
                      {selectedPhones.map((phone) => {
                        const value = phone[spec.key as keyof Smartphone];
                        const displayValue = spec.format && typeof value === "number" 
                          ? spec.format(value) 
                          : String(value);
                        
                        return (
                          <td
                            key={phone.id}
                            className="px-6 py-4 text-sm text-gray-900 border-r border-neutral-100 last:border-r-0"
                          >
                            {displayValue}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
