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


interface UnsplashPhoto {
    id: string;
    urls: { thumb: string; full: string; raw: string; small: string; regular: string };
    links: { html: string };
    user: { name: string };
}

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {

    const { pending } = useFormStatus();

    const [images, setImages] = useState<UnsplashPhoto[]>(defaultImages as unknown as UnsplashPhoto[]);
    const [isloading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    useEffect(() => {

        const fetchImages = async () => {


            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 9
                })
                
                if (result && result.response) {
                    const newImages = result.response as UnsplashPhoto[]
                    setImages(newImages)
                }
            } catch (error) {
                setImages(defaultImages)
                console.error('Error fetching images:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchImages();
    }, [])

    if (isloading) {
        return (
            <div className="flex items-center justify-center p-6">
                <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-4 mb-2">
                {
                    images.map(image => (
                        <div className={cn("cursor-pointer relative aspect-video  group hover:opacity-75 transition bg-muted", pending && "opacity-50 cursor-auto hover:opacity-50")}
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
                                className="rounded-sm object-cover"
                            />
                            {
                                selectedImage === image.id && (
                                    <div className="absolute inset-y-0 w-full h-full flex justify-center items-center border-2 bg-black/30">
                                        <Check className="w-4 h-4 text-white bg-indigo-400 rounded-full" />
                                    </div>
                                )
                            }
                            <Link
                                href={image.links.html}
                                target="_blank"
                                className="bg-black/50 text-white group-hover:opacity-100 opacity-0 absolute bottom-0 left-0 truncate text-xs w-full p-1 text-center">
                                {image.user.name}
                            </Link>

                        </div>
                    ))
                }
            </div>
            <FormErrors errors={errors} id={id} />
        </div>
    )
}
