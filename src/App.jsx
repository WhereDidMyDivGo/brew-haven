import "./App.css";
import "./styles/Animations.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import ScrollToTop from "./hooks/ScrollToTop";
import { useStableBars } from "./hooks/useStableBars";

import Header from "./components/Header";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Locations from "./components/Locations";
import Order from "./components/Order";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

function App() {
  useStableBars();
  
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/order" element={<Order />} />
        </Routes>
        <Cart />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
