import "../styles/Locations.css";

export default function Locations() {
  return (
    <section className="locations-section">
      <h2>Find Us</h2>
      <div className="locations-grid">
        <div className="location">
          <h3>Rustaveli</h3>
          <p>Rustaveli Ave, Tbilisi</p>
          <p>Open 6AM - 8PM</p>
          <div className="map-frame">
            <iframe title="rustaveli-map" src="https://maps.google.com/maps?q=41.7151,44.8271&z=14&output=embed" style={{ width: "100%", height: 240, border: 0 }} />
          </div>
        </div>

        <div className="location">
          <h3>Vake</h3>
          <p>Vake District, Tbilisi</p>
          <p>Open 7AM - 9PM</p>
          <div className="map-frame">
            <iframe title="vake-map" src="https://maps.google.com/maps?q=41.7189,44.7726&z=14&output=embed" style={{ width: "100%", height: 240, border: 0 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
