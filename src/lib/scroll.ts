import React from "react";

export function handleSmoothScroll(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  targetId: string
) {
  if (typeof window !== "undefined") {
    const elem = document.getElementById(targetId);
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: "smooth" });
      if (window.location.hash !== `#${targetId}`) {
        window.history.pushState(null, "", `/#${targetId}`);
      }
    }
  }
}
