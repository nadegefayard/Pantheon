// Maison Panthéon · interactions
// Motion motivée : reveal au scroll (IntersectionObserver), menu mobile,
// filtre du catalogue de location, accusé d'envoi du formulaire.

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Reveal au scroll ---- */
  var revealables = document.querySelectorAll("[data-reveal]");
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- Menu mobile ---- */
  var burger = document.querySelector(".nav__burger");
  var menu = document.getElementById("menu-mobile");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      burger.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
      menu.hidden = open;
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        burger.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      });
    });
  }

  /* ---- Filtre du catalogue de location ---- */
  var filters = document.querySelectorAll(".filter");
  var produits = document.querySelectorAll(".produit");
  if (filters.length && produits.length) {
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-filter");
        filters.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
        produits.forEach(function (p) {
          p.hidden = !(cat === "all" || p.getAttribute("data-cat") === cat);
        });
      });
    });
  }

  /* ---- Formulaire (démo front, sans backend) ---- */
  var form = document.querySelector(".form");
  if (form) {
    var note = form.querySelector(".form__note");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nom = form.querySelector('[name="nom"]');
      var email = form.querySelector('[name="email"]');
      if (!nom.value.trim() || !email.value.trim()) {
        note.textContent = "Merci de renseigner votre nom et votre courriel.";
        return;
      }
      note.textContent = "Merci ! Votre demande est bien reçue, nous revenons vers vous rapidement.";
      form.reset();
    });
  }
})();
