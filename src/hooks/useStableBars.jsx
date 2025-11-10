import { useEffect } from "react";

export function useStableBars() {
  useEffect(() => {
    const root = document.documentElement;

    const getBase = () => {
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;top:-9999px;width:100px;height:100px;overflow:scroll";
      document.body.appendChild(el);
      const w = el.offsetWidth - el.clientWidth;
      document.body.removeChild(el);
      return w;
    };

    const base = getBase();
    root.style.setProperty("--sw-base", `${base}px`);

    const update = () => {
      const sw = window.innerWidth - root.clientWidth;
      root.style.setProperty("--sw-comp", sw > 0 ? "0px" : `var(--sw-base)`);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      root.style.removeProperty("--sw-base");
      root.style.removeProperty("--sw-comp");
    };
  }, []);
}
