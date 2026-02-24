import { Header } from "@/layout/Header";
import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import PropertyCard from "@/components/property/PropertyCard";
// ── Types ─────────────────────────────────────────────────────────────────────

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  created: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Skyline Penthouse Suite",
    description:
      "Breathtaking panoramic views from this luxury penthouse. Floor-to-ceiling windows, chef's kitchen, and a private rooftop terrace perfect for entertaining.",
    price: 4200000,
    location: "Downtown Manhattan, New York",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    created: "2024-11-03",
  },
  {
    id: 2,
    title: "Garden Villa Retreat",
    description:
      "Secluded hillside villa surrounded by lush tropical gardens. Infinity pool, outdoor kitchen, and spa-level bathrooms make this a true sanctuary.",
    price: 2750000,
    location: "Beverly Hills, Los Angeles",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    created: "2024-10-18",
  },
  {
    id: 3,
    title: "Coastal Modern House",
    description:
      "Steps from the beach, this architecturally striking home features an open floor plan, natural materials, and seamless indoor-outdoor living spaces.",
    price: 1875000,
    location: "Pacific Beach, San Diego",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    created: "2025-01-07",
  },
  {
    id: 4,
    title: "Urban Industrial Loft",
    description:
      "Converted warehouse loft in the heart of the arts district. Soaring ceilings, exposed brick, polished concrete floors, and designer finishes throughout.",
    price: 890000,
    location: "SoHo, New York",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    created: "2025-02-01",
  },
  {
    id: 5,
    title: "Lakefront Timber Home",
    description:
      "Classic craftsman home directly on Lake Shore. Wide covered porch, stone fireplace, and private dock access. A rare gem for nature lovers.",
    price: 1250000,
    location: "Lake Shore Drive, Chicago",
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
    created: "2024-12-15",
  },
  {
    id: 6,
    title: "Desert Modern Estate",
    description:
      "Striking desert contemporary with walls of glass framing mountain views. Negative-edge pool, smart home tech, and a serene minimalist interior.",
    price: 3100000,
    location: "Scottsdale, Arizona",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80",
    created: "2025-01-22",
  },
  {
    id: 7,
    title: "Old Town Heritage Condo",
    description:
      "Elegantly restored 19th-century building with modern interiors. Original crown molding, hardwood floors, and a charming private courtyard.",
    price: 620000,
    location: "Old Town, Chicago",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    created: "2024-09-30",
  },
  {
    id: 8,
    title: "Hilltop Spanish Villa",
    description:
      "Dramatic hilltop estate with Spanish colonial architecture. Hand-painted tiles, arched doorways, a private guest wing, and sweeping city views.",
    price: 5800000,
    location: "Hollywood Hills, Los Angeles",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    created: "2025-02-10",
  },
  {
    id: 9,
    title: "Minimalist City Flat",
    description:
      "Thoughtfully designed urban flat with every square foot optimized. Custom built-ins, premium appliances, and a Juliet balcony overlooking the skyline.",
    price: 740000,
    location: "Midtown, New York",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    created: "2025-01-15",
  },
];

const MAX_PRICE = 6_000_000;

function formatPrice(p: number): string {
  if (p >= 1_000_000)
    return "$" + (p / 1_000_000).toFixed(p % 1_000_000 === 0 ? 0 : 1) + "M";
  if (p >= 1_000) return "$" + Math.round(p / 1_000) + "K";
  return "$" + p;
}

export default function PropertyListPage() {
  const [search, setSearch] = useState<string>("");
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(MAX_PRICE);

  const filtered: Property[] = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PROPERTIES.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchPrice = p.price >= minVal && p.price <= maxVal;
      return matchSearch && matchPrice;
    });
  }, [search, minVal, maxVal]);

  const minPct: number = (minVal / MAX_PRICE) * 100;
  const maxPct: number = (maxVal / MAX_PRICE) * 100;
  const hasFilters: boolean =
    Boolean(search) || minVal > 0 || maxVal < MAX_PRICE;

  function clearAll(): void {
    setSearch("");
    setMinVal(0);
    setMaxVal(MAX_PRICE);
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
  }

  function handleMinChange(e: ChangeEvent<HTMLInputElement>): void {
    const v = Number(e.target.value);
    setMinVal(Math.min(v, maxVal - 100_000));
  }

  function handleMaxChange(e: ChangeEvent<HTMLInputElement>): void {
    const v = Number(e.target.value);
    setMaxVal(Math.max(v, minVal + 100_000));
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .range-wrap { position: relative; height: 24px; }
        .range-track { position: absolute; top: 50%; transform: translateY(-50%); left: 0; right: 0; height: 5px; background: #e2e8f0; border-radius: 9999px; }
        .range-fill { position: absolute; height: 100%; background: #059669; border-radius: 9999px; }
        .range-thumb { position: absolute; width: 100%; top: 50%; transform: translateY(-50%); appearance: none; -webkit-appearance: none; background: transparent; pointer-events: none; margin: 0; }
        .range-thumb::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #059669; border: 3px solid #fff; box-shadow: 0 1px 6px rgba(0,0,0,0.25); pointer-events: all; cursor: pointer; }
        .range-thumb::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #059669; border: 3px solid white; box-shadow: 0 1px 6px rgba(0,0,0,0.25); pointer-events: all; cursor: pointer; }
      `}</style>

      <Header />
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 py-16 px-4 text-center">
        <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
          Real Estate Marketplace
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
          Find Your Perfect <span className="text-emerald-400">Property</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Browse curated listings. Use the search and price filter below to find
          exactly what you're looking for.
        </p>
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row gap-4 md:items-end">
          {/* Search */}
          <div className="flex-1">
            <label
              htmlFor="property-search"
              className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5"
            >
              Search
            </label>
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                id="property-search"
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by city, name, or keyword..."
                className="w-full pl-10 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl leading-none"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="w-full md:w-80">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Price Range
              </label>
              <span className="text-xs font-bold text-emerald-600">
                {formatPrice(minVal)} — {formatPrice(maxVal)}
              </span>
            </div>
            <div className="range-wrap">
              <div className="range-track">
                <div
                  className="range-fill"
                  style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
                />
              </div>
              <input
                type="range"
                className="range-thumb"
                min={0}
                max={MAX_PRICE}
                step={50_000}
                value={minVal}
                onChange={handleMinChange}
                aria-label="Minimum price"
              />
              <input
                type="range"
                className="range-thumb"
                min={0}
                max={MAX_PRICE}
                step={50_000}
                value={maxVal}
                onChange={handleMaxChange}
                aria-label="Maximum price"
              />
            </div>
          </div>

          {/* Count + Clear */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm text-slate-500">
              <span className="font-bold text-slate-800">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "property" : "properties"}
            </span>
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-800 underline underline-offset-2 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🏚️</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              No properties found
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Try adjusting your search or price range.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="text-sm font-semibold bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p: Property) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-500 text-center text-xs py-6">
        © {new Date().getFullYear()} PropertyHub · All rights reserved
      </footer>
    </div>
  );
}
