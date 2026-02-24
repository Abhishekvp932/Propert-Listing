"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { useParams } from "react-router-dom";
import { GetSingleProperty } from "@/services/property";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string[]; // ✅ matches backend field name and is an array
  createdDate: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PropertyDetailPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // const [saved, setSaved] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await GetSingleProperty(id);
        setProperty(res); // adjust to res if backend returns directly
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  function handlePrev(): void {
    if (!property) return;
    setActiveIndex((i) => (i === 0 ? property.imageUrl.length - 1 : i - 1));
  }

  function handleNext(): void {
    if (!property) return;
    setActiveIndex((i) => (i === property.imageUrl.length - 1 ? 0 : i + 1));
  }

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg">Loading property...</p>
        </div>
        <Footer />
      </main>
    );
  }

  // ── Not found state ───────────────────────────────────────────────────────
  if (!property) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-gray-500 text-lg">Property not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  // ── Main render (property is guaranteed non-null here) ────────────────────
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Back link */}
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to listings
        </button>

        {/* ── Image Gallery ── */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Main image */}
          <div className="relative w-full h-72 sm:h-[420px] bg-gray-200 group">
            <img
              src={property.imageUrl[activeIndex]}
              alt={`${property.title} – image ${activeIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Prev button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>

            {/* Counter badge */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {activeIndex + 1} / {property.imageUrl.length}
            </div>
          </div>

          {/* Thumbnails */}
          {property.imageUrl.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {property.imageUrl.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    activeIndex === i
                      ? "border-blue-600"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  <img
                    src={url}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Title, Location, Date, Actions ── */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {property.title}
              </h2>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>Listed on {formatDate(property.createdDate)}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            {/* <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSaved((s) => !s)}
                className={`flex items-center gap-1.5 text-sm font-medium border px-3 py-2 rounded-lg transition-colors ${
                  saved
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={saved ? "currentColor" : "none"}
                />
                {saved ? "Saved" : "Save"}
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm font-medium border border-gray-300 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div> */}
          </div>

          {/* Price + Description */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-3xl font-bold text-blue-600 mb-6">
              {formatPrice(property.price)}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              About This Property
            </h3>
            <div className="space-y-3">
              {property.description.split("\n\n").map((para, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Property Info Summary ── */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Property Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Price */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path
                    d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Price</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatPrice(property.price)}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Location
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {property.location}
                </p>
              </div>
            </div>

            {/* Listed date */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Listed On
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(property.createdDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
