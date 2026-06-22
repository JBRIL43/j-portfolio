"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

/**
 * Image that adapts its object-fit to its natural orientation.
 *
 * - Landscape images (wider than tall) → `object-cover object-top` (fill the frame, crop sides).
 * - Portrait OR square images (taller than wide, or equal) → `object-contain`
 *   (show the whole image, letterboxed on a dark background).
 *
 * The container should provide a fixed aspect ratio + a dark background so
 * non-landscape letterboxing looks intentional.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
}: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [contain, setContain] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    // Resolve orientation as soon as intrinsic dimensions are known.
    // Use contain for anything that isn't strictly landscape (i.e. portrait or square).
    const check = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setContain(img.naturalHeight >= img.naturalWidth);
      }
    };
    check();
    img.addEventListener("load", check, { once: true });
    return () => img.removeEventListener("load", check);
  }, [src]);

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-[oklch(0.08_0.008_264)]",
        className
      )}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        className={cn(
          "h-full w-full",
          contain
            ? "object-contain p-2"
            : "object-cover object-top",
          imgClassName
        )}
      />
    </div>
  );
}
