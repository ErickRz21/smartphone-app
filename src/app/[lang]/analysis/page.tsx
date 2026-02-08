import React, { Suspense } from "react";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import Spinner from "@/components/Spinner";
import BrandDistributionChart from "@/components/charts/BrandDistributionChart";
import PriceDistributionChart from "@/components/charts/PriceDistributionChart";
import OSMarketShareChart from "@/components/charts/OSMarketShareChart";
import ReleaseYearTrendChart from "@/components/charts/ReleaseYearTrendChart";
import SpecsComparisonChart from "@/components/charts/SpecsComparisonChart";

import { getIntl } from "@/lib/intl";
import { getSmartphones } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import {
  getBrandDistribution,
  getPriceDistribution,
  getOSMarketShare,
  getReleaseYearTrend,
  getBrandSpecsComparison,
} from "@/lib/chart-utils";

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Page({ params }: Props) {
  const { lang: locale } = await params;
  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);
  const smartphones = await getSmartphones();

  // Process data for charts
  const brandData = getBrandDistribution(smartphones);
  const priceData = getPriceDistribution(smartphones);
  const osData = getOSMarketShare(smartphones);
  const yearData = getReleaseYearTrend(smartphones);
  const specsData = getBrandSpecsComparison(smartphones);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Análisis de Datos</h1>
        <p className="text-gray-600">
          Visualización de datos del catálogo de smartphones ({smartphones.length} dispositivos)
        </p>
      </div>

      {/* Brand Distribution */}
      <Card>
        <CardHeader>Distribución por Marca</CardHeader>
        <CardBody>
          <p className="mb-4 text-sm text-gray-600">Top 10 marcas con mayor cantidad de modelos en el catálogo</p>
          <BrandDistributionChart data={brandData} />
        </CardBody>
      </Card>

      {/* Two column layout for medium charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Price Distribution */}
        <Card>
          <CardHeader>Distribución de Precios</CardHeader>
          <CardBody>
            <p className="mb-4 text-sm text-gray-600">Segmentación del mercado por rangos de precio</p>
            <PriceDistributionChart data={priceData} />
          </CardBody>
        </Card>

        {/* OS Market Share */}
        <Card>
          <CardHeader>Cuota de Mercado por Sistema Operativo</CardHeader>
          <CardBody>
            <p className="mb-4 text-sm text-gray-600">Distribución de dispositivos por sistema operativo</p>
            <OSMarketShareChart data={osData} />
          </CardBody>
        </Card>
      </div>

      {/* Release Year Trend */}
      <Card>
        <CardHeader>Tendencia de Lanzamientos por Año</CardHeader>
        <CardBody>
          <p className="mb-4 text-sm text-gray-600">Evolución del número de lanzamientos a lo largo del tiempo</p>
          <ReleaseYearTrendChart data={yearData} />
        </CardBody>
      </Card>

      {/* Specs Comparison */}
      <Card>
        <CardHeader>Comparación de Especificaciones por Marca</CardHeader>
        <CardBody>
          <p className="mb-4 text-sm text-gray-600">Promedio de RAM, almacenamiento y batería de las top 5 marcas</p>
          <SpecsComparisonChart data={specsData} />
        </CardBody>
      </Card>
    </div>
  );
}
