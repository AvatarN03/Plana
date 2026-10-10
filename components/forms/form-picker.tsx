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
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
                }
            } catch {
                setImages(defaultImages as FormPickerImage[]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (isloading) {
        return (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="w-5 h-5 text-[var(--landing-orange)] animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-1.5 mb-1">
                {
                    images.slice(0, 6).map(image => (
                        <div className={cn("cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted rounded-[4px] overflow-hidden", pending && "opacity-50 cursor-auto hover:opacity-50")}
                            key={image.id}
                            onClick={() => {
                                if (pending) return;
                                setSelectedImage(image.id)
                            }}
                        >
                            <input
                                type="radio"
                                className="hidden"
                                onClick={() => { }}
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
                                    <div className="absolute inset-y-0 w-full h-full flex justify-center items-center border border-[var(--landing-orange)] bg-black/40">
                                        <div className="w-4 h-4 rounded-full bg-[var(--landing-orange)] flex items-center justify-center">
                                            <Check className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    </div>
                                )
                            }
                            {image.links && image.user && (
                                <Link
                                    href={image.links.html}
                                    target="_blank"
                                    className="bg-black/50 text-white group-hover:opacity-100 opacity-0 absolute bottom-0 left-0 truncate text-[10px] w-full py-0.5 px-1 text-center">
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
