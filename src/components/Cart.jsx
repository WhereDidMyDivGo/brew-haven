import "../styles/Cart.css";

import { useRef, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, updateQty, removeItem, total, isOpen, closeCart } = useCart();
  const overlayRef = useRef(null);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else if (visible) {
      const t = setTimeout(() => setVisible(false), 320);
      return () => clearTimeout(t);
    }
  }, [isOpen, visible]);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) closeCart();
  }
  if (!visible) return null;

  return (
    <div className={`cart-overlay ${isOpen ? "open" : "closing"}`} ref={overlayRef} onClick={handleOverlayClick} aria-hidden={!isOpen}>
      <aside className={`cart-drawer ${isOpen ? "slide-in" : "slide-out"}`} role="dialog" aria-modal="true">
        <div className="cart-header">
          <h4>Your Cart</h4>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="cart-body">
          {items.length ? (
            <ul className="cart-list">
              {items.map((it) => (
                <li key={it.id} className="cart-item">
                  <div className="cart-item-info">
                    <strong>{it.name}</strong>
                    <div className="muted">
                      {it.qty} × ${it.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button onClick={() => updateQty(it.id, it.qty - 1)} className="small">
                      -
                    </button>
                    <button onClick={() => updateQty(it.id, it.qty + 1)} className="small">
                      +
                    </button>
                    <button onClick={() => removeItem(it.id)} className="small danger">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty">Your cart is empty.</div>
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            Total: <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="cart-actions">
            <Link to="/menu" className="btn">
              Continue shopping
            </Link>
            <Link to="/order" className="cta-button" onClick={closeCart}>
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
