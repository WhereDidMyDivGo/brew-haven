import "../styles/Home.css";

import Hero from "./Hero";
import SignatureDrinks from "./SignatureDrinks";
import Features from "./Features";
import Gallery from "./Gallery";

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <SignatureDrinks />
      <Features />
      <Gallery />
    </div>
  );
}
