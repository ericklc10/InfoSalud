import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Intenta scroll global
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Si el scroll ocurre en main-content
    const main = document.querySelector(".main-content");
    if (main) {
      main.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
