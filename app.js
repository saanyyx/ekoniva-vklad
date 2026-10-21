(() => {
  "use strict";

  const CAN_POINTS = 3; // базовая ставка — 1 банка = 3 балла
  const STREAK_BONUS_WEEKS = 2; // от скольки недель подряд активируется бонус
  const STREAK_BONUS_POINTS = 4; // ставка при активном стрике
  function canRate() {
    return state.streakWeeks >= STREAK_BONUS_WEEKS ? STREAK_BONUS_POINTS : CAN_POINTS;
  }

  const CATEGORIES = [
    { id: "milk", name: "Молоко" },
    { id: "curd", name: "Творог и сметана" },
    { id: "yogurt", name: "Йогурты" },
    { id: "butter", name: "Масло" },
    { id: "cheese", name: "Сыры" },
    { id: "icecream", name: "Мороженое" },
    { id: "zoj", name: "ЗОЖ" },
  ];

  // image: реальное фото с ekoniva-moloko.com (см. scrape_images.py) — есть у каждого товара
  const PRODUCTS = [
    { id: "milk32", category: "milk", name: "Молоко «ЭкоНива» 3.2%", price: 79, image: "images/milk/milk32.jpg",
      desc: "Классическое пастеризованное молоко из молока собственных ферм ЭкоНивы.",
      specs: { Объём: "930 мл", Жирность: "3.2%", Калорийность: "60 ккал" } },
    { id: "milk25", category: "milk", name: "Молоко «ЭкоНива» 2.5%", price: 75, image: "images/milk/milk25.jpg",
      desc: "Лёгкое ультрапастеризованное молоко, привычный вкус с детства.",
      specs: { Объём: "930 мл", Жирность: "2.5%", Калорийность: "52 ккал" } },
    { id: "milkLF", category: "milk", name: "Молоко безлактозное «ЭкоНива»", price: 99, image: "images/milk/milkLF.jpg",
      desc: "Без лактозы, для тех, кому обычное молоко не подходит. Professional Line.",
      specs: { Объём: "930 мл", Жирность: "2.5%", Калорийность: "54 ккал" } },
    { id: "milkBaked", category: "milk", name: "Молоко топлёное «ЭкоНива» 4%", price: 85, image: "images/milk/milkBaked.jpg",
      desc: "Томлёное молоко с мягким карамельным оттенком вкуса.",
      specs: { Объём: "930 мл", Жирность: "4%", Калорийность: "66 ккал" } },

    { id: "curd5", category: "curd", name: "Творог «ЭкоНива» 5%", price: 89, image: "images/curd/curd5.jpg",
      desc: "Зернистый творог классической жирности, источник белка.",
      specs: { Вес: "200 г", Жирность: "5%", Белок: "16 г" } },
    { id: "curd9", category: "curd", name: "Творог «ЭкоНива» 9%", price: 95, image: "images/curd/curd9.jpg",
      desc: "Мягкий творог повышенной жирности.",
      specs: { Вес: "200 г", Жирность: "9%", Белок: "15 г" } },
    { id: "curdBerry", category: "curd", name: "Творожный десерт «ЭкоНива» малина-земляника", price: 109, image: "images/curd/curdBerry.jpg",
      desc: "Нежный творожный десерт с малиной и земляникой, без искусственных красителей.",
      specs: { Вес: "130 г", Жирность: "5%", Калорийность: "104 ккал" } },
    { id: "smetana20", category: "curd", name: "Сметана «ЭкоНива» 20%", price: 109, image: "images/curd/smetana20.jpg",
      desc: "Густая сметана для заправки блюд и выпечки.",
      specs: { Вес: "350 г", Жирность: "20%", Калорийность: "206 ккал" } },

    { id: "yogDrink", category: "yogurt", name: "Йогурт питьевой «ЭкоНива» клубника", price: 119, image: "images/yogurt/yogDrink.jpg",
      desc: "Питьевой йогурт с клубникой, без консервантов.",
      specs: { Объём: "870 мл", Жирность: "2.5%", Калорийность: "78 ккал" } },
    { id: "yogPeach", category: "yogurt", name: "Йогурт питьевой «ЭкоНива» персик", price: 119, image: "images/yogurt/yogPeach.jpg",
      desc: "Питьевой йогурт с персиком, без консервантов.",
      specs: { Объём: "870 мл", Жирность: "2.5%", Калорийность: "77 ккал" } },
    { id: "yogBlueberry", category: "yogurt", name: "Йогурт питьевой «ЭкоНива» черника-малина", price: 119, image: "images/yogurt/yogBlueberry.jpg",
      desc: "Питьевой йогурт с черникой и малиной, без консервантов.",
      specs: { Объём: "870 мл", Жирность: "2.5%", Калорийность: "77 ккал" } },
    { id: "yogNatural", category: "yogurt", name: "Йогурт питьевой «ЭкоНива» натуральный", price: 99, image: "images/yogurt/yogNatural.jpg",
      desc: "Питьевой йогурт без добавок, натуральный вкус.",
      specs: { Объём: "870 мл", Жирность: "2.8%", Калорийность: "70 ккал" } },

    { id: "butter825", category: "butter", name: "Масло сливочное «ЭкоНива» 82.5% 180 г", price: 159, image: "images/butter/butter825.jpg",
      desc: "Традиционное сливочное масло из натуральных сливок.",
      specs: { Вес: "180 г", Жирность: "82.5%", Калорийность: "748 ккал" } },
    { id: "butter825_350", category: "butter", name: "Масло сливочное «ЭкоНива» 82.5% 350 г", price: 289, image: "images/butter/butter825_350.jpg",
      desc: "Традиционное сливочное масло, семейная упаковка.",
      specs: { Вес: "350 г", Жирность: "82.5%", Калорийность: "748 ккал" } },
    { id: "butter725", category: "butter", name: "Масло крестьянское «ЭкоНива» 72.5%", price: 139, image: "images/butter/butter725.jpg",
      desc: "Крестьянское масло пониженной жирности, более лёгкий вкус.",
      specs: { Вес: "180 г", Жирность: "72.5%", Калорийность: "661 ккал" } },

    { id: "cheeseDurr3", category: "cheese", name: "Сыр «Dürr» Classic 3 месяца", price: 229, image: "images/cheese/cheeseDurr3.jpg",
      desc: "Полутвёрдый сыр со слегка пикантным вкусом и пряной нотой, выдержка 3 месяца.",
      specs: { Вес: "125 г", Жирность: "50%", Выдержка: "3 месяца" } },
    { id: "cheeseDurr6", category: "cheese", name: "Сыр «Dürr» Classic 6 месяцев", price: 269, image: "images/cheese/cheeseDurr6.jpg",
      desc: "Твёрдый сыр долгой выдержки, более выраженный вкус.",
      specs: { Вес: "125 г", Жирность: "50%", Выдержка: "6 месяцев" } },
    { id: "cheeseKolybelsky", category: "cheese", name: "Сыр полутвёрдый «Колыбельский»", price: 219, image: "images/cheese/cheeseKolybelsky.jpg",
      desc: "Полутвёрдый сыр с мягким сливочным вкусом.",
      specs: { Вес: "125 г", Жирность: "45%", Белок: "24 г" } },
    { id: "cheeseShchuchansky", category: "cheese", name: "Сыр полутвёрдый «Щучанский»", price: 219, image: "images/cheese/cheeseShchuchansky.jpg",
      desc: "Полутвёрдый сыр классического производства.",
      specs: { Вес: "125 г", Жирность: "50%", Белок: "25 г" } },

    { id: "icePlombir", category: "icecream", name: "Мороженое «ЭкоНива» ванильное", price: 179, image: "images/icecream/icePlombir.jpg",
      desc: "Настоящий пломбир с ванильным вкусом по классическому рецепту.",
      specs: { Вес: "80 г", Жирность: "15%", Калорийность: "223 ккал" } },
    { id: "iceChoco", category: "icecream", name: "Мороженое «ЭкоНива» шоколадное", price: 179, image: "images/icecream/iceChoco.jpg",
      desc: "Пломбир с добавлением шоколада.",
      specs: { Вес: "80 г", Жирность: "15%", Калорийность: "230 ккал" } },
    { id: "iceCremeBrulee", category: "icecream", name: "Мороженое «ЭкоНива» крем-брюле", price: 179, image: "images/icecream/iceCremeBrulee.jpg",
      desc: "Пломбир со вкусом крем-брюле.",
      specs: { Вес: "80 г", Жирность: "15%", Калорийность: "226 ккал" } },
    { id: "iceBerry", category: "icecream", name: "Мороженое «ЭкоНива» малина-жимолость", price: 179, image: "images/icecream/iceBerry.jpg",
      desc: "Пломбир со вкусом малины и жимолости.",
      specs: { Вес: "80 г", Жирность: "15%", Калорийность: "220 ккал" } },

    { id: "ryazhenka", category: "zoj", name: "Ряженка «ЭкоНива» 4%", price: 85, image: "images/zoj/ryazhenka.jpg",
      desc: "Томлёное молоко с мягким карамельным вкусом.",
      specs: { Объём: "450 мл", Жирность: "4%", Калорийность: "67 ккал" } },
    { id: "kefir1", category: "zoj", name: "Кефир «ЭкоНива» 1%", price: 75, image: "images/zoj/kefir1.jpg",
      desc: "Классический кефир пониженной жирности для ежедневного рациона.",
      specs: { Объём: "930 мл", Жирность: "1%", Калорийность: "38 ккал" } },
    { id: "whey", category: "zoj", name: "Сыворотка «ЭкоНива»", price: 49, image: "images/zoj/whey.jpg",
      desc: "Освежающий молочный напиток из сыворотки.",
      specs: { Объём: "450 мл", Жирность: "0.1%", Калорийность: "23 ккал" } },
    { id: "highFocus", category: "zoj", name: "High Focus «Солёная карамель»", price: 139, image: "images/zoj/highFocus.jpg",
      desc: "Протеиновый молочный напиток линейки High Focus — для перекуса после тренировки.",
      specs: { Объём: "270 мл", Белок: "15 г", Жирность: "2.5%" } },
    { id: "highFocusBrownie", category: "zoj", name: "High Focus «Брауни»", price: 139, image: "images/zoj/highFocusBrownie.jpg",
      desc: "Протеиновый молочный напиток линейки High Focus, вкус шоколадного брауни.",
      specs: { Объём: "270 мл", Белок: "15 г", Жирность: "2.5%" } },
  ];

  // ---------- date / week helpers ----------
  function mondayOf(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const day = (d.getDay() + 6) % 7; // 0 = Monday
    d.setDate(d.getDate() - day);
    return d.getTime();
  }
  function fmtDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
  }

  // ---------- state ----------
  function defaultState() {
    const now = Date.now();
    const thisMonday = mondayOf(now);
    const lastWeekMonday = thisMonday - 7 * 86400000;
    const day = 86400000;
    return {
      balance: 85,
      totalEarned: 552,
      cansRecycled: 184,
      streakWeeks: 6,
      lastRecycleWeek: lastWeekMonday, // "неделя назад" — следующая сдача банок сразу продлит стрик в демо
      theme: "light",
      accountName: "Друг ЭкоНивы",
      history: [
        { type: "redeem", label: "Сыр «Dürr» Classic 3 месяца", points: -229, date: now - 2 * day },
        { type: "earn", label: "Сдано 20 банок", points: 60, date: now - 3 * day },
        { type: "redeem", label: "Масло сливочное «ЭкоНива» 82.5% 180 г", points: -159, date: now - 5 * day },
        { type: "earn", label: "Сдано 20 банок", points: 60, date: now - 6 * day },
        { type: "earn", label: "Сдано 20 банок", points: 60, date: now - 10 * day },
        { type: "redeem", label: "Йогурт питьевой «ЭкоНива» клубника", points: -119, date: now - 11 * day },
        { type: "redeem", label: "Творог «ЭкоНива» 9%", points: -95, date: now - 13 * day },
        { type: "earn", label: "Сдано 20 банок", points: 60, date: now - 17 * day },
        { type: "redeem", label: "Молоко «ЭкоНива» 3.2%", points: -79, date: now - 18 * day },
        { type: "earn", label: "Сдано 20 банок", points: 60, date: now - 24 * day },
      ],
      // purchases — архив УЖЕ полученных товаров (дата = дата получения, не дата обмена баллов)
      purchases: [
        { name: "Сыр «Dürr» Classic 3 месяца", price: 229, image: "images/cheese/cheeseDurr3.jpg", date: now - 2 * day },
        { name: "Масло сливочное «ЭкоНива» 82.5% 180 г", price: 159, image: "images/butter/butter825.jpg", date: now - 5 * day },
        { name: "Йогурт питьевой «ЭкоНива» клубника", price: 119, image: "images/yogurt/yogDrink.jpg", date: now - 11 * day },
        { name: "Творог «ЭкоНива» 9%", price: 95, image: "images/curd/curd9.jpg", date: now - 13 * day },
        { name: "Молоко «ЭкоНива» 3.2%", price: 79, image: "images/milk/milk32.jpg", date: now - 18 * day },
      ],
      // pendingPickups — обменяно на баллы, но ещё не получено (вкладка «Покупки» → «Ожидают получения»)
      pendingPickups: [
        {
          id: 1, name: "Творожный десерт «ЭкоНива» малина-земляника", price: 109, image: "images/curd/curdBerry.jpg", date: now - 1 * day,
          promoCodes: genPromoCodes(),
        },
      ],
    };
  }

  // ---------- покупки: демо-партнёры доставки + промокоды ----------
  // логотипов брендов в проекте нет — вместо скрейпа чужих SVG из непроверенных источников для
  // публичного деплоя (риск по качеству и по использованию чужого товарного знака) сделаны
  // аккуратные цветовые плашки в фирменных цветах брендов, see README/чат — попросили заменить
  // на оф. логотипы отдельно, если найдутся подходящие файлы
  const DELIVERY_PARTNERS = [
    { id: "samokat", name: "Самокат", logo: "images/partners/samokat.png" },
    { id: "lavka", name: "Яндекс Лавка", logo: "images/partners/lavka.png" },
    { id: "lenta", name: "Лента", logo: "images/partners/lenta.jpeg" },
    { id: "ozon", name: "Ozon", logo: "images/partners/ozon.jpeg" },
  ];
  function genPromoCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return "ECO-" + s;
  }
  function genPromoCodes() {
    const codes = {};
    DELIVERY_PARTNERS.forEach((p) => (codes[p.id] = genPromoCode()));
    return codes;
  }
  let nextPickupId = 2;

  // прототип всегда стартует с демо-данных заново — persistence не нужен
  let state = defaultState();
  function saveState() {}

  // ---------- navigation ----------
  const nav = { tab: "catalog", overlay: null, productId: null };
  const phoneScreen = document.getElementById("phoneScreen");

  function showNav() {
    document.querySelectorAll(".screen[data-screen]").forEach((el) => {
      const name = el.dataset.screen;
      const isOverlay = el.classList.contains("screen--overlay");
      if (isOverlay) {
        el.classList.toggle("active", nav.overlay === name);
      } else {
        el.classList.toggle("active", !nav.overlay && nav.tab === name);
      }
    });
    document.querySelectorAll(".tab").forEach((btn) => {
      btn.classList.toggle("active", !nav.overlay && btn.dataset.tab === nav.tab);
    });
    phoneScreen.classList.toggle("has-overlay", !!nav.overlay);
  }

  function goTab(tab) {
    nav.tab = tab;
    nav.overlay = null;
    showNav();
    if (tab === "profile") renderProfile();
    if (tab === "home") renderHome();
    if (tab === "purchases") renderPurchases();
  }
  function openOverlay(name, productId) {
    nav.overlay = name;
    nav.productId = productId || null;
    if (name === "product") renderProductDetail(productId);
    if (name === "article") renderArticleDetail(productId);
    if (name === "pickup") renderPickupDetail(productId);
    showNav();
  }
  function closeOverlay() {
    nav.overlay = null;
    showNav();
  }

  document.querySelectorAll(".tab[data-tab]").forEach((btn) => {
    btn.addEventListener("click", () => goTab(btn.dataset.tab));
  });
  document.querySelectorAll("[data-close-overlay]").forEach((btn) => {
    btn.addEventListener("click", closeOverlay);
  });
  document.getElementById("btnSettings").addEventListener("click", () => openOverlay("settings"));

  // ---------- number / balance animation ----------
  function animateNumber(el, to, decimals) {
    decimals = decimals || 0;
    const from = parseFloat((el.textContent || "0").replace(",", ".")) || 0;
    const fmt = (v) => (decimals ? v.toFixed(decimals).replace(".", ",") : String(Math.round(v)));
    if (from === to) {
      el.textContent = fmt(to);
      return;
    }
    const start = performance.now();
    const duration = 500;
    function step(t) {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function bump(el) {
    el.classList.remove("bump");
    void el.offsetWidth; // restart animation
    el.classList.add("bump");
  }

  function renderBalance(animated) {
    const pill = document.getElementById("balancePill");
    const valueEl = document.getElementById("balanceValue");
    const profileEl = document.getElementById("profileBalance");
    if (animated) {
      animateNumber(valueEl, state.balance);
      animateNumber(profileEl, state.balance);
      bump(pill);
    } else {
      valueEl.textContent = state.balance;
      profileEl.textContent = state.balance;
    }
  }

  // ---------- shared stats ----------
  // формула калькулятора команды: демо-банка 330мл = 12.19г, 95% металла восстанавливается при
  // переработке, 7.3111 г CO2-экв. экономится на каждый переработанный грамм алюминия (The Aluminum
  // Association, 98.7/13.5 пересчитано на грамм). Объём банки у пользователя не спрашиваем — банка
  // в демо всегда стандартная.
  const CAN_MASS_G = 12.19;
  const RECYCLE_YIELD = 0.95;
  const CO2_PER_GRAM = 98.7 / 13.5;
  // оценочные коэффициенты для наглядных "реальных эквивалентов" на экране «Эко» — демо-округления,
  // не точная LCA-оценка: ≈120 г CO2-экв./км (средний легковой автомобиль), ≈8.2 г CO2-экв./зарядку
  // смартфона (среднее энергопотребление зарядки × углеродоёмкость сети)
  const CO2_G_PER_CAR_KM = 120;
  const CO2_G_PER_PHONE_CHARGE = 8.2;
  function computeStats() {
    const massKg = (state.cansRecycled * CAN_MASS_G) / 1000;
    const recoveredAlG = state.cansRecycled * CAN_MASS_G * RECYCLE_YIELD;
    const co2Kg = (recoveredAlG * CO2_PER_GRAM) / 1000;
    return { aluminium: massKg, co2: co2Kg };
  }

  // ---------- home: уровень-дерево (10 ступеней) + яркая статистика ----------
  // двойная метафора: рост Листика (1-2) -> путь банки (3-9) -> оба смыкаются в 10 (новый слиток
  // + новый росток разом). Без подписей-пояснений под названием — см. buildLevelTrack
  const LEVELS = [
    { n: 1, name: "Семечко", threshold: 0, icon: "i-seed" },
    { n: 2, name: "Поле", threshold: 40, icon: "i-sprout" },
    { n: 3, name: "Ферма", threshold: 90, icon: "i-cow" },
    { n: 4, name: "Розлив", threshold: 150, icon: "i-bottle" },
    { n: 5, name: "Полка магазина", threshold: 220, icon: "i-shelf" },
    { n: 6, name: "У тебя дома", threshold: 300, icon: "i-cup" },
    { n: 7, name: "Сдача банки", threshold: 390, icon: "i-can" },
    { n: 8, name: "Переработка", threshold: 490, icon: "i-truck" },
    { n: 9, name: "Переплавка", threshold: 600, icon: "i-furnace" },
    { n: 10, name: "Новый цикл", threshold: 720, icon: "i-cycle" },
  ];
  function levelForCans(cans) {
    return [...LEVELS].reverse().find((l) => cans >= l.threshold);
  }

  // маскот растёт от уровня к уровню (0.58x -> 1.55x), рост ускоряется к финалу (степенная кривая,
  // не линейная) — иначе разница между 9 и 10 уровнем визуально теряется. С 8 уровня включается
  // золотое свечение, с 9 — корона, сцена теплеет к золотому линейно на всём пути
  const MASCOT_SCALE_MIN = 0.58;
  const MASCOT_SCALE_MAX = 1.55;
  let mascotLevelProgress = 0; // 0..1 по уровню — та же величина, что красит сцену/свечение; переиспользуется для цвета следа при драге
  function applyMascotLevel(level) {
    const t = (level.n - 1) / (LEVELS.length - 1);
    const eased = Math.pow(t, 1.6);
    mascotLevelProgress = t;
    const mascot = document.getElementById("heroMascot");
    const scene = document.getElementById("heroScene");
    if (mascot) {
      mascot.style.setProperty("--mascot-scale", (MASCOT_SCALE_MIN + eased * (MASCOT_SCALE_MAX - MASCOT_SCALE_MIN)).toFixed(2));
      mascot.style.setProperty("--mascot-glow", Math.max(0, (level.n - 7) / 3).toFixed(2));
      // грязно-серый -> чистый зелёный линейно по t (не eased!) — иначе разница между соседними
      // уровнями в начале/середине шкалы не читается глазом так же, как это уже было с ростом
      mascot.style.setProperty("--mascot-gray", (0.65 * (1 - t)).toFixed(2));
      mascot.style.setProperty("--mascot-sat", (0.55 + t * 0.75).toFixed(2));
      mascot.style.setProperty("--mascot-bright", (0.88 + t * 0.17).toFixed(2));
      // сюжет = форма самого персонажа, без текста: семечко (1) -> тело+лист (2+) ->
      // боковые листья (4+) -> полная крона (7+) -> бутоны/пик цветения (9+) ->
      // один боковой лист облетает насовсем на 10 (цикл замкнулся), дальше без изменений
      mascot.classList.toggle("has-body", level.n >= 2);
      mascot.classList.toggle("has-side-leaves", level.n >= 4);
      mascot.classList.toggle("has-canopy", level.n >= 7);
      mascot.classList.toggle("has-blossoms", level.n >= 9);
      mascot.classList.toggle("leaf-fallen", level.n >= 10);
    }
    if (scene) scene.style.setProperty("--level-progress", t.toFixed(2));
  }

  // цвет следа маскота при драге: грязно-бурый на ранних уровнях -> насыщенный зелёный к финалу,
  // по той же mascotLevelProgress, что красит сцену/свечение — отдельной системы прогресса не заводим
  function mascotTrailColor() {
    const dirty = [124, 103, 76];
    const clean = [84, 184, 0]; // var(--green)
    const rgb = dirty.map((d, i) => Math.round(d + (clean[i] - d) * mascotLevelProgress));
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  function buildLevelTrack() {
    const track = document.getElementById("levelTrack");
    // спейсеры — реальные flex-дети трека, а не padding на .level-track: конечный padding
    // скролл-контейнера ненадёжно учитывается в scrollWidth в части браузеров/движков,
    // из-за чего последняя карточка не докручивалась ровно до центра
    const spacer = `<div class="level-track__spacer"></div>`;
    track.innerHTML = spacer + LEVELS.map((l) => {
      const casNeeded = Math.max(0, l.threshold - state.cansRecycled);
      return `
      <div class="level-card" data-level="${l.n}">
        <div class="level-card__icon"><svg class="icon"><use href="#${l.icon}"/></svg></div>
        <div class="level-card__num">УРОВЕНЬ ${l.n}</div>
        <div class="level-card__hint">${casNeeded > 0 ? `ещё ${casNeeded} банок` : "достигнуто"}</div>
      </div>`;
    }).join("") + spacer;
    track.querySelectorAll(".level-card").forEach((card, i) => {
      card.classList.toggle("unlocked", LEVELS[i].threshold <= state.cansRecycled);
      card.classList.toggle("level-final", LEVELS[i].n === 10);
    });
    updatePathProgress();
    applyMascotLevel(levelForCans(state.cansRecycled));
  }

  // ---------- home: изогнутый путь + грузовик на закрашенной части ----------
  function updatePathProgress() {
    const path = document.getElementById("pathProgress");
    const truck = document.getElementById("heroTruck");
    if (!path || !truck) return;
    const lvl = levelForCans(state.cansRecycled);
    const nextThreshold = LEVELS[lvl.n] ? LEVELS[lvl.n].threshold : lvl.threshold;
    const span = nextThreshold - lvl.threshold;
    const within = span > 0 ? (state.cansRecycled - lvl.threshold) / span : 1;
    const fraction = Math.min(1, ((lvl.n - 1) + within) / (LEVELS.length - 1));
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len * (1 - fraction));
    truck.style.left = `calc(${fraction * 100}% - ${fraction * 20}px)`;
  }

  // .level-track не имеет собственной определённой ширины (это скроллящийся контент), поэтому
  // width:62%/padding:19% на нём резолвятся непредсказуемо (в т.ч. в headless Chrome ловился реальный
  // баг: карточка 10 уровня не центрировалась, хотя была unlocked) — меряем реальную ширину
  // карусели и задаём px-значения через CSS-переменные вместо процентов от неопределённого контейнера
  function sizeLevelCards() {
    const carousel = document.getElementById("levelCarousel");
    if (!carousel) return;
    const w = carousel.clientWidth;
    carousel.style.setProperty("--level-pad", w * 0.19 + "px");
    carousel.style.setProperty("--level-card-w", w * 0.62 + "px");
  }

  function initLevelCarousel() {
    sizeLevelCards();
    buildLevelTrack();
    const carousel = document.getElementById("levelCarousel");
    let ticking = false;
    carousel.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateCenteredCard();
        ticking = false;
      });
    });
    requestAnimationFrame(() => scrollToLevel(levelForCans(state.cansRecycled).n, true));
  }

  function updateCenteredCard() {
    const carousel = document.getElementById("levelCarousel");
    const cards = [...document.querySelectorAll(".level-card")];
    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    let closest = cards[0];
    let min = Infinity;
    cards.forEach((card) => {
      const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (d < min) {
        min = d;
        closest = card;
      }
    });
    cards.forEach((c) => c.classList.toggle("centered", c === closest));
    const n = +closest.dataset.level;
    const isCurrent = n === levelForCans(state.cansRecycled).n;
    document.getElementById("levelCaption").textContent = `Уровень ${n} из 10${isCurrent ? " (текущий)" : ""}`;
  }

  function scrollToLevel(n, instant) {
    const carousel = document.getElementById("levelCarousel");
    const card = carousel.querySelector(`.level-card[data-level="${n}"]`);
    if (!card) return;
    const target = card.offsetLeft + card.offsetWidth / 2 - carousel.clientWidth / 2;
    carousel.scrollTo({ left: target, behavior: instant ? "auto" : "smooth" });
  }

  function renderHome() {
    const { aluminium, co2 } = computeStats();
    animateNumber(document.getElementById("homeStatAluminium"), aluminium, 2);
    animateNumber(document.getElementById("homeStatCO2"), co2, 1);
    document.getElementById("streakWeeks").textContent = state.streakWeeks;
    const co2G = co2 * 1000;
    document.getElementById("ecoEquivCar").textContent = Math.round(co2G / CO2_G_PER_CAR_KM);
    document.getElementById("ecoEquivPhone").textContent = Math.round(co2G / CO2_G_PER_PHONE_CHARGE);
  }

  function showLevelUpPopup(level) {
    document.querySelector("#levelUpIcon use").setAttribute("href", "#" + level.icon);
    document.getElementById("levelUpName").textContent = `Уровень ${level.n}`;
    const popup = document.getElementById("levelUpPopup");
    popup.classList.add("show");
    launchConfetti();
    celebrateMascot(level);
    setTimeout(() => popup.classList.remove("show"), 1800);
  }

  // прыжок + разлёт листьев на каждом переходе уровня; на 10 уровне просто ярче финал, без сброса сцены
  function celebrateMascot(level) {
    const mascot = document.getElementById("heroMascot");
    const host = document.getElementById("heroParticles");
    if (!mascot || !host) return;
    mascot.classList.remove("level-up-bounce");
    void mascot.offsetWidth;
    mascot.classList.add("level-up-bounce");
    mascot.addEventListener("animationend", () => mascot.classList.remove("level-up-bounce"), { once: true });

    const isFinal = level.n === LEVELS.length;
    const burstCount = isFinal ? 20 : 12;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount + Math.random() * 0.4;
      const dist = 30 + Math.random() * 30;
      spawnBurstParticle(host, 48 + Math.cos(angle) * 10, 58 + Math.sin(angle) * 10, Math.cos(angle) * dist, Math.sin(angle) * dist);
    }
    if (isFinal) setTimeout(launchConfetti, 350);
  }

  function spawnBurstParticle(host, x, y, dx, dy) {
    const el = document.createElement("div");
    el.className = "burst-particle";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.setProperty("--bx", dx + "px");
    el.style.setProperty("--by", dy + "px");
    el.innerHTML = `<svg><use href="#i-leaf"/></svg>`;
    host.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  // ---------- catalog ----------
  let activeFilter = "all";
  function renderFilters() {
    const el = document.getElementById("filters");
    const chips = [{ id: "all", name: "Все" }, ...CATEGORIES];
    el.innerHTML = chips
      .map((c) => `<button class="chip ${c.id === activeFilter ? "active" : ""}" data-filter="${c.id}">${c.name}</button>`)
      .join("");
    el.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        activeFilter = chip.dataset.filter;
        renderFilters();
        renderCatalog();
      });
    });
  }

  function progressPercent(price) {
    return Math.min(100, Math.round((state.balance / price) * 100));
  }
  function visualHtml(p) {
    return p.image ? `<img src="${p.image}" loading="lazy" alt="${p.name}">` : "📦";
  }

  function renderCatalog() {
    const grid = document.getElementById("productGrid");
    const list = activeFilter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeFilter);
    grid.innerHTML = list
      .map((p) => {
        const pct = progressPercent(p.price);
        return `
        <button class="product-card" data-product="${p.id}">
          <div class="product-card__icon">${visualHtml(p)}</div>
          <div class="product-card__name">${p.name}</div>
          <div class="product-card__price"><svg class="icon"><use href="#i-coin"/></svg>${p.price}</div>
          <div class="progress-track"><div class="progress-fill" data-pct="${pct}"></div></div>
          <div class="product-card__hint">${pct >= 100 ? "Можно обменять!" : pct + "% накоплено"}</div>
        </button>`;
      })
      .join("");
    grid.querySelectorAll(".product-card").forEach((card) => {
      card.addEventListener("click", () => openOverlay("product", card.dataset.product));
    });
    animateFills(grid);
  }

  function animateFills(root) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.querySelectorAll(".progress-fill").forEach((f) => {
          f.style.width = f.dataset.pct + "%";
        });
      });
    });
  }

  // ---------- product detail ----------
  function renderProductDetail(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    document.querySelector('[data-screen="product"] .overlay-title').textContent = p.name;
    const pct = progressPercent(p.price);
    const remaining = Math.max(0, p.price - state.balance);
    const cansLeft = Math.ceil(remaining / canRate());
    const specsHtml = Object.entries(p.specs)
      .map(([k, v]) => `<div class="spec"><span class="spec__value">${v}</span><span class="spec__label">${k}</span></div>`)
      .join("");
    document.getElementById("productDetail").innerHTML = `
      <div class="product-detail__icon">${visualHtml(p)}</div>
      <h2 class="product-detail__name">${p.name}</h2>
      <div class="spec-row">${specsHtml}</div>
      <div class="detail-progress">
        <div class="detail-progress__row"><span>Накоплено</span><span>${state.balance} / ${p.price} баллов</span></div>
        <div class="progress-track"><div class="progress-fill" data-pct="${pct}"></div></div>
        <div class="detail-progress__cans">${
          cansLeft > 0
            ? `Сдайте ещё ≈ <b>${cansLeft} банок</b> (по ${canRate()} балла за банку), чтобы накопить нужную сумму`
            : "Баллов достаточно — можно обменять прямо сейчас"
        }</div>
      </div>
      <button class="redeem-btn" id="btnRedeem" ${remaining > 0 ? "disabled" : ""}>
        ${remaining > 0 ? `Не хватает ${remaining} баллов` : `Получить за ${p.price} баллов`}
      </button>
    `;
    animateFills(document.getElementById("productDetail"));
    const btn = document.getElementById("btnRedeem");
    if (remaining <= 0) btn.addEventListener("click", () => openRedeemSheet(p));
  }

  function openRedeemSheet(p) {
    openSheet({
      title: "Обменять баллы?",
      text: `С баланса списывается ${p.price} баллов.<br>Товар появится во вкладке «Покупки» — заберёте его там.`,
      actions: [
        { label: "Отмена", kind: "ghost", onClick: closeSheet },
        { label: "Обменять", kind: "primary", onClick: () => redeemProduct(p) },
      ],
    });
  }

  function redeemProduct(p) {
    state.balance -= p.price;
    state.pendingPickups.unshift({
      id: nextPickupId++,
      name: p.name, price: p.price, image: p.image, date: Date.now(),
      promoCodes: genPromoCodes(),
    });
    state.history.unshift({ type: "redeem", label: p.name, points: -p.price, date: Date.now() });
    saveState();
    closeSheet();
    renderBalance(true);
    renderCatalog();
    renderProductDetail(p.id);
    renderProfile();
    renderPurchasesBadge();
    launchConfetti();
    showToast("i-check", `Готово! Заберите товар в «Покупках»`);
  }

  // ---------- profile ----------
  function syncProfileHeader() {
    document.getElementById("profileAvatar").textContent = initialsOf(state.accountName);
    document.getElementById("profileName").textContent = state.accountName;
  }

  function renderProfile() {
    renderBalance(false);
    syncProfileHeader();
    const { aluminium, co2 } = computeStats();
    document.getElementById("profileTotalPoints").textContent = state.totalEarned;
    document.getElementById("profileTotalAlum").textContent = aluminium.toFixed(2);
    document.getElementById("profileTotalCO2").textContent = co2.toFixed(1);

    const accrualList = document.getElementById("accrualList");
    const earns = state.history.filter((h) => h.type === "earn");
    accrualList.innerHTML = earns.length
      ? earns
          .map(
            (h) => `
      <div class="archive-row">
        <div class="archive-row__icon"><svg class="icon"><use href="#i-coin"/></svg></div>
        <div class="archive-row__body">
          <div class="archive-row__name">${h.label}</div>
          <div class="archive-row__date">${fmtDate(h.date)}</div>
        </div>
        <div class="archive-row__price archive-row__price--positive">+${h.points}</div>
      </div>`
          )
          .join("")
      : `<div class="empty-hint">Пока нет начислений — сдай первые банки</div>`;
  }

  // ---------- purchases (ожидают получения / архив) ----------
  let purchasesView = "pending";
  function archiveRowHtml(pu) {
    return `
      <div class="archive-row">
        <div class="archive-row__icon">${pu.image ? `<img src="${pu.image}" loading="lazy" alt="${pu.name}">` : "📦"}</div>
        <div class="archive-row__body">
          <div class="archive-row__name">${pu.name}</div>
          <div class="archive-row__date">${fmtDate(pu.date)}</div>
        </div>
        <div class="archive-row__price">-${pu.price}</div>
      </div>`;
  }
  function renderPurchasesBadge() {
    document.getElementById("purchasesBadge").textContent = state.pendingPickups.length || "";
  }
  function renderPurchases() {
    document.querySelectorAll("#purchasesToggle button").forEach((b) => {
      b.classList.toggle("active", b.dataset.purchasesView === purchasesView);
    });
    document.getElementById("pendingGrid").style.display = purchasesView === "pending" ? "" : "none";
    document.getElementById("purchasesArchiveList").style.display = purchasesView === "archive" ? "" : "none";

    const grid = document.getElementById("pendingGrid");
    grid.innerHTML = state.pendingPickups.length
      ? state.pendingPickups
          .map(
            (pu) => `
      <button class="product-card" data-pickup="${pu.id}">
        <div class="product-card__icon">${visualHtml(pu)}</div>
        <div class="product-card__name">${pu.name}</div>
        <div class="pickup-card__action">Получить за 1 ₽</div>
      </button>`
          )
          .join("")
      : `<div class="empty-hint">Пока нет товаров, ожидающих получения</div>`;
    grid.querySelectorAll("[data-pickup]").forEach((card) => {
      card.addEventListener("click", () => openOverlay("pickup", +card.dataset.pickup));
    });

    const archiveList = document.getElementById("purchasesArchiveList");
    archiveList.innerHTML = state.purchases.length
      ? state.purchases.map(archiveRowHtml).join("")
      : `<div class="empty-hint">Пока нет полученных покупок</div>`;

    renderPurchasesBadge();
  }
  document.querySelectorAll("#purchasesToggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      purchasesView = btn.dataset.purchasesView;
      renderPurchases();
    });
  });

  function renderPickupDetail(id) {
    const pu = state.pendingPickups.find((x) => x.id === id);
    if (!pu) return;
    const partnersHtml = DELIVERY_PARTNERS.map(
      (partner) => `
      <div class="partner-row">
        <img class="partner-row__logo" src="${partner.logo}" alt="${partner.name}">
        <div class="partner-row__name">${partner.name}</div>
        <button class="partner-row__code" data-copy="${pu.promoCodes[partner.id]}">
          ${pu.promoCodes[partner.id]}
          <span class="partner-row__cta">Получить за 1 ₽</span>
        </button>
      </div>`
    ).join("");
    document.getElementById("pickupDetail").innerHTML = `
      <div class="pickup-detail__icon">${visualHtml(pu)}</div>
      <h2 class="pickup-detail__name">${pu.name}</h2>
      <div class="partner-list">${partnersHtml}</div>
      <button class="pickup-confirm-btn" id="btnConfirmPickup">Подтвердить получение</button>
    `;
    document.querySelectorAll("#pickupDetail [data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(btn.dataset.copy).catch(() => {});
        showToast("i-check", "Промокод скопирован");
      });
    });
    document.getElementById("btnConfirmPickup").addEventListener("click", () => confirmPickup(id));
  }

  function confirmPickup(id) {
    const idx = state.pendingPickups.findIndex((x) => x.id === id);
    if (idx === -1) return;
    const [pu] = state.pendingPickups.splice(idx, 1);
    state.purchases.unshift({ name: pu.name, price: pu.price, image: pu.image, date: Date.now() });
    saveState();
    closeOverlay();
    renderPurchases();
    showToast("i-check", `«${pu.name}» получен!`);
  }

  // ---------- articles ----------
  const ARTICLES = [
    {
      title: "Кому и когда нужен протеин",
      teaser: "Когда добавка реально нужна, а когда хватит обычной еды",
      sections: [
        { heading: "Что это такое", text: "Протеиновые добавки — порошки и батончики с концентрированным белком (сывороточным, казеиновым или растительным). В них нет ничего «магического» — это просто удобный способ быстро получить дополнительную порцию белка, когда набрать нужное количество из обычной еды неудобно или не хватает времени." },
        { heading: "Когда он действительно нужен", text: "Дополнительный белок полезен тем, кто тренируется регулярно (от 3 раз в неделю), набирает мышечную массу или испытывает трудности с усвоением нужного количества белка из обычного рациона — например, при высокой физической нагрузке или плотном графике, когда готовить полноценные приёмы пищи просто некогда." },
        { heading: "Сколько нужно обычному человеку", text: "Для большинства взрослых без силовых тренировок норма белка — около 0.8–1 г на кг веса в день. При регулярных тренировках эта цифра растёт до 1.2–2 г на кг — именно такой расчёт лежит в основе калькулятора на этой странице." },
        { heading: "Добавка или обычная еда", text: "Для большинства людей без интенсивных тренировок норму белка вполне можно закрыть обычными продуктами — творогом, молоком, йогуртом, яйцами, мясом и рыбой. Протеиновая добавка — не замена еде, а дополнение, которое экономит время, когда обычного рациона не хватает." },
      ],
    },
    {
      title: "Кому и когда нужен гейнер",
      teaser: "Это не «усиленный протеин» — а способ быстро добрать калории",
      sections: [
        { heading: "Что это", text: "Гейнер — белково-углеводная смесь с высокой калорийностью. В отличие от протеина, где акцент на белке, гейнер в первую очередь даёт много энергии за счёт углеводов с добавлением белка — то есть это способ быстро добрать калории, а не просто «усиленный протеин»." },
        { heading: "Кому подходит", text: "Гейнер нужен не всем, а в основном тем, кому тяжело набрать вес естественным путём — из-за быстрого обмена веществ или очень больших энергозатрат при интенсивных тренировках, когда обычного рациона физически не хватает, чтобы перекрыть расход калорий." },
        { heading: "Когда не нужен", text: "Если цель — похудение или поддержание текущего веса, гейнер, как правило, не нужен и может даже навредить цели: лишние калории пойдут не в мышцы, а в жировые запасы, особенно при нерегулярных тренировках." },
        { heading: "Чем заменить", text: "Для большинства людей добрать калории можно и обычной едой — орехами, бананами, цельнозерновыми крупами, молочными продуктами. Гейнер удобен, когда нужно быстро и без большого объёма пищи закрыть калорийный дефицит после тяжёлой тренировки." },
      ],
    },
    {
      title: "Риски избыточного употребления",
      teaser: "Больше белка — не значит больше мышц. Разбираем, где граница",
      sections: [
        { heading: "Нагрузка на органы", text: "Чрезмерное количество белка сверх реальной потребности организма не ускоряет рост мышц — лишний белок не «запасается» как мышцы, а создаёт дополнительную нагрузку на почки и печень, которые отвечают за его переработку и выведение продуктов распада." },
        { heading: "Кому особенно осторожно", text: "Риск особенно актуален при уже существующих проблемах с почками или печенью — в этом случае повышенное потребление белка может усугубить состояние. Здоровым людям без таких заболеваний умеренно повышенная норма белка, как правило, не вредит." },
        { heading: "Вода и баланс рациона", text: "При высокобелковом рационе важно пить достаточно воды — она помогает почкам выводить продукты метаболизма белка. Также не стоит забывать про клетчатку (овощи, крупы, фрукты) — её нехватка на фоне избытка белка может повлиять на пищеварение." },
        { heading: "Когда стоит посоветоваться с врачом", text: "Перед существенным увеличением потребления белка или началом приёма спортивных добавок разумно проконсультироваться с врачом — особенно если есть хронические заболевания, вы принимаете лекарства или планируете длительный курс в высоких дозировках." },
      ],
    },
    {
      title: "«Хай Фокус»: что это и для кого",
      teaser: "Безлактозный молочный напиток с зелёным чаем — и его банки тоже в программе",
      sections: [
        { heading: "Что это", text: "«Хай Фокус» — функциональный молочный напиток с зелёным чаем от «ЭкоНивы». Он безлактозный, то есть подходит и тем, кто плохо переносит обычное молоко из-за непереносимости лактозы." },
        { heading: "Для кого", text: "Напиток подходит в качестве лёгкого перекуса после тренировки — в составе есть белок для восстановления мышц, а зелёный чай традиционно ассоциируется с бодростью за счёт естественного содержания кофеина." },
        { heading: "Чем отличается от обычного перекуса", text: "В отличие от сладких батончиков или энергетиков, «Хай Фокус» — это в первую очередь молочный продукт: по составу он ближе к обычному питьевому йогурту или кефиру, просто с добавленным функциональным компонентом." },
        { heading: "Банки тоже участвуют в программе", text: "Тара из-под «Хай Фокус», как и любая другая банка линейки «ЭкоНива», принимается в пунктах сдачи и даёт те же баллы по программе — отдельно считать её не нужно." },
      ],
    },
  ];

  function renderArticles() {
    const list = document.getElementById("articleList");
    if (!list) return;
    list.innerHTML = ARTICLES.map(
      (a, i) => `
      <button class="article-card" data-article="${i}">
        <div class="article-card__icon"><svg class="icon"><use href="#i-article"/></svg></div>
        <div class="article-card__body">
          <span class="article-card__title">${a.title}</span>
          <span class="article-card__teaser">${a.teaser}</span>
        </div>
        <svg class="icon article-card__chevron"><use href="#i-chevron"/></svg>
      </button>`
    ).join("");
    list.querySelectorAll(".article-card").forEach((card) => {
      card.addEventListener("click", () => openOverlay("article", +card.dataset.article));
    });

    const videoHost = document.getElementById("videoPlaceholders");
    videoHost.innerHTML = Array.from({ length: 3 })
      .map(() => `<div class="video-placeholder"><svg class="icon"><use href="#i-play"/></svg><span>Видео скоро</span></div>`)
      .join("");
  }

  function renderArticleDetail(index) {
    const a = ARTICLES[index];
    if (!a) return;
    document.querySelector('[data-screen="article"] .overlay-title').textContent = a.title;
    document.getElementById("articleDetail").innerHTML = `
      <h2 class="article-detail__title">${a.title}</h2>
      ${a.sections.map((s) => `
        <h3 class="article-detail__heading">${s.heading}</h3>
        <p class="article-detail__text">${s.text}</p>
      `).join("")}
    `;
  }

  const PROTEIN_RANGES = {
    sedentary: [0.8, 1.0],
    moderate: [1.2, 1.4],
    active: [1.4, 1.6],
  };
  const ACTIVITY_HINTS = {
    sedentary: "Вы мало двигаетесь в течение дня, сидячая работа, тренировок почти нет",
    moderate: "Вы занимаетесь 1-3 раза в неделю — прогулки, лёгкая зарядка",
    active: "Вы тренируетесь регулярно, 3-5 раз в неделю",
  };
  let calcActivity = "sedentary";
  function updateProteinCalc() {
    const weight = parseFloat(document.getElementById("calcWeight").value);
    const result = document.getElementById("calcResult");
    document.getElementById("calcActivityHint").textContent = ACTIVITY_HINTS[calcActivity];
    if (!weight || weight <= 0) {
      result.textContent = "Укажите вес, чтобы увидеть норму";
      return;
    }
    const [lo, hi] = PROTEIN_RANGES[calcActivity];
    result.innerHTML = `Для вас <span class="protein-calc__num">${Math.round(weight * lo)}–${Math.round(weight * hi)} г</span> белка в день`;
  }
  document.getElementById("calcWeight").addEventListener("input", updateProteinCalc);
  document.querySelectorAll("#calcActivity button").forEach((btn) => {
    btn.addEventListener("click", () => {
      calcActivity = btn.dataset.activity;
      document.querySelectorAll("#calcActivity button").forEach((b) => b.classList.toggle("active", b === btn));
      updateProteinCalc();
    });
  });
  updateProteinCalc();

  // ---------- recycle (Сдать банки) ----------
  let recycleQty = 20;
  document.getElementById("recycleBar").addEventListener("click", openRecycleSheet);

  function openRecycleSheet() {
    recycleQty = 20;
    renderRecycleSheetBody();
    sheetEl.classList.add("show");
    sheetBackdrop.classList.add("show");
  }
  function renderRecycleSheetBody() {
    const points = recycleQty * canRate();
    document.getElementById("sheetContent").innerHTML = `
      <h3 class="sheet-title">Сдать банки</h3>
      <p class="sheet-text">${CAN_POINTS} балла за банку. При стрике от ${STREAK_BONUS_WEEKS} недель — ${STREAK_BONUS_POINTS} балла за банку.</p>
      <div class="qty-chips">
        ${[10, 20, 50].map((n) => `<button class="chip ${recycleQty === n ? "active" : ""}" data-qty="${n}">${n}</button>`).join("")}
      </div>
      <div class="qty-stepper">
        <button class="stepper-btn" id="qtyMinus" ${recycleQty <= 5 ? "disabled" : ""}>−</button>
        <span class="qty-value">${recycleQty} <small>банок</small></span>
        <button class="stepper-btn" id="qtyPlus">+</button>
      </div>
      <div class="qty-points">= <b>${points} баллов</b></div>
      <div class="sheet-actions">
        <button class="sheet-btn sheet-btn--ghost" id="qtyCancel">Отмена</button>
        <button class="sheet-btn sheet-btn--primary" id="qtyConfirm">Сдать и начислить</button>
      </div>
    `;
    document.querySelectorAll('#sheetContent [data-qty]').forEach((b) => {
      b.addEventListener("click", () => {
        recycleQty = +b.dataset.qty;
        renderRecycleSheetBody();
      });
    });
    document.getElementById("qtyMinus").addEventListener("click", () => {
      recycleQty = Math.max(5, recycleQty - 5);
      renderRecycleSheetBody();
    });
    document.getElementById("qtyPlus").addEventListener("click", () => {
      recycleQty += 5;
      renderRecycleSheetBody();
    });
    document.getElementById("qtyConfirm").addEventListener("click", () => recycleCans(recycleQty));
    document.getElementById("qtyCancel").addEventListener("click", closeSheet);
  }

  function recycleCans(qty) {
    const earned = qty * canRate();
    const levelBefore = levelForCans(state.cansRecycled);
    state.balance += earned;
    state.totalEarned += earned;
    state.cansRecycled += qty;
    const levelAfter = levelForCans(state.cansRecycled);
    state.history.unshift({ type: "earn", label: `Сдано ${qty} банок`, points: earned, date: Date.now() });

    const curMonday = mondayOf(Date.now());
    const diffDays = (curMonday - state.lastRecycleWeek) / 86400000;
    if (diffDays >= 7) {
      state.streakWeeks = diffDays === 7 ? state.streakWeeks + 1 : 1;
    }
    state.lastRecycleWeek = curMonday;

    saveState();
    closeSheet();
    renderBalance(true);
    renderCatalog();
    renderProfile();
    buildLevelTrack();
    renderHome();

    if (levelAfter.n > levelBefore.n) {
      scrollToLevel(levelAfter.n);
      setTimeout(() => showLevelUpPopup(levelAfter), 400);
      showToast("i-coin", `+${earned} баллов начислено!`);
    } else {
      updateCenteredCard();
      launchConfetti();
      showToast("i-coin", `+${earned} баллов начислено!`);
    }
  }

  // ---------- settings ----------
  function renderSettings() {
    document.querySelectorAll("#themeSegmented button").forEach((b) => {
      b.classList.toggle("active", b.dataset.themeChoice === state.theme);
    });
    document.getElementById("accountName").value = state.accountName;
    document.getElementById("accountAvatar").textContent = initialsOf(state.accountName);
  }
  function initialsOf(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "ЭН";
    return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
  }
  document.querySelectorAll("#themeSegmented button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.theme = btn.dataset.themeChoice;
      saveState();
      applyTheme();
      renderSettings();
    });
  });
  document.getElementById("accountName").addEventListener("input", (e) => {
    state.accountName = e.target.value;
    saveState();
    document.getElementById("accountAvatar").textContent = initialsOf(state.accountName);
    syncProfileHeader();
  });
  function applyTheme() {
    if (state.theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", state.theme);
    }
  }

  // ---------- bottom sheet ----------
  const sheetEl = document.getElementById("sheet");
  const sheetBackdrop = document.getElementById("sheetBackdrop");
  function openSheet({ title, text, actions }) {
    document.getElementById("sheetContent").innerHTML = `
      <h3 class="sheet-title">${title}</h3>
      <p class="sheet-text">${text}</p>
      <div class="sheet-actions">
        ${actions.map((a, i) => `<button class="sheet-btn sheet-btn--${a.kind}" data-idx="${i}">${a.label}</button>`).join("")}
      </div>
    `;
    document.querySelectorAll("#sheetContent .sheet-btn").forEach((btn, i) => {
      btn.addEventListener("click", actions[i].onClick);
    });
    sheetEl.classList.add("show");
    sheetBackdrop.classList.add("show");
  }
  function closeSheet() {
    sheetEl.classList.remove("show");
    sheetBackdrop.classList.remove("show");
  }
  sheetBackdrop.addEventListener("click", closeSheet);

  // ---------- toast ----------
  function showToast(iconId, text) {
    const stack = document.getElementById("toastStack");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<svg class="icon"><use href="#${iconId}"/></svg><span>${text}</span>`;
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 300);
    }, 2600);
  }

  // ---------- confetti ----------
  function launchConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    const rect = phoneScreen.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.display = "block";
    const colors = ["#54b800", "#ffc83d", "#6bd600", "#ffffff"];
    const particles = Array.from({ length: 50 }, () => ({
      x: canvas.width / 2,
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 9,
      vy: Math.random() * -7 - 3,
      size: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.3,
    }));
    let frame = 0;
    function tick() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.vy += 0.25;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (frame < 70) requestAnimationFrame(tick);
      else {
        canvas.style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    tick();
  }

  // ---------- hero mascot: ambient particles + draggable with spring-back ----------
  function initHeroParticles() {
    const host = document.getElementById("heroParticles");
    if (!host) return;
    const spots = [
      { x: "12%", y: "20%", d: 5.2, delay: 0 },
      { x: "85%", y: "15%", d: 6.1, delay: 0.6 },
      { x: "20%", y: "75%", d: 5.6, delay: 1.1 },
      { x: "80%", y: "70%", d: 4.8, delay: 1.7 },
      { x: "50%", y: "12%", d: 6.6, delay: 0.3 },
      { x: "92%", y: "45%", d: 5.4, delay: 2.1 },
    ];
    host.innerHTML = spots
      .map(
        (s, i) => `<span class="hero-particle" style="left:${s.x};top:${s.y};animation-duration:${s.d}s;animation-delay:${s.delay}s;--drift-x:${i % 2 ? 16 : -14}px;--drift-y:${-16 - (i % 3) * 6}px;--drift-rot:${i % 2 ? 30 : -24}deg;"><svg><use href="#i-leaf"/></svg></span>`
      )
      .join("");
  }

  function spawnDragParticle(host, x, y) {
    const el = document.createElement("div");
    el.className = "drag-particle";
    el.style.left = x - 5 + "px";
    el.style.top = y - 5 + "px";
    el.style.color = mascotTrailColor();
    el.innerHTML = `<svg><use href="#i-leaf"/></svg>`;
    host.appendChild(el);
    setTimeout(() => el.remove(), 700);
  }

  // эластичное сопротивление к краю (iOS-style rubber-band): свободно у центра, с нарастающим
  // сопротивлением дальше, но асимптотически никогда не превышает limit — не хард-клэмп/стена
  function rubberBand(delta, limit) {
    const c = 0.6;
    const sign = delta < 0 ? -1 : 1;
    const abs = Math.abs(delta);
    return sign * limit * (1 - 1 / ((abs * c) / limit + 1));
  }

  function initMascotDrag() {
    const scene = document.getElementById("heroScene");
    const mascot = document.getElementById("heroMascot");
    if (!scene || !mascot) return;
    let dragging = false;
    let startX = 0, startY = 0;
    let restX = 0, restY = 0; // центр маскота в покое, относительно сцены — точка, от которой считается след
    let lastParticle = 0;
    const limit = 48;

    mascot.addEventListener("pointerdown", (e) => {
      dragging = true;
      mascot.classList.remove("returning");
      mascot.classList.add("dragging");
      mascot.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      const mRect = mascot.getBoundingClientRect();
      const sRect = scene.getBoundingClientRect();
      restX = mRect.left + mRect.width / 2 - sRect.left;
      restY = mRect.top + mRect.height / 2 - sRect.top;
    });
    mascot.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = rubberBand(e.clientX - startX, limit);
      const dy = rubberBand(e.clientY - startY, limit);
      // scale(var(--mascot-scale)) обязателен здесь: пока идёт драг, у маскота animation:none
      // (см. .dragging в CSS) — без этого на время жеста он бы "прыгал" к масштабу 1
      mascot.style.transform = `translate(${dx}px, ${dy}px) scale(var(--mascot-scale))`;
      const now = performance.now();
      if (now - lastParticle > 70) {
        lastParticle = now;
        // след спавнится от реальной (с учётом rubber-band) позиции маскота, а не от сырых
        // координат курсора — они расходятся ровно там, где сопротивление тормозит маскота
        spawnDragParticle(document.getElementById("heroParticles"), restX + dx, restY + dy);
      }
    });
    function release(e) {
      if (!dragging) return;
      dragging = false;
      mascot.classList.remove("dragging");
      // .returning держит анимацию покачивания полностью снятой (animation:none) на время
      // пружинного возврата — иначе mascot-sway, возобновившись, снова побеждает это же
      // свойство transform и спринг к центру не отрисовывается видимо
      mascot.classList.add("returning");
      mascot.style.transform = "translate(0px, 0px) scale(var(--mascot-scale))";
      setTimeout(() => {
        mascot.classList.remove("returning");
        mascot.style.transform = "";
      }, 600);
    }
    mascot.addEventListener("pointerup", release);
    mascot.addEventListener("pointercancel", release);
  }

  // ---------- init ----------
  applyTheme();
  renderBalance(false);
  renderFilters();
  renderCatalog();
  renderProfile();
  renderPurchases();
  renderArticles();
  renderSettings();
  initLevelCarousel();
  renderHome();
  initHeroParticles();
  initMascotDrag();
  showNav();
})();
