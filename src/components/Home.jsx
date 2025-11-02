import "../styles/Home.css";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Brew Haven</h1>
          <p>Where every cup tells a story</p>
          <Link to="/menu" className="cta-button">
            View Menu
          </Link>
        </div>
      </section>

      <section className="hero-slider">
        <div className="slides">
          <div className="slide" style={{ backgroundImage: `url(https://fivesenses.com.au/cdn/shop/articles/8N4A2500edited-e1463638661136_2400x.jpg?v=1655344191)` }} />
          <div className="slide" style={{ backgroundImage: `url(https://tchibo.us/cdn/shop/articles/aromastoffe_cc487fb2-9a9b-4947-a1e7-8266c54c8bb1.jpg?v=1689780401&width=2048)` }} />
          <div className="slide" style={{ backgroundImage: `url(https://cdn.shopify.com/s/files/1/0578/3420/9434/files/Blog-Images-8.png?v=1635860462)` }} />
          <div className="slide" style={{ backgroundImage: `url(https://res.cloudinary.com/gagan/image/upload/v1594103861/hxg40qa8gzqk6lsvvkcs.jpg)` }} />
        </div>
        <div className="slider-caption">
          <h2>Fresh beans — crafted with care</h2>
          <p>Handpicked roasts, seasonal specials, and cozy vibes.</p>
        </div>
      </section>

      <section className="menu-section">
        <h2>Our Signature Drinks</h2>
        <div className="menu-grid">
          <div className="menu-item">
            <h3>Caramel Dream</h3>
            <p className="price">$4.99</p>
          </div>
          <div className="menu-item">
            <h3>Dark Roast</h3>
            <p className="price">$3.99</p>
          </div>
          <div className="menu-item">
            <h3>Vanilla Latte</h3>
            <p className="price">$4.49</p>
          </div>
          <div className="menu-item">
            <h3>Mocha Blast</h3>
            <p className="price">$5.49</p>
          </div>
        </div>
        <div className="home-features">
          <article className="feature">
            <div className="feature-label">Seasonal Roasts</div>
            <p>Discover our expertly curated selection of single-origin coffees, changing monthly to bring you the finest beans from around the world. Each roast is carefully selected at peak harvest and roasted to perfection to showcase its unique flavor profile.</p>
          </article>
          <article className="feature">
            <div className="feature-label">Fresh Bakes</div>
            <p>Start your day with our freshly baked artisanal pastries and breads, prepared daily in our in-house bakery. From buttery croissants to wholesome sourdough, each item is crafted with premium ingredients and traditional techniques.</p>
          </article>
          <article className="feature">
            <div className="feature-label">Community</div>
            <p>Join our vibrant coffee community where passion meets expertise. We host weekly tastings, brewing workshops, and local events that bring together coffee enthusiasts. Learn, share, and grow with fellow coffee lovers in a welcoming space.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
