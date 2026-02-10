"use client";

import React, { useState } from "react";
import SmartphoneSelector from "@/components/SmartphoneSelector";
import SmartphoneComparisonTable from "@/components/SmartphoneComparisonTable";
import { Smartphone } from "@/lib/definitions";

interface DiscoverClientProps {
  smartphones: Smartphone[];
}

export default function DiscoverClient({ smartphones }: DiscoverClientProps) {
  const [selectedPhones, setSelectedPhones] = useState<Smartphone[]>([]);

  const handleSelectPhone = (phone: Smartphone) => {
    setSelectedPhones((prev) => {
      const isSelected = prev.some((p) => p.id === phone.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== phone.id);
      } else {
        if (prev.length >= 4) {
          return prev;
        }
        return [...prev, phone];
      }
    });
  };

  const handleRemovePhone = (id: number) => {
    setSelectedPhones((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Comparador de Smartphones</h1>
        <p className="mt-2 text-gray-600">Compara hasta 4 teléfonos lado a lado para encontrar el mejor para ti</p>
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
        {/* Left: Phone Selector */}
        <div>
          <SmartphoneSelector
            smartphones={smartphones}
            selectedPhones={selectedPhones}
            onSelectPhone={handleSelectPhone}
            maxSelection={4}
          />
        </div>

        {/* Right: Comparison Table */}
        <div className="lg:col-span-1">
          <SmartphoneComparisonTable selectedPhones={selectedPhones} onRemovePhone={handleRemovePhone} />
        </div>
      </div>
    </div>
  );
}
