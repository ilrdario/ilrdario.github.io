// Minimal, dependency-free interaction layer.
// No frameworks, no build step — keeps this a drop-in static site.

(function () {
  "use strict";

  /* Mobile nav toggle */
  var nav = document.getElementById("site-nav");
  var toggle = document.getElementById("nav-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Back-to-top button */
  var toTop = document.getElementById("to-top");
  if (toTop) {
    var toggleToTop = function () {
      toTop.classList.toggle("visible", window.scrollY > 700);
    };
    window.addEventListener("scroll", toggleToTop, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    toggleToTop();
  }

  /* Copy email to clipboard */
  var copyBtn = document.getElementById("copy-email");
  var toast = document.getElementById("copy-toast");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.textContent.trim();
      var done = function () {
        if (!toast) return;
        toast.classList.add("show");
        setTimeout(function () { toast.classList.remove("show"); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(function () {
          window.location.href = "mailto:" + email;
        });
      } else {
        window.location.href = "mailto:" + email;
      }
    });
  }

  /* Resume PDF fallback: hide the "not found" note once the iframe loads real content */
  var iframe = document.querySelector(".resume-preview iframe");
  if (iframe) {
    fetch(iframe.getAttribute("src"), { method: "HEAD" })
      .then(function (res) {
        if (!res.ok) throw new Error("missing");
      })
      .catch(function () {
        var fallback = document.querySelector(".resume-fallback");
        if (fallback) fallback.style.display = "flex";
        iframe.style.display = "none";
      });
  }
})();
