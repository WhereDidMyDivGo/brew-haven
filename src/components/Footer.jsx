import "../styles/Footer.css";

import { useEffect, useState } from "react";

export default function Footer() {
  const [modal, setModal] = useState(null);
  const [phase, setPhase] = useState("idle");

  const open = (key) => {
    setModal(key);
    setPhase("open");
  };

  const close = () => {
    setPhase("closing");
    setTimeout(() => {
      setModal(null);
      setPhase("idle");
    }, 220);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && modal) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  return (
    <footer>
      <div className="footer-content">
        <p>&copy; 2025 Brew Haven</p>
        <div className="footer-links">
          <a role="button" tabIndex={0} onClick={() => open("about")} onKeyDown={(e) => e.key === "Enter" && open("about")}>
            About Us
          </a>
          <a role="button" tabIndex={0} onClick={() => open("careers")} onKeyDown={(e) => e.key === "Enter" && open("careers")}>
            Careers
          </a>
          <a role="button" tabIndex={0} onClick={() => open("contact")} onKeyDown={(e) => e.key === "Enter" && open("contact")}>
            Contact
          </a>
        </div>
      </div>

      {modal && (
        <div className={`footer-modal ${phase}`} onClick={close} aria-modal="true" role="dialog">
          <div className="modal-body" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={close}>
              ×
            </button>

            {modal === "about" && (
              <>
                <h3>About Us</h3>
                <p>Brew Haven was built as a university project exploring modern front-end design, animation, and responsive UI. It’s a creative concept made to blend design with code perfection.</p>
              </>
            )}

            {modal === "careers" && (
              <>
                <h3>Careers</h3>
                <p>We’re not hiring — this is a student showcase. Each role here represents collaboration, creativity, and technical skill.</p>
              </>
            )}

            {modal === "contact" && (
              <>
                <h3>Contact</h3>
                <p>
                  For questions or feedback, reach out at{" "}
                  <a href="mailto:brewhaven.project@email.com" target="_blank" rel="noopener noreferrer">
                    brewhaven.project@email.com
                  </a>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
