"use client";

import React, { useState, useEffect, useRef } from "react";

interface LogoImageProps {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const FALLBACK_SRCS = [
  "/logo/logo-removebg-preview.png",
  "/logo-removebg-preview.png",
  "/logo.png",
  "/logo.jpeg",
];

const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 1500;

export function LogoImage({
  className = "w-full h-full object-contain",
  alt = "Artificial Quotient Logo",
  width,
  height,
}: LogoImageProps) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [cacheBuster, setCacheBuster] = useState("");
  const [hasFailedAll, setHasFailedAll] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleError = () => {
    if (srcIndex < FALLBACK_SRCS.length - 1) {
      // Try next fallback path immediately
      setSrcIndex((prev) => prev + 1);
    } else {
      // All paths failed in this cycle - might be due to server restarting/updating
      if (retryCount < MAX_RETRIES) {
        timerRef.current = setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          setSrcIndex(0);
          setCacheBuster(`?v=${Date.now()}`);
        }, RETRY_INTERVAL_MS);
      } else {
        setHasFailedAll(true);
      }
    }
  };

  const handleLoad = () => {
    setHasFailedAll(false);
  };

  if (hasFailedAll) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-emerald-500/20 text-emerald-400 font-bold font-heading rounded-lg border border-emerald-500/40 select-none text-xs sm:text-sm">
        AQ
      </div>
    );
  }

  const currentSrc = `${FALLBACK_SRCS[srcIndex]}${cacheBuster}`;

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      decoding="async"
      className={className}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

export default LogoImage;
