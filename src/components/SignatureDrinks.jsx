import "../styles/SignatureDrinks.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import { SIGNATURE_DRINKS } from "../context/data";

export default function SignatureDrinks() {
  const [flippedCards, setFlippedCards] = useState({});

  const handleCardFlip = (drinkId) => {
    setFlippedCards((prev) => ({
      ...prev,
      [drinkId]: !prev[drinkId],
    }));
  };

  return (
    <div className="signature-drinks">
      <h2>Signature Drinks</h2>
      <div className="menu-grid">
        {SIGNATURE_DRINKS.map((drink) => (
          <div key={drink.id} className={`card ${flippedCards[drink.id] ? "flipped" : ""} ${["celestial", "azure", "velvet"].includes(drink.id) ? "featured" : ""}`} onClick={() => handleCardFlip(drink.id)}>
            <div className={`card-face card-front ${drink.id}`}>
              <h3>{drink.name}</h3>
              <div className="price">${drink.price.toFixed(2)}</div>
            </div>
            <div className="card-face card-back">
              <p className="description">{drink.description}</p>
              <div className="ingredients">
                <strong>Ingredients:</strong> {drink.ingredients}
              </div>
              <div className="serving">{drink.serving}</div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/menu" className="btn">
        View Menu
      </Link>
    </div>
  );
}
