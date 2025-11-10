import "../styles/Header.css";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { items, toggleCart, isOpen } = useCart();
  const count = items.reduce((s, it) => s + it.qty, 0);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (open && menuRef.current && !menuRef.current.contains(e.target) && !toggleRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", closeOnClickOutside);
    return () => document.removeEventListener("click", closeOnClickOutside);
  }, [open]);

  return (
    <>
      <header>
        <div className="header-content">
          <Link to="/" className="logo">
            Brew Haven
          </Link>

          <nav className="nav-inline">
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/locations">Locations</Link>
            <Link to="/order">Order</Link>
            <button className="cart-button" onClick={() => toggleCart()} aria-haspopup="dialog" aria-expanded={isOpen}>
              <span aria-hidden="true">🛒</span>
              <span className="cart-label">Cart</span>
              <span className="cart-count" aria-hidden="true">
                {count}
              </span>
            </button>
          </nav>

          <button ref={toggleRef} className={`nav-toggle ${open ? "active" : ""}`} onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <nav ref={menuRef} className={`nav-menu ${open ? "active" : ""}`} onClick={() => setOpen(false)}>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/locations">Locations</Link>
        <Link to="/order">Order</Link>
        <button className="cart-button" onClick={() => toggleCart()} aria-haspopup="dialog" aria-expanded={isOpen}>
          <span aria-hidden="true">🛒</span>
          <span className="cart-label">Cart</span>
          <span className="cart-count" aria-hidden="true">
            {count}
          </span>
        </button>
      </nav>
    </>
  );
}
