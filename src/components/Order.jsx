import "../styles/Order.css";

import { useState } from "react";
import * as yup from "yup";

import { useCart } from "../context/CartContext";

const schema = yup.object({
  name: yup.string().trim().min(2).max(60).required(),
  email: yup.string().trim().email().required(),
  note: yup.string().max(500),
});

export default function Order() {
  const { items, total, clearCart, updateQty, removeItem } = useCart();
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [errors, setErrors] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setErrors({});
      await schema.validate(form, { abortEarly: false });
      setConfirmed(true);
      clearCart();
    } catch (err) {
      const map = {};
      if (err.inner?.length) err.inner.forEach((x) => (map[x.path] = x.message));
      else if (err.path) map[err.path] = err.message;
      setErrors(map);
    }
  }

  if (confirmed) {
    return (
      <section className="order-section">
        <h2>Order Confirmed</h2>
        <div className="order-confirm">
          <p>Thank you, {form.name}! Your order has been received.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="order-section">
      <h2>Order Online</h2>

      <div className="order-grid">
        <div className="order-card">
          <h3>Your Items</h3>

          {items.length ? (
            <ul className="order-items">
              {items.map((it) => (
                <li key={it.id} className="order-item">
                  <div className="order-item-name">{it.name}</div>
                  <div className="order-item-meta">
                    {it.qty} × ${it.price.toFixed(2)}
                  </div>

                  <div className="order-item-actions">
                    <button type="button" className="small" aria-label={`Decrease ${it.name}`} disabled={it.qty <= 1} onClick={() => updateQty(it.id, it.qty - 1)}>
                      −
                    </button>
                    <button type="button" className="small" aria-label={`Increase ${it.name}`} onClick={() => updateQty(it.id, it.qty + 1)}>
                      +
                    </button>
                    <button type="button" className="small danger" aria-label={`Remove ${it.name}`} onClick={() => removeItem(it.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">Your cart is empty. Add items from the menu.</p>
          )}

          <div className="order-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>

        <form className="order-card order-form" onSubmit={handleSubmit} noValidate>
          <h3>Details</h3>

          <div className={`form-group ${errors.name ? "has-error" : ""}`}>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" aria-invalid={!!errors.name} aria-describedby="err-name" required />
            {errors.name && (
              <div id="err-name" className="field-error">
                {errors.name}
              </div>
            )}
          </div>

          <div className={`form-group ${errors.email ? "has-error" : ""}`}>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" aria-invalid={!!errors.email} aria-describedby="err-email" required />
            {errors.email && (
              <div id="err-email" className="field-error">
                {errors.email}
              </div>
            )}
          </div>

          <div className={`form-group ${errors.note ? "has-error" : ""}`}>
            <textarea name="note" value={form.note} onChange={handleChange} placeholder="Delivery notes (optional)" rows={4} aria-invalid={!!errors.note} aria-describedby="err-note" />
            {errors.note && (
              <div id="err-note" className="field-error">
                {errors.note}
              </div>
            )}
          </div>

          <button type="submit" className="submit-button">
            Confirm Order
          </button>
        </form>
      </div>
    </section>
  );
}
