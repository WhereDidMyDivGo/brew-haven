import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Locations from "./components/Locations";
import Order from "./components/Order";
import CartDrawer from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
        <CartDrawer />
        <footer>
          <div className="footer-content">
            <p>&copy; 2025 Brew Haven</p>
            <div className="footer-links">
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </footer>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
