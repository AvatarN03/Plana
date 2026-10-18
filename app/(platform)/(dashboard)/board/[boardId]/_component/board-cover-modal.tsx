"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Check, ImageIcon, Loader2, RefreshCw, Upload, Sparkles } from "lucide-react";

import { defaultImages, UnsplashImage } from "@/constant/image";
import { updateBoard } from "@/actions/update-board";
import { useAction } from "@/hooks/use-action";
import { unsplash } from "@/lib/unsplash";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BoardCoverModalProps {
  boardId: string;
  currentImageId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BoardCoverModal = ({
  boardId,
  currentImageId,
  isOpen,
  onClose,
}: BoardCoverModalProps) => {
  const [activeTab, setActiveTab] = useState<"gallery" | "upload">("gallery");
  const [images, setImages] = useState<UnsplashImage[]>(defaultImages);
  const [isLoadingImages, setIsLoadingImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    defaultImages.find((img) => img.id === currentImageId) || defaultImages[0] || null
  );

  // Custom upload state
  const [customImageDataUrl, setCustomImageDataUrl] = useState<string | null>(null);

  const { execute, isLoading } = useAction(updateBoard, {
    onSuccess: (updated) => {
      toast.success(`Board cover updated for "${updated.title}"`);
      onClose();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const fetchRandomImages = async () => {
    setIsLoadingImages(true);
    try {
      const result = await unsplash.photos.getRandom({
        collectionIds: ["317099"],
        count: 9,
      });

      if (result && result.response) {
        const rawList = Array.isArray(result.response) ? result.response : [result.response];
        const formatted: UnsplashImage[] = rawList.map((photo) => ({
          id: photo.id,
          alt: photo.alt_description || "Board cover",
          urls: {
            thumb: photo.urls.thumb,
            full: photo.urls.full,
          },
        }));
        setImages(formatted);
        if (formatted.length > 0) {
          setSelectedImage(formatted[0]);
        }
      }
    } catch {
      toast.error("Failed to fetch new Unsplash photos, using default gallery");
      setImages(defaultImages);
    } finally {
      setIsLoadingImages(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG, JPG, WebP)");
      return;
    }

    // Check size limit: max 4MB before compression
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image file is too large. Please select an image under 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // Compress and resize image using canvas for snappy loading
        const canvas = document.createElement("canvas");
        const maxDim = 1920;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setCustomImageDataUrl(compressedDataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (activeTab === "gallery") {
      if (!selectedImage) return;
      const payload = `${selectedImage.id}|${selectedImage.urls.thumb}|${selectedImage.urls.full}`;
      execute({ id: boardId, image: payload });
    } else {
      if (!customImageDataUrl) return;
      const customId = `custom-${Date.now()}`;
      const payload = `${customId}|${customImageDataUrl}|${customImageDataUrl}`;
      execute({ id: boardId, image: payload });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-5 border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-text)] rounded-sm">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-[var(--landing-text)] flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[var(--landing-orange)]" />
            Change Board Cover
          </DialogTitle>
        </DialogHeader>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-[var(--landing-line)] pb-2 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={cn(
              "px-3 py-1.5 rounded-sm transition cursor-pointer flex items-center gap-1.5",
              activeTab === "gallery"
                ? "bg-[var(--landing-panel-strong)] text-[var(--landing-orange)] font-semibold border border-[var(--landing-line)]"
                : "text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Curated Gallery
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={cn(
              "px-3 py-1.5 rounded-sm transition cursor-pointer flex items-center gap-1.5",
              activeTab === "upload"
                ? "bg-[var(--landing-panel-strong)] text-[var(--landing-orange)] font-semibold border border-[var(--landing-line)]"
                : "text-[var(--landing-muted)] hover:text-[var(--landing-text)]"
            )}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload Custom Image
          </button>
        </div>

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[var(--landing-muted)]">
              <span>Select from high-resolution wallpapers</span>
              <button
                type="button"
                disabled={isLoadingImages}
                onClick={fetchRandomImages}
                className="flex items-center gap-1 hover:text-[var(--landing-orange)] transition cursor-pointer"
              >
                <RefreshCw className={cn("w-3 h-3", isLoadingImages && "animate-spin")} />
                Shuffle photos
              </button>
            </div>

            {isLoadingImages ? (
              <div className="h-44 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-[var(--landing-orange)]" />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {images.map((image) => {
                  const isSelected = selectedImage?.id === image.id;
                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className={cn(
                        "relative aspect-video rounded-sm overflow-hidden border transition-all cursor-pointer group text-left",
                        isSelected
                          ? "ring-2 ring-[var(--landing-orange)] border-[var(--landing-orange)] scale-[1.02]"
                          : "border-[var(--landing-line)] hover:border-white/40 opacity-75 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={image.urls.thumb}
                        alt={image.alt || "Cover option"}
                        fill
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="space-y-3">
            <p className="text-xs text-[var(--landing-muted)]">
              Upload an image from your computer to use as the board background.
            </p>

            <label className="border-2 border-dashed border-[var(--landing-line)] hover:border-[var(--landing-orange)] rounded-sm p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-[var(--landing-panel-strong)]/40 hover:bg-[var(--landing-panel-strong)]">
              <Upload className="w-6 h-6 text-[var(--landing-muted)]" />
              <span className="text-xs font-medium text-[var(--landing-text)]">
                Click to browse image file
              </span>
              <span className="text-[11px] text-[var(--landing-muted)]">
                PNG, JPG, or WebP (up to 4MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {customImageDataUrl && (
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[var(--landing-muted)]">
                  Preview:
                </span>
                <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-[var(--landing-orange)] shadow-md">
                  <Image
                    src={customImageDataUrl}
                    alt="Custom upload preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-xs font-semibold flex items-center gap-1 shadow-sm">
                    <Check className="w-3 h-3" /> Ready
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--landing-line)]">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="h-8 text-xs text-[var(--landing-muted)] hover:text-[var(--landing-text)] rounded-sm cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={
              isLoading ||
              (activeTab === "gallery" && !selectedImage) ||
              (activeTab === "upload" && !customImageDataUrl)
            }
            className="h-8 text-xs bg-[var(--landing-orange)] text-white hover:bg-[var(--landing-orange)]/90 rounded-sm cursor-pointer font-medium"
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
            ) : null}
            Apply Cover
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
