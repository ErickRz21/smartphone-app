import { Smartphone } from "@/lib/definitions";

export interface BrandCount {
    brand: string;
    count: number;
}

export interface PriceRange {
    range: string;
    count: number;
    min: number;
    max: number;
}

export interface OSShare {
    os: string;
    count: number;
    percentage: number;
}

export interface YearTrend {
    year: number;
    count: number;
}

export interface BrandSpecs {
    brand: string;
    avgRam: number;
    avgStorage: number;
    avgBattery: number;
}

export function getBrandDistribution(smartphones: Smartphone[]): BrandCount[] {
    const brandMap = new Map<string, number>();

    smartphones.forEach((phone) => {
        const count = brandMap.get(phone.brand_name) || 0;
        brandMap.set(phone.brand_name, count + 1);
    });

    const distribution = Array.from(brandMap.entries())
        .map(([brand, count]) => ({ brand, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10); // Top 10 brands

    return distribution;
}

export function getPriceDistribution(smartphones: Smartphone[]): PriceRange[] {
    const ranges = [
        { min: 5000, max: 25000, range: "$5000-25000" },
        { min: 25000, max: 35000, range: "$25000-35000" },
        { min: 35000, max: 50000, range: "$35000-50000" },
        { min: 50000, max: Infinity, range: "$50000+" },
    ];

    const distribution = ranges.map((range) => ({
        ...range,
        count: smartphones.filter(
            (phone) => phone.price >= range.min && phone.price < range.max
        ).length,
    }));

    return distribution;
}

export function getOSMarketShare(smartphones: Smartphone[]): OSShare[] {
    const osMap = new Map<string, number>();
    const total = smartphones.length;

    smartphones.forEach((phone) => {
        const count = osMap.get(phone.operating_system) || 0;
        osMap.set(phone.operating_system, count + 1);
    });

    const marketShare = Array.from(osMap.entries())
        .map(([os, count]) => ({
            os,
            count,
            percentage: Math.round((count / total) * 100 * 10) / 10,
        }))
        .sort((a, b) => b.count - a.count);

    return marketShare;
}

export function getReleaseYearTrend(smartphones: Smartphone[]): YearTrend[] {
    const yearMap = new Map<number, number>();

    smartphones.forEach((phone) => {
        const count = yearMap.get(phone.release_year) || 0;
        yearMap.set(phone.release_year, count + 1);
    });

    const trend = Array.from(yearMap.entries())
        .map(([year, count]) => ({ year, count }))
        .sort((a, b) => a.year - b.year);

    return trend;
}

export function getBrandSpecsComparison(smartphones: Smartphone[]): BrandSpecs[] {
    const brandMap = new Map<
        string,
        { totalRam: number; totalStorage: number; totalBattery: number; count: number }
    >();

    smartphones.forEach((phone) => {
        const existing = brandMap.get(phone.brand_name) || {
            totalRam: 0,
            totalStorage: 0,
            totalBattery: 0,
            count: 0,
        };

        brandMap.set(phone.brand_name, {
            totalRam: existing.totalRam + phone.ram,
            totalStorage: existing.totalStorage + phone.storage,
            totalBattery: existing.totalBattery + phone.battery_capacity,
            count: existing.count + 1,
        });
    });

    const comparison = Array.from(brandMap.entries())
        .map(([brand, data]) => ({
            brand,
            avgRam: Math.round(data.totalRam / data.count),
            avgStorage: Math.round(data.totalStorage / data.count),
            avgBattery: Math.round(data.totalBattery / data.count),
        }))
        .sort((a, b) => b.avgRam - a.avgRam)
        .slice(0, 5); // Top 5 brands by RAM

    return comparison;
}
