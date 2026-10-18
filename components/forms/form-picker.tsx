"use client";
import { defaultImages } from "@/constant/image";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
    id: string,
    errors?: Record<string, string[] | undefined>,
}


interface FormPickerImage {
    id: string;
    urls: { thumb: string; full: string; [key: string]: string };
    links?: { html: string };
    user?: { name: string };
    alt?: string;
    alt_description?: string;
}

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {

    const { pending } = useFormStatus();

    const [images, setImages] = useState<FormPickerImage[]>(defaultImages as FormPickerImage[]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(
        (defaultImages as FormPickerImage[])[0]?.id || null
    );

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 6
                })
                
                if (result && result.response) {
                    const newImages = result.response as FormPickerImage[]
                    setImages(newImages)
                    if (newImages.length > 0) {
                        setSelectedImage(newImages[0].id)
                    }
                }
            } catch {
                setImages(defaultImages as FormPickerImage[]);
                if (defaultImages.length > 0) {
                    setSelectedImage(defaultImages[0].id);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (isloading) {
        return (
            <div className="flex items-center justify-center p-6 border border-dashed border-[var(--landing-line)] rounded-lg bg-[var(--landing-panel-strong)]">
                <Loader2 className="w-5 h-5 text-[var(--landing-orange)] animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-2 mb-1.5">
                {
                    images.slice(0, 6).map(image => (
                        <div
                            key={image.id}
                            className={cn(
                                "cursor-pointer relative aspect-video group transition-all duration-200 bg-[var(--landing-panel-strong)] rounded-lg overflow-hidden border border-[var(--landing-line)] hover:border-[var(--landing-orange)] hover:scale-[1.02]",
                                selectedImage === image.id && "ring-2 ring-[var(--landing-orange)] border-transparent shadow-sm",
                                pending && "opacity-50 cursor-not-allowed hover:scale-100"
                            )}
                            onClick={() => {
                                if (pending) return;
                                setSelectedImage(image.id)
                            }}
                        >
                            <input
                                type="radio"
                                className="hidden"
                                onChange={() => { }}
                                value={`${image.id}|${image.urls.thumb}|${image.urls.full}`}
                                checked={selectedImage === image.id}
                                disabled={pending}
                                name={id}
                                id={id}
                            />

                            <Image
                                fill
                                src={image.urls.thumb}
                                alt={image.alt_description || "Cover image"}
                                className="object-cover"
                            />
                            {
                                selectedImage === image.id && (
                                    <div className="absolute inset-0 flex justify-center items-center bg-black/45 backdrop-blur-[1px]">
                                        <div className="w-5 h-5 rounded-full bg-[var(--landing-orange)] flex items-center justify-center shadow-md">
                                            <Check className="w-3 h-3 text-white stroke-[2.5]" />
                                        </div>
                                    </div>
                                )
                            }
                            {image.links && image.user && (
                                <Link
                                    href={image.links.html}
                                    target="_blank"
                                    className="bg-black/60 text-white/90 group-hover:opacity-100 opacity-0 absolute bottom-0 left-0 truncate text-[10px] w-full py-0.5 px-1.5 text-center transition-opacity">
                                    {image.user.name}
                                </Link>
                            )}

                        </div>
                    ))
                }
            </div>
            <FormErrors errors={errors} id={id} />
        </div>
    )
}
