import "../styles/Order.css";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Order() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [confirmed, setConfirmed] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    setConfirmed(true);
    clearCart();
  }

  if (confirmed) {
    return (
      <section className="order-section">
        <h2>Order Confirmed</h2>
        <p>Thank you, {form.name || "guest"}! Your order has been received.</p>
      </section>
    );
  }

  return (
    <section className="order-section">
      <h2>Order Online</h2>
      <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "left" }}>
        <h3>Your Items</h3>
        {items.length ? (
          <ul className="order-items">
            {items.map((it) => (
              <li key={it.id} className="order-item">
                <div className="order-item-name">{it.name}</div>
                <div className="order-item-meta">
                  {it.qty} × ${it.price.toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty. Add items from the menu.</p>
        )}

        <h3>Total: ${total.toFixed(2)}</h3>

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea name="note" value={form.note} onChange={handleChange} placeholder="Delivery notes (optional)" rows={3} />
          </div>
          <button type="submit" className="submit-button">
            Confirm Order
          </button>
        </form>
      </div>
    </section>
  );
}
