"use client";

import { useState, useMemo, useEffect } from "react";
import { Home, Search, Filter, MapPin, Calendar } from "lucide-react";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { Link } from "react-router";
import { GetAllProperties } from "@/services/property";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  createdAt: string;
}

interface FilterState {
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  console.log("properties", properties);

  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    minPrice: 0,
    maxPrice: 5000000,
  });
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await GetAllProperties();
        console.log("get all properties response", res);
        // If backend returns { properties: [...] }
        setProperties(res);

        // If backend returns array directly:
        // setProperties(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = property.title
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());
      const matchesPrice =
        property.price >= filters.minPrice &&
        property.price <= filters.maxPrice;
      return matchesSearch && matchesPrice;
    });
  }, [properties, filters]);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSearchChange = (value: string): void => {
    setFilters((prev) => ({ ...prev, searchQuery: value }));
  };

  const handleMinPriceChange = (value: string): void => {
    setFilters((prev) => ({ ...prev, minPrice: parseInt(value) || 0 }));
  };

  const handleMaxPriceChange = (value: string): void => {
    setFilters((prev) => ({ ...prev, maxPrice: parseInt(value) || 5000000 }));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Properties
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={filters.searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={filters.minPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formatPrice(filters.minPrice)}
              </p>
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={filters.maxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formatPrice(filters.maxPrice)}
              </p>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredProperties.length}</span>{" "}
            of <span className="font-semibold">{properties.length}</span>{" "}
            properties
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading properties...</p>
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={property.imageUrl[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {property.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {property.description}
                  </p>

                  {/* Location and Date */}
                  <div className="space-y-2 mb-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        {new Date(property.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Price + View Details button */}
                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </p>
                    <Link
                      to={`/details-page/${property?._id}`}
                      className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to find available properties.
            </p>
          </div>
        )}

        <Footer />
      </div>
    </main>
  );
}
