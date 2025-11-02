"use strict";

(function () {
  const eventOptions = { passive: true };

  function initUI() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const orderForm = document.getElementById("orderForm");

    if (!navToggle || !navMenu || !orderForm) return;

    function setMenuHidden(hidden) {
      if (hidden) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navMenu.style.transform = "translateX(100%)";
      } else {
        navMenu.classList.add("active");
        navToggle.classList.add("active");
        navMenu.style.transform = "translateX(0)";
      }
    }

    function toggleNav() {
      const isActive = navMenu.classList.contains("active");
      setMenuHidden(isActive);
    }

    function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const email = form.email?.value || "";

      if (!email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }

      alert(`Thank you for your order, ${form.name.value}!\nYour ${form.drink.value} will be ready soon.`);
      form.reset();
    }

    navMenu.addEventListener(
      "click",
      (e) => {
        if (e.target.tagName === "A") {
          const toggleVisible = window.getComputedStyle(navToggle).display !== "none";
          if (toggleVisible) {
            requestAnimationFrame(() => setMenuHidden(true));
          }
        }
      },
      eventOptions
    );

    navToggle.addEventListener("click", toggleNav, eventOptions);
    orderForm.addEventListener("submit", handleSubmit);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUI);
  } else {
    initUI();
  }
})();
