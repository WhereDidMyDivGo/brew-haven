import "../styles/Features.css";

import { useEffect, useRef, useState } from "react";

import { FEATURES } from "../context/data";

export default function Features() {
  const [visibleCount, setVisibleCount] = useState(3);
  const INTERVAL = 10000;

  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth <= 700) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1000) {
        setVisibleCount(2);
      } else if (window.innerWidth <= 1400) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(null);
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const items = [...FEATURES, ...FEATURES.slice(0, visibleCount)];

  useEffect(() => {
    function compute() {
      const vp = viewportRef.current;
      if (!vp) return;
      const gap = parseFloat(getComputedStyle(vp).gap) || 32;
      const width = vp.clientWidth;
      const w = Math.floor((width - gap * (visibleCount - 1)) / visibleCount);
      setItemWidth(w);
    }

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [visibleCount]);

  useEffect(() => {
    const id = setInterval(() => {
      setTransitioning(true);
      setIndex((i) => i + 1);
      setElapsed(0);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const tr = trackRef.current;
    if (!tr || itemWidth == null) return;
    const vp = viewportRef.current;
    const gap = vp ? parseFloat(getComputedStyle(vp).gap) || 32 : 32;
    tr.style.transition = transitioning ? "transform 600ms ease" : "none";
    tr.style.transform = `translateX(${-index * (itemWidth + gap)}px)`;
    if (index >= FEATURES.length && transitioning) {
      const t = setTimeout(() => {
        setTransitioning(false);
        setIndex(0);
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          trackRef.current.style.transform = `translateX(0px)`;
        }
      }, 610);
      return () => clearTimeout(t);
    }
  }, [index, transitioning, itemWidth]);

  useEffect(() => {
    const tick = 100;
    const id = setInterval(() => setElapsed((e) => Math.min(e + tick, INTERVAL)), tick);
    return () => clearInterval(id);
  }, [index]);

  const progress = Math.max(0, 1 - elapsed / INTERVAL);

  useEffect(() => {
    const wrapper = document.querySelector(".home-features");
    if (!wrapper) return;

    let isHovering = false;

    const features = document.querySelectorAll(".feature");
    features.forEach((feature) => {
      const overlay = document.createElement("div");
      overlay.style.position = "absolute";
      overlay.style.inset = "0";
      overlay.style.transition = "opacity 0.5s ease";
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      overlay.className = "gradient-overlay";
      feature.appendChild(overlay);
    });

    function handleMouseEnter() {
      isHovering = true;
    }

    function handleMouseLeave() {
      isHovering = false;
      const overlays = document.querySelectorAll(".gradient-overlay");
      overlays.forEach((overlay) => {
        overlay.style.opacity = "0";
      });
    }

    function handleMouseMove(event) {
      if (!isHovering) return;

      const features = document.querySelectorAll(".feature");
      features.forEach((feature) => {
        const rect = feature.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const overlay = feature.querySelector(".gradient-overlay");
        overlay.style.background = `radial-gradient(1000px circle at ${x}px ${y}px, rgba(87, 33, 0, 0.5), transparent 40%)`;
        overlay.style.opacity = "1";
      });
    }

    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      const overlays = document.querySelectorAll(".gradient-overlay");
      overlays.forEach((overlay) => overlay.remove());
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="home-features carousel">
      <div className="features-viewport" ref={viewportRef}>
        <div className="features-track" ref={trackRef}>
          {items.map((it, i) => (
            <article className="feature" key={i} style={{ width: itemWidth ? `${itemWidth}px` : undefined }}>
              <div className="feature-content">
                <div className="feature-label">{it.title}</div>
                <p className="description">{it.description}</p>
                <div className="line">
                  <div className={"line-fill" + (i === index ? " active" : "")} style={{ width: i === index ? `${progress * 100}%` : "0%" }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
