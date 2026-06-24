// Maison Panthéon · interactions
// Motion motivée : reveal au scroll (IntersectionObserver), menu mobile,
// filtre du catalogue de location, accusé d'envoi du formulaire.

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Intro : ouverture de portes ---- */
  var intro = document.getElementById("door-intro");
  if (intro) {
    if (reduced) {
      intro.remove();
    } else {
      var seal = intro.querySelector(".door-intro__seal");
      var mark = document.querySelector(".footer__brand .logo--mark") || document.querySelector(".logo--mark");
      if (seal && mark) {
        var clone = mark.cloneNode(true);
        clone.removeAttribute("width");
        clone.removeAttribute("height");
        clone.classList.add("logo--light");
        seal.appendChild(clone);
      }
      var root = document.documentElement;
      root.classList.add("is-door-closed");
      var finish = function () {
        intro.classList.add("is-done");
        root.classList.remove("is-door-closed");
      };
      intro.addEventListener("animationend", function (e) {
        if (e.animationName === "introOut") finish();
      });
      window.setTimeout(finish, 3400);
    }
  }

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

  /* ---- Menu déroulant "Nos Univers" ---- */
  var dropItem = document.querySelector(".nav__item--menu");
  if (dropItem) {
    var topLink = dropItem.querySelector(".nav__toplink");
    var setExpanded = function (state) {
      if (topLink) topLink.setAttribute("aria-expanded", String(state));
    };
    dropItem.addEventListener("mouseenter", function () { setExpanded(true); });
    dropItem.addEventListener("mouseleave", function () { setExpanded(false); });
    dropItem.addEventListener("focusin", function () { setExpanded(true); });
    dropItem.addEventListener("focusout", function (e) {
      if (!dropItem.contains(e.relatedTarget)) setExpanded(false);
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

  /* ---- Recherche d'articles ---- */
  var searchInputs = document.querySelectorAll(".nav__search-input");
  var emptyMsg = document.querySelector(".catalogue__empty");
  var location = document.getElementById("location");
  function normalize(s) {
    return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function applySearch(term) {
    var q = normalize(term).trim();
    if (!q) {
      // recherche vide : on rend la main au filtre par catégorie actif
      var active = document.querySelector(".filter.is-active");
      var cat = active ? active.getAttribute("data-filter") : "all";
      produits.forEach(function (p) {
        p.hidden = !(cat === "all" || p.getAttribute("data-cat") === cat);
      });
      if (emptyMsg) emptyMsg.hidden = true;
      return;
    }
    var visible = 0;
    produits.forEach(function (p) {
      var title = p.querySelector("h3");
      var match = normalize(title ? title.textContent : "").indexOf(q) !== -1;
      p.hidden = !match;
      if (match) visible++;
    });
    if (emptyMsg) emptyMsg.hidden = visible !== 0;
  }
  /* loupe repliable (barre du haut) */
  var searchToggle = document.querySelector(".nav__inner .nav__search-toggle");
  if (searchToggle) {
    var searchForm = searchToggle.closest(".nav__search");
    var searchField = searchForm.querySelector(".nav__search-input");
    var openSearch = function () {
      searchForm.classList.add("is-open");
      searchToggle.setAttribute("aria-expanded", "true");
      searchToggle.setAttribute("aria-label", "Fermer la recherche");
      searchField.focus();
    };
    var closeSearch = function () {
      searchForm.classList.remove("is-open");
      searchToggle.setAttribute("aria-expanded", "false");
      searchToggle.setAttribute("aria-label", "Ouvrir la recherche");
    };
    searchToggle.addEventListener("click", function () {
      if (searchForm.classList.contains("is-open")) {
        if (searchField.value.trim()) { searchField.value = ""; searchField.dispatchEvent(new Event("input")); }
        closeSearch();
      } else {
        openSearch();
      }
    });
    searchField.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { searchField.value = ""; searchField.dispatchEvent(new Event("input")); closeSearch(); searchToggle.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (searchForm.classList.contains("is-open") && !searchForm.contains(e.target) && !searchField.value.trim()) {
        closeSearch();
      }
    });
  }

  if (searchInputs.length && produits.length) {
    searchInputs.forEach(function (input) {
      var hadTerm = false;
      input.addEventListener("input", function () {
        var term = input.value;
        // synchronise les autres champs de recherche
        searchInputs.forEach(function (other) {
          if (other !== input) other.value = term;
        });
        applySearch(term);
        // amène le catalogue à l'écran au premier caractère saisi
        var hasTerm = term.trim().length > 0;
        if (hasTerm && !hadTerm && location) {
          location.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        }
        hadTerm = hasTerm;
      });
      input.closest("form").addEventListener("submit", function (e) {
        e.preventDefault();
        if (location) location.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
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
