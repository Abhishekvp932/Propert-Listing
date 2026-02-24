// components/property/PropertyModal.tsx

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Trash2 } from "lucide-react";
import type { CreatePropertyInput, Property } from "@/types/propertyTypes";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

interface PropertyModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreatePropertyInput) => void;
  onUpdate?: (id: string, data: CreatePropertyInput) => void;
  editingProperty?: Property | null; // ← if passed, modal is in edit mode
}

interface FormState {
  title: string;
  description: string;
  price: string;
  location: string;
  imageUrl: string;      // current URL input field value
  imageFile: File | null;
}

interface PreviewItem {
  preview: string;   // base64 or URL — for display only
  file?: File;       // only in upload mode
  isUrl?: boolean;   // only in URL mode
}

const INITIAL_FORM: FormState = {
  title: "",
  description: "",
  price: "",
  location: "",
  imageUrl: "",
  imageFile: null,
};

const MAX_IMAGES = 4;

export function PropertyModal({
  open,
  onClose,
  onCreate,
  onUpdate,
  editingProperty,
}: PropertyModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.user.user);

  const isEditMode = !!editingProperty;

  // ── Pre-fill form when editing ─────────────────────────────────────────────
useEffect(() => {
  if (editingProperty) {
    setForm({
      title: editingProperty.title,
      description: editingProperty.description,
      price: editingProperty.price.toString(),
      location: editingProperty.location,
      imageUrl: "",
      imageFile: null,
    });
    // ✅ Guard in case imageUrl is undefined
    setPreviews(
      (editingProperty.imageUrl ?? []).map((url) => ({ preview: url, isUrl: true }))
    );
    setImageMode("url");
  } else {
    setForm(INITIAL_FORM);
    setPreviews([]);
    setImageMode("upload");
  }
}, [editingProperty]);

  if (!open) return null;

  const canAddMore = previews.length < MAX_IMAGES;

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.price) newErrors.price = "Price is required";
    else if (isNaN(Number(form.price))) newErrors.price = "Price must be a number";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (previews.length === 0) newErrors.imageUrl = "At least one image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: CreatePropertyInput = {
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      location: form.location.trim(),
      owner: user?._id as string,
      imageFiles: previews.filter((p) => p.file).map((p) => p.file as File),
      imageUrl: previews.filter((p) => p.isUrl).map((p) => p.preview),
    };

    if (isEditMode && onUpdate && editingProperty._id) {
      onUpdate(editingProperty._id, payload); // ← edit
    } else {
      onCreate(payload); // ← create
    }

    handleClose();
  };

  // ── Reset & Close ──────────────────────────────────────────────────────────
  const handleClose = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setPreviews([]);
    setImageMode("upload");
    onClose();
  };

  // ── Upload mode ────────────────────────────────────────────────────────────
  const addFiles = (files: File[]) => {
    const remaining = MAX_IMAGES - previews.length;
    if (remaining <= 0) return;
    const toAdd = files.slice(0, remaining);
    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [
          ...prev,
          { preview: reader.result as string, file },
        ]);
        if (errors.imageUrl) setErrors((prev) => ({ ...prev, imageUrl: "" }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    addFiles(files);
  };

  // ── URL mode ───────────────────────────────────────────────────────────────
  const handleAddUrl = () => {
    const url = form.imageUrl.trim();
    if (!url || !canAddMore) return;
    setPreviews((prev) => [...prev, { preview: url, isUrl: true }]);
    setForm((prev) => ({ ...prev, imageUrl: "" }));
    if (errors.imageUrl) setErrors((prev) => ({ ...prev, imageUrl: "" }));
  };

  // ── Shared ─────────────────────────────────────────────────────────────────
  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const switchMode = (mode: "upload" | "url") => {
    setImageMode(mode);
    // Don't clear previews when switching modes in edit — user may want to keep existing images
    if (!isEditMode) {
      setPreviews([]);
      setForm((prev) => ({ ...prev, imageUrl: "" }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {isEditMode ? "Edit Property" : "Add New Property"}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isEditMode
                ? "Update your property details"
                : "Fill in the details to list your property"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              Property Title
            </label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Modern Downtown Apartment"
              className={errors.title ? "border-red-400" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1.5">
              Description
            </label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your property..."
              rows={3}
              className={errors.description ? "border-red-400" : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Price + Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-1.5">
                Price ($)
              </label>
              <Input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g., 2500"
                className={errors.price ? "border-red-400" : ""}
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-800 mb-1.5">
                Location
              </label>
              <Input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY"
                className={errors.location ? "border-red-400" : ""}
              />
              {errors.location && (
                <p className="text-red-500 text-xs mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-800">
                Property Images
              </label>
              <span className="text-xs text-slate-400">
                {previews.length} / {MAX_IMAGES} images
              </span>
            </div>

            {/* Mode Toggle */}
            <div className="flex rounded-lg border border-slate-200 p-1 mb-3 w-fit gap-1">
              <button
                type="button"
                onClick={() => switchMode("upload")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  imageMode === "upload"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Upload Files
              </button>
              <button
                type="button"
                onClick={() => switchMode("url")}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  imageMode === "url"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Image URLs
              </button>
            </div>

            {/* Upload drop zone */}
            {imageMode === "upload" && canAddMore && (
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl cursor-pointer transition-colors mb-3
                  border-slate-200 hover:border-blue-300 hover:bg-slate-50
                  ${errors.imageUrl ? "border-red-300" : ""}`}
              >
                <div className="h-32 flex flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Upload size={20} className="text-slate-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-600">
                      Drop images here, or{" "}
                      <span className="text-blue-600">browse</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      PNG, JPG, WEBP — select multiple at once
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}

            {/* URL input + Add button */}
            {imageMode === "url" && canAddMore && (
              <div className="flex gap-2 mb-3">
                <Input
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddUrl();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddUrl}
                  disabled={!form.imageUrl.trim()}
                >
                  Add
                </Button>
              </div>
            )}

            {/* Max reached notice */}
            {!canAddMore && (
              <p className="text-amber-500 text-xs mb-2">
                Maximum of {MAX_IMAGES} images reached. Remove one to add another.
              </p>
            )}

            {/* Preview grid */}
            {previews.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-1">
                {previews.map((item, index) => (
                  <div
                    key={index}
                    className="relative h-20 rounded-lg overflow-hidden border border-slate-200 group"
                  >
                    <img
                      src={item.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=150&fit=crop";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5
                        opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={12} />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs rounded px-1">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {errors.imageUrl && (
              <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1">
              {isEditMode ? "Save Changes" : "Add Property"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}