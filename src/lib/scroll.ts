import React from "react";

export function handleSmoothScroll(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  targetId: string
) {
  if (typeof window === "undefined") return;

  const isHomePage = window.location.pathname === "/" || window.location.pathname === "";
  if (isHomePage) {
    const cleanId = targetId.replace(/^#/, "");
    const elem = document.getElementById(cleanId) || document.getElementById(`${cleanId}-section`);
    if (elem) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (window.location.hash !== `#${cleanId}`) {
        window.history.pushState(null, "", `/#${cleanId}`);
      }
    }
  }
}
