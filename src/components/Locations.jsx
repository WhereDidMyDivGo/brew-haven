import "../styles/Locations.css";

import { useState } from "react";

export default function Locations() {
  const [mapLoaded, setMapLoaded] = useState({ rustaveli: false, vake: false });

  return (
    <section className="locations-section">
      <h2>Find Us</h2>
      <div className="locations-grid">
        <div className="location">
          <h3>Rustaveli</h3>
          <p>Rustaveli Ave, Tbilisi</p>
          <p>Open 6AM - 8PM</p>
          <div className={`map-frame ${mapLoaded.rustaveli ? "loaded" : "loading"}`}>
            {!mapLoaded.rustaveli && (
              <>
                <div className="loader-overlay" />
                <div className="loader-ring" />
              </>
            )}
            <iframe title="rustaveli-map" src="https://maps.google.com/maps?q=41.7151,44.8271&z=14&output=embed" onLoad={() => setMapLoaded((s) => ({ ...s, rustaveli: true }))} />
          </div>
        </div>

        <div className="location">
          <h3>Vake</h3>
          <p>Vake District, Tbilisi</p>
          <p>Open 7AM - 9PM</p>
          <div className={`map-frame ${mapLoaded.vake ? "loaded" : "loading"}`}>
            {!mapLoaded.vake && (
              <>
                <div className="loader-overlay" />
                <div className="loader-ring" />
              </>
            )}
            <iframe title="vake-map" src="https://maps.google.com/maps?q=41.7189,44.7726&z=14&output=embed" onLoad={() => setMapLoaded((s) => ({ ...s, vake: true }))} />
          </div>
        </div>
      </div>
    </section>
  );
}
