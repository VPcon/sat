(function () {
  "use strict";

  /* -------------------- Sticky nav on scroll -------------------- */
  const nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 20) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------------------- Reveal on scroll -------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 40, 240) + "ms";
    io.observe(el);
  });

  /* -------------------- Case lightbox -------------------- */
  const CASE_DETAILS = {
    taskflow: {
      url: "taskflow-ai.app",
      title: "TaskFlow AI — управление проектами",
      img: "assets/case-taskflow.png",
      tags: ["Веб-приложение", "Desktop · Electron", "AI-помощник"],
      body: `Полноценное приложение для команд: канбан-доска с перетаскиванием задач между статусами,
        дашборд с живым пересчётом прогресса по каждому проекту, командная палитра (⌘K) для быстрой навигации
        и встроенный AI-помощник, который разбирает запрос и предлагает план, структуру страницы или черновик текста.
        Все данные сохраняются между запусками — это рабочий инструмент, а не статичный макет.`,
      link: null
    },
    cafe: {
      url: "zerno-coffee.ru",
      title: "Кофейня «Зерно» — лендинг",
      img: "assets/case-cafe.png",
      tags: ["Лендинг", "Бронирование"],
      body: `Одностраничный сайт с акцентом на одно целевое действие — бронь стола. Тёплая, не агрессивная
        палитра под атмосферу кофейни, меню оформлено как отдельный блок с ценами, в подвале страницы — повторный
        призыв к действию для тех, кто долистал до конца, но ещё не решился.`,
      link: "mockups/cafe-landing.html"
    },
    shop: {
      url: "shoprun.store",
      title: "ShopRun — интернет-магазин обуви",
      img: "assets/case-shop.png",
      tags: ["Интернет-магазин", "Каталог + корзина"],
      body: `Каталог с фильтрами по типу обуви, карточки товаров с быстрым добавлением в корзину прямо со списка
        (без перехода на отдельную страницу товара), блок доверия с условиями доставки и возврата — снимает
        типичные возражения перед покупкой.`,
      link: "mockups/shop.html"
    },
    lawyer: {
      url: "gromov-law.ru",
      title: "Громов & партнёры — сайт-визитка",
      img: "assets/case-lawyer.png",
      tags: ["Сайт-визитка", "Личный бренд"],
      body: `Имиджевый сайт для адвоката: тёмная премиальная палитра, акцент на цифры и факты (230+ выигранных дел,
        16 лет практики) вместо ярких визуальных эффектов — в этой нише доверие строится на репутации, а не на дизайне.`,
      link: "mockups/lawyer.html"
    }
  };

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxBox = document.getElementById("lightbox-box");

  function openCase(key) {
    const c = CASE_DETAILS[key];
    if (!c) return;
    lightboxBox.innerHTML = `
      <div class="browser-chrome">
        <span class="chrome-dot" style="background:#FF6B6B"></span>
        <span class="chrome-dot" style="background:#FFC93C"></span>
        <span class="chrome-dot" style="background:#3ECF8E"></span>
        <span class="chrome-url">${escapeHtml(c.url)}</span>
      </div>
      <img src="${c.img}" style="width:100%;display:block" alt="${escapeHtml(c.title)}">
      <div style="padding:32px 34px 38px">
        <div class="case-tags">${c.tags.map(t => `<span class="case-tag primary">${escapeHtml(t)}</span>`).join("")}</div>
        <h3 style="font-size:24px;margin:14px 0 14px">${escapeHtml(c.title)}</h3>
        <p style="color:var(--muted);line-height:1.7;font-size:15px">${escapeHtml(c.body)}</p>
        ${c.link ? `<a href="${c.link}" target="_blank" class="btn-primary" style="margin-top:22px;display:inline-flex">Открыть полную версию →</a>` : ""}
      </div>
    `;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeCase() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-case]").forEach(card => {
    card.addEventListener("click", () => openCase(card.getAttribute("data-case")));
  });
  document.getElementById("lightbox-close").addEventListener("click", closeCase);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeCase(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCase(); });

})();
