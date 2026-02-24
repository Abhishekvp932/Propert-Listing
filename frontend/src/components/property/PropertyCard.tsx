// import { Header } from "@/layout/Header";
import { useState} from "react";

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  created: string;
}

function formatPrice(p: number): string {
  if (p >= 1_000_000)
    return "$" + (p / 1_000_000).toFixed(p % 1_000_000 === 0 ? 0 : 1) + "M";
  if (p >= 1_000) return "$" + Math.round(p / 1_000) + "K";
  return "$" + p;
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── PropertyCard ──────────────────────────────────────────────────────────────

interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-slate-100">
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-emerald-700 font-bold text-sm px-3 py-1.5 rounded-xl shadow">
          {formatPrice(property.price)}
        </div>

        {/* Like Button */}
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          aria-label={liked ? "Unlike property" : "Like property"}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <svg
            className={`w-4 h-4 transition-colors ${
              liked ? "text-rose-500" : "text-slate-400"
            }`}
            fill={liked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Title */}
        <h2
          className="text-base font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors"
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {property.title}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <svg
            className="w-3.5 h-3.5 text-emerald-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xs text-slate-500 font-medium truncate">
            {property.location}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm text-slate-500 leading-relaxed mb-4"
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {property.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-3.5 h-3.5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
            </svg>
            <span className="text-xs text-slate-400 font-medium">
              {formatDate(property.created)}
            </span>
          </div>
          <button
            type="button"
            className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard
