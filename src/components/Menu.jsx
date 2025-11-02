import "../styles/Menu.css";

import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

const PRODUCTS = [
  { id: "caramel", name: "Caramel Dream", price: 4.99 },
  { id: "dark", name: "Dark Roast", price: 3.99 },
  { id: "vanilla", name: "Vanilla Latte", price: 4.49 },
  { id: "mocha", name: "Mocha Blast", price: 5.49 },
  { id: "espresso", name: "Espresso Shot", price: 2.5 },
  { id: "americano", name: "Americano", price: 3.25 },
  { id: "cappuccino", name: "Cappuccino", price: 4.25 },
  { id: "flatwhite", name: "Flat White", price: 4.0 },
  { id: "latte", name: "Classic Latte", price: 4.0 },
  { id: "hazelnut", name: "Hazelnut Latte", price: 4.75 },
  { id: "matcha", name: "Matcha Latte", price: 5.0 },
  { id: "chai", name: "Chai Tea", price: 3.75 },
  { id: "iced-latte", name: "Iced Latte", price: 4.25 },
  { id: "cold-brew", name: "Cold Brew", price: 4.5 },
  { id: "nitro", name: "Nitro Cold Brew", price: 5.25 },
  { id: "affogato", name: "Affogato", price: 5.5 },
  { id: "frapuccino", name: "Mocha Frappé", price: 5.0 },
  { id: "cortado", name: "Cortado", price: 3.0 },
  { id: "macchiato", name: "Caramel Macchiato", price: 4.9 },
  { id: "hot-chocolate", name: "Hot Chocolate", price: 3.5 },
  { id: "tea", name: "Herbal Tea", price: 2.75 },
  { id: "smoothie", name: "Berry Smoothie", price: 5.75 },
];

export default function Menu() {
  const { addItem } = useCart();
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const fetchImages = async () => {
      const newImageUrls = {};
      const query = "coffee+drink+cafe";

      try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&count=${PRODUCTS.length}&orientation=landscape&client_id=Ty9BKoPR_qtquEHUpAIE-gyBJFp8fmMpvUstkeVLZ3k`, { signal: controller.signal });
        if (!mounted) return;
        console.log("Response:", response);
        const images = await response.json();
        if (!mounted) return;
        console.log("Images:", images);

        PRODUCTS.forEach((product, index) => {
          if (images[index]) {
            newImageUrls[product.id] = images[index].urls.regular;
          }
        });

        if (mounted) {
          console.log("Final URLs:", newImageUrls);
          setImageUrls(newImageUrls);
        }
      } catch (error) {
        console.log(error);
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
            <div className="menu-image" style={{ backgroundImage: `url(${imageUrls[p.id]})` }} />
            <div className="menu-content">
              <h3>{p.name}</h3>
              <div className="menu-meta">
                <span className="price">${p.price.toFixed(2)}</span>
                <button onClick={() => addItem(p, 1)} className="cta-button small" aria-label={`Add ${p.name} to cart`}>
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
