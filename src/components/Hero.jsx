import "../styles/Hero.css";

import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const LS_KEY = "catMeowCount";
const MS_KEY = "catMilestones";

export default function Hero() {
  const ref = useRef(null);
  const catRef = useRef(null);
  const counterWrapRef = useRef(null);
  const counterTextRef = useRef(null);
  const achieveRef = useRef(null);
  const countRef = useRef(0);
  const hideCounterTimer = useRef(null);
  const achieveTimer = useRef(null);
  const milestonesRef = useRef(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const saved = raw ? parseInt(raw, 10) : 0;
      countRef.current = Number.isFinite(saved) ? saved : 0;
      const m = JSON.parse(localStorage.getItem(MS_KEY) || "[]");
      milestonesRef.current = new Set(Array.isArray(m) ? m : []);
      counterTextRef.current.textContent = `Meows: ${countRef.current}`;
      if (countRef.current > 0) counterWrapRef.current.classList.add("visible");
    } catch {}
  }, []);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
  };

  const showCounter = () => {
    const wrap = counterWrapRef.current;
    if (!wrap.classList.contains("visible")) return;
    wrap.classList.add("show");
    clearTimeout(hideCounterTimer.current);
    hideCounterTimer.current = setTimeout(() => {
      wrap.classList.remove("show");
    }, 3000);
  };

  const hitOnce = (key, fn) => {
    if (milestonesRef.current.has(key)) return;
    milestonesRef.current.add(key);
    try {
      localStorage.setItem(MS_KEY, JSON.stringify([...milestonesRef.current]));
    } catch {}
    fn();
  };

  const click = (e) => {
    const cat = catRef.current;
    if (!cat) return;
    const c = cat.getBoundingClientRect();
    const hit = e.clientX >= c.left && e.clientX <= c.right && e.clientY >= c.top && e.clientY <= c.bottom;
    if (!hit) return;

    countRef.current += 1;
    try {
      localStorage.setItem(LS_KEY, String(countRef.current));
    } catch {}
    counterTextRef.current.textContent = `Meows: ${countRef.current}`;
    if (countRef.current === 1) counterWrapRef.current.classList.add("visible");
    showCounter();

    const n = countRef.current;
    if (n === 1) hitOnce("found", () => showAchievement("You found the cat 🐈"));
    if (n === 15) hitOnce("stop", () => showAchievement("Stop petting me."));
    if (n === 100) hitOnce("void", () => showAchievement("Keep going, maybe the universe will notice."));
    if (n === 200) hitOnce("wild", () => showAchievement("Still going? That’s wild 💀"));

    const heroRect = ref.current.getBoundingClientRect();
    const cx = c.left + c.width / 2 - heroRect.left;
    const cy = c.top - 8 - heroRect.top;
    const el = document.createElement("span");
    el.className = "meow-pop";
    el.textContent = "+1 MEOW ";
    el.style.left = `${cx}px`;
    el.style.top = `${cy}px`;
    ref.current.appendChild(el);
    el.addEventListener("animationend", () => el.remove(), { once: true });
  };

  const showAchievement = (text) => {
    const el = achieveRef.current;
    el.innerHTML = `
      <span class="ach-ico">🏆</span>
      <span class="ach-text">
        <span class="ach-title">ACHIEVEMENT UNLOCKED</span>
        <span class="ach-sub">${text}</span>
      </span>
    `;
    el.classList.add("show");
    clearTimeout(achieveTimer.current);
    achieveTimer.current = setTimeout(() => {
      el.classList.remove("show");
    }, 5000);
  };

  const resetCount = (e) => {
    e.stopPropagation();
    countRef.current = 0;
    milestonesRef.current = new Set();
    counterTextRef.current.textContent = `Meows: 0`;
    try {
      localStorage.removeItem(LS_KEY);
      localStorage.removeItem(MS_KEY);
    } catch {}
    const wrap = counterWrapRef.current;
    wrap.classList.remove("show");
    wrap.classList.remove("visible");
    clearTimeout(hideCounterTimer.current);
  };

  return (
    <div className="hero" ref={ref} onMouseMove={move} onClick={click}>
      <div className="reveal">
        <span className="easter-cat" ref={catRef} aria-hidden="true">
          🐈
        </span>
      </div>

      <div className="hud">
        <div className="cat-counter-wrap" ref={counterWrapRef} onMouseEnter={showCounter} onMouseLeave={showCounter}>
          <div className="cat-counter">
            <span ref={counterTextRef}>Meows: 0</span>
          </div>
          <button className="reset-btn" onClick={resetCount}>
            Reset
          </button>
        </div>
        <div className="cat-achievement" ref={achieveRef}></div>
      </div>

      <div className="hero-content">
        <h1>Brew Haven</h1>
        <p>Every cup tells a story</p>
        <Link to="/menu" className="cta-button">
          View Menu
        </Link>
      </div>
    </div>
  );
}
