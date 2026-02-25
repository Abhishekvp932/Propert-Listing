// pages/SellPage.tsx

import { useEffect, useState } from "react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyModal } from "@/components/property/PropertyModal";
import type { Property, CreatePropertyInput } from "@/types/propertyTypes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Header } from "@/layout/Header";
import { Footer } from "@/layout/Footer";
import { toast, ToastContainer } from "react-toastify";
import { handleApiError } from "@/utils/handleApiError";
import {
  CreateProperty,
  DeleteProperty,
  GetUserProperties,
  UpdateProperty,
} from "@/services/property";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import Pagination from "@/components/common/Pagination";

export default function SellPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 10;
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const user = useSelector((state: RootState) => state.user.user?._id);

  useEffect(() => {
    if (!user) return;
    const fetchProperties = async () => {
      try {
        const res = await GetUserProperties(user, page, limit);
        setProperties(res.properties);
        setTotalPage(res.totalPages);
      } catch (error) {
        toast.error(handleApiError(error));
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [user]);

  const handleCreate = async (data: CreatePropertyInput) => {
    try {
      const formData = buildFormData(data);
      const res = await CreateProperty(formData);
      toast.success(res.msg);
      const updated = await GetUserProperties(user!, page, limit);
      setProperties(updated.properties);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleUpdate = async (id: string, data: CreatePropertyInput) => {
    try {
      console.log("update data", data);
      const formData = buildFormData(data);
      const res = await UpdateProperty(id, formData);
      toast.success(res.msg);
      const updated = await GetUserProperties(user!, page, limit);
      setProperties(updated.properties);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const buildFormData = (data: CreatePropertyInput): FormData => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("location", data.location);
    if (data.owner) formData.append("owner", data.owner.toString());

    if (data.imageFiles && data.imageFiles.length > 0) {
      data.imageFiles.forEach((file) => formData.append("propertyImage", file));
    }
    if (data.imageUrl && data.imageUrl.length > 0) {
      data.imageUrl.forEach((url) => formData.append("imageUrl", url));
    }

    return formData;
  };

  const handleDelete = async (id: string) => {
    try {
      setProperties((prev) => prev.filter((p) => p._id !== id));
      const res = await DeleteProperty(id);
      toast.success(res.msg);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProperty(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Properties</h1>
            <p className="text-slate-500 text-sm mt-1">
              {properties.length}{" "}
              {properties.length === 1 ? "property" : "properties"} listed
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={() => {
              setEditingProperty(null);
              setShowModal(true);
            }}
          >
            <Plus size={20} />
            Add Property
          </Button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-24 text-slate-400">
            Loading properties...
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-slate-500 text-lg mb-4">
              No properties listed yet
            </p>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowModal(true)}
            >
              <Plus size={20} />
              Add Your First Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </main>

      <div className="flex justify-center mt-8">
        <Pagination
          totalPages={totalPage}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      <Footer />

      <PropertyModal
        open={showModal}
        onClose={handleCloseModal}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editingProperty={editingProperty}
      />

      <ToastContainer autoClose={200} />
    </div>
  );
}
