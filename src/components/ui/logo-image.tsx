"use client";

import React, { useState } from "react";
import Image from "next/image";

interface LogoImageProps {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function LogoImage({
  className = "w-full h-full object-contain",
  alt = "Artificial Quotient Logo",
  width = 40,
  height = 40,
  priority = true,
}: LogoImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 font-bold font-heading rounded-lg border border-emerald-500/40 select-none text-xs sm:text-sm">
        AQ
      </div>
    );
  }

  return (
    <Image
      src="/logo-removebg-preview.png"
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={90}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

export default LogoImage;

