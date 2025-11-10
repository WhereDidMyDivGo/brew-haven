import "../styles/Menu.css";

import { useState, useEffect } from "react";

import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../context/data";

export default function Menu() {
  const { addItem } = useCart();
  const [imageUrls, setImageUrls] = useState({});
  const [loaded, setLoaded] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchImages = async () => {
      const newImageUrls = {};
      const query = "coffee+drink+cafe";
      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&count=${PRODUCTS.length}&orientation=landscape&client_id=Ty9BKoPR_qtquEHUpAIE-gyBJFp8fmMpvUstkeVLZ3k`, { signal: controller.signal });

        if (!mounted) return;

        if (!response.ok) throw new Error("Fetch failed");
        const images = await response.json();

        PRODUCTS.forEach((product, index) => {
          if (images[index]?.urls?.regular) newImageUrls[product.id] = images[index].urls.regular;
        });

        if (mounted) setImageUrls(newImageUrls);
      } catch (err) {
        if (mounted) setError(true);
      }
    };

    fetchImages();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section className="menu-section">
      <h2>Menu — Full Selection</h2>
      <div className="menu-grid">
        {PRODUCTS.map((p) => (
          <article key={p.id} className="menu-item">
            <div className={`menu-image ${loaded[p.id] ? "loaded" : "loading"}`}>
              {!loaded[p.id] && !error && <div className="loader-ring" />}
              {error ? (
                <div
                  style={{
                    color: "#a97852",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 600,
                    fontSize: "1rem",
                    height: "100%",
                    background: "#111",
                  }}
                >
                  Failed to load image
                </div>
              ) : (
                imageUrls[p.id] && <img src={imageUrls[p.id]} alt={p.name} onLoad={() => setLoaded((s) => ({ ...s, [p.id]: true }))} draggable="false" />
              )}
            </div>

            <div className="menu-content">
              <h3>{p.name}</h3>
              <div className="menu-meta">
                <span className="price">${p.price.toFixed(2)}</span>
                <button
                  onClick={(e) => {
                    addItem(p, 1);
                    const btn = e.currentTarget;
                    const plus = document.createElement("span");
                    plus.textContent = "+1";
                    plus.className = "plus-one";
                    const bw = btn.clientWidth;
                    const x = Math.random() * (bw - 20) + 10;
                    const y = -(Math.random() * 24 + 8);
                    const drift = Math.random() * 24 - 12;
                    plus.style.setProperty("--x", `${x}px`);
                    plus.style.setProperty("--y", `${y}px`);
                    plus.style.setProperty("--drift", `${drift}px`);
                    btn.appendChild(plus);
                    setTimeout(() => plus.remove(), 700);
                  }}
                  className="cta-button"
                  aria-label={`Add ${p.name} to cart`}
                >
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
