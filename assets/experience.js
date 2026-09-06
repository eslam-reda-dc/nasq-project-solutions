(() => {
  const key = "nasq_language";
  const eventKey = "nasq_local_events";
  const globalCoverage = {
    en: "Global remote support",
    ar: "دعم عالمي عن بُعد"
  };
  let ar = localStorage.getItem(key) === "ar";

  function normalizeSitewideContent() {
    document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
      if (el.dataset.en === "Egypt & Saudi Arabia" || el.dataset.ar === "مصر والسعودية") {
        el.dataset.en = globalCoverage.en;
        el.dataset.ar = globalCoverage.ar;
      }
    });

    document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
      link.href = link.href.replace(/wa\.me\/\d+/, "wa.me/201091131666");
    });
  }

  function apply() {
    normalizeSitewideContent();
    document.documentElement.lang = ar ? "ar" : "en";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    document.querySelectorAll("[data-en][data-ar]").forEach((el) => {
      el.textContent = ar ? el.dataset.ar : el.dataset.en;
    });
    document.querySelectorAll(".lang").forEach((el) => {
      el.textContent = ar ? "EN" : "عربي";
    });
    localStorage.setItem(key, ar ? "ar" : "en");
  }

  document.querySelectorAll(".lang").forEach((el) => {
    el.addEventListener("click", () => {
      ar = !ar;
      apply();
    });
  });

  window.nasqTrack = (event, details = {}) => {
    try {
      const items = JSON.parse(localStorage.getItem(eventKey) || "[]");
      items.push({ event, path: location.pathname, time: new Date().toISOString(), ...details });
      localStorage.setItem(eventKey, JSON.stringify(items.slice(-100)));
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...details });
    } catch (e) {}
  };

  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => window.nasqTrack(el.dataset.track, { label: el.dataset.label || el.textContent.trim() }));
  });

  apply();
})();
