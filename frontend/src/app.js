// Multilingual Dictionary supporting 6 languages (HE, FR, EN, RU, ES, AR)
const translations = {
  he: {
    dir: "rtl",
    heroTitle: "מצא את בעל המקצוע המתאים — בשפה שלך",
    heroSubtitle: "פלטפורמה חכמה לעולים חדשים בישראל לחיבור ישיר עם אינסטלטורים, חשמלאים וטכנאים",
    searchPlaceholder: "למשל: נזילה מתחת לכיור בירושלים, דחוף להיום...",
    searchBtn: "🔍 חפש בעל מקצוע",
    quickLabel: "קטגוריות מהירות:",
    resultsTitle: "בעלי מקצוע זמינים",
    availToday: "🟢 זמין היום",
    availUnknown: "⚪ זמינות לא ידועה",
    callBtn: "📞 חיוג",
    whatsappBtn: "💬 וואטסאפ",
    priceLabel: "מחיר משוער:",
    addTitle: "➕ הוספת בעל מקצוע (בדיקת כתיבה לבסיס הנתונים — שלב ג1)",
    availLabel: "זמין לקריאות היום (Available Today)",
    submitBtn: "שמור בעל מקצוע"
  },
  fr: {
    dir: "ltr",
    heroTitle: "Trouvez le bon professionnel — dans votre langue",
    heroSubtitle: "Plateforme intelligente pour les nouveaux immigrants en Israël. Contact direct sans intermédiaire.",
    searchPlaceholder: "Ex: Je cherche un plombier francophone à Jérusalem, disponible aujourd'hui...",
    searchBtn: "🔍 Rechercher",
    quickLabel: "Catégories rapides :",
    resultsTitle: "Professionnels disponibles",
    availToday: "🟢 Disponible aujourd'hui",
    availUnknown: "⚪ Disponibilité à confirmer",
    callBtn: "📞 Appeler",
    whatsappBtn: "💬 WhatsApp",
    priceLabel: "Tarif indicatif :",
    addTitle: "➕ Ajouter un professionnel (Test écriture base de données — Étape C1)",
    availLabel: "Disponible aujourd'hui",
    submitBtn: "Enregistrer le professionnel"
  },
  en: {
    dir: "ltr",
    heroTitle: "Find the right professional — in your language",
    heroSubtitle: "Smart platform for new immigrants in Israel for direct contact with plumbers, electricians, and technicians",
    searchPlaceholder: "E.g., French-speaking plumber in Jerusalem available today...",
    searchBtn: "🔍 Search Professional",
    quickLabel: "Quick Categories:",
    resultsTitle: "Available Professionals",
    availToday: "🟢 Available Today",
    availUnknown: "⚪ Availability Unknown",
    callBtn: "📞 Call",
    whatsappBtn: "💬 WhatsApp",
    priceLabel: "Indicative price:",
    addTitle: "➕ Add Professional (Database Write Test — Stage C1)",
    availLabel: "Available Today",
    submitBtn: "Save Professional"
  },
  ru: {
    dir: "ltr",
    heroTitle: "Найдите нужного специалиста — на вашем языке",
    heroSubtitle: "Умная платформа для новых репатриантов в Израиле: сантехники, электрики и мастера рядом с вами",
    searchPlaceholder: "Например: русскоязычный сантехник в Иерусалиме сегодня...",
    searchBtn: "🔍 Найти специалиста",
    quickLabel: "Популярные категории:",
    resultsTitle: "Доступные специалисты",
    availToday: "🟢 Доступен сегодня",
    availUnknown: "⚪ Уточняйте доступность",
    callBtn: "📞 Позвонить",
    whatsappBtn: "💬 WhatsApp",
    priceLabel: "Ориентировочная цена:",
    addTitle: "➕ Добавить специалиста (Проверка записи в базу — Этап ג1)",
    availLabel: "Доступен сегодня",
    submitBtn: "Сохранить специалиста"
  },
  es: {
    dir: "ltr",
    heroTitle: "Encuentra al profesional adecuado — en tu idioma",
    heroSubtitle: "Plataforma inteligente para nuevos inmigrantes en Israel. Contacto directo con fontaneros y electricistas.",
    searchPlaceholder: "Ej: Fontanero de habla hispana en Jerusalén disponible hoy...",
    searchBtn: "🔍 Buscar profesional",
    quickLabel: "Categorías rápidas:",
    resultsTitle: "Profesionales disponibles",
    availToday: "🟢 Disponible hoy",
    availUnknown: "⚪ Disponibilidad a consultar",
    callBtn: "📞 Llamar",
    whatsappBtn: "💬 WhatsApp",
    priceLabel: "Precio indicativo:",
    addTitle: "➕ Añadir profesional (Prueba de escritura en base de datos — Etapa C1)",
    availLabel: "Disponible hoy",
    submitBtn: "Guardar profesional"
  },
  ar: {
    dir: "rtl",
    heroTitle: "اعثر على المهني المناسب — بلغتك",
    heroSubtitle: "منصة ذكية للقادمين الجدد في إسرائيل للتواصل المباشر مع السباكين والكهربائيين والفنيين",
    searchPlaceholder: "مثال: سباك في القدس متاح اليوم...",
    searchBtn: "🔍 بحث عن مهني",
    quickLabel: "فئات سريعة:",
    resultsTitle: "المهنيون المتاحون",
    availToday: "🟢 متاح اليوم",
    availUnknown: "⚪ التوفر غير مؤكد",
    callBtn: "📞 اتصال",
    whatsappBtn: "💬 واتساب",
    priceLabel: "السعر التقديري:",
    addTitle: "➕ إضافة مهني (اختبار الكتابة لقاعدة البيانات — مرحلة ג1)",
    availLabel: "متاح اليوم",
    submitBtn: "حفظ المهني"
  }
};

let currentLang = 'he';
const API_BASE = "http://localhost:8000/api";

function changeLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  const t = translations[lang];

  document.documentElement.dir = t.dir;
  document.documentElement.lang = lang;

  document.getElementById("heroTitle").innerText = t.heroTitle;
  document.getElementById("heroSubtitle").innerText = t.heroSubtitle;
  document.getElementById("searchInput").placeholder = t.searchPlaceholder;
  document.getElementById("searchBtn").innerText = t.searchBtn;
  document.getElementById("quickLabel").innerText = t.quickLabel;
  document.getElementById("resultsTitle").innerText = t.resultsTitle;
  document.getElementById("addTitle").innerText = t.addTitle;
  document.getElementById("availLabel").innerText = t.availLabel;
  document.getElementById("submitBtn").innerText = t.submitBtn;

  loadProfessionals();
}

async function loadProfessionals(filterLang = "", filterCity = "") {
  const grid = document.getElementById("resultsGrid");
  const countBadge = document.getElementById("resultsCount");
  
  try {
    let url = `${API_BASE}/professionals`;
    const params = new URLSearchParams();
    if (filterLang) params.append("language", filterLang);
    if (filterCity) params.append("city", filterCity);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();
    const pros = data.data || [];

    countBadge.innerText = `${pros.length} נמצאו`;
    grid.innerHTML = "";

    if (pros.length === 0) {
      grid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #64748b; padding: 2rem;'>לא נמצאו בעלי מקצוע מתאימים. נסו לשנות את הסינון.</p>";
      return;
    }

    const t = translations[currentLang];

    pros.forEach(p => {
      const card = document.createElement("div");
      card.className = "pro-card";

      const availClass = p.available_today ? "avail-yes" : "avail-no";
      const availText = p.available_today ? t.availToday : t.availUnknown;

      const langs = Array.isArray(p.languages) ? p.languages : [p.languages];
      const langPills = langs.map(l => `<span class="tag-pill">🗣️ ${l}</span>`).join(" ");

      card.innerHTML = `
        <div class="pro-header">
          <div>
            <div class="pro-name">${p.full_name}</div>
            <div class="pro-profession">${p.profession}</div>
          </div>
          <span class="avail-badge ${availClass}">${availText}</span>
        </div>
        <div class="tags-row">
          <span class="tag-pill">📍 ${p.service_city}</span>
          ${langPills}
        </div>
        <div style="font-size: 0.9rem; color: #64748b; margin-top: 0.5rem;">
          ${t.priceLabel} <strong>${p.indicative_price || 'לפי תיאום'}</strong>
        </div>
        <div class="pro-actions">
          <a href="tel:${p.phone}" class="btn-contact btn-call">${t.callBtn}</a>
          ${p.whatsapp ? `<a href="https://wa.me/${p.whatsapp.replace(/[^0-9]/g, '')}" target="_blank" class="btn-contact btn-whatsapp">${t.whatsappBtn}</a>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });

  } catch (err) {
    console.error("Error fetching professionals:", err);
    grid.innerHTML = "<p style='color: red; grid-column: 1/-1; text-align: center;'>שגיאה בחיבור לשרת ה-Backend. ודאו שהקונטיינר של ה-Docker פעיל.</p>";
    countBadge.innerText = "שגיאת חיבור";
  }
}

function filterCategory(categoryName) {
  document.getElementById("searchInput").value = categoryName;
  loadProfessionals("", categoryName);
}

function performSearch() {
  const query = document.getElementById("searchInput").value.trim();
  loadProfessionals("", query);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("proName").value;
  const profession = document.getElementById("proProfession").value;
  const city = document.getElementById("proCity").value;
  const phone = document.getElementById("proPhone").value;
  const langs = document.getElementById("proLanguages").value.split(",").map(s => s.trim());
  const price = document.getElementById("proPrice").value;
  const available = document.getElementById("proAvailableToday").checked;

  const payload = {
    full_name: name,
    profession: profession,
    service_city: city,
    phone: phone,
    languages: langs,
    indicative_price: price || "לפי תיאום",
    available_today: available
  };

  try {
    const res = await fetch(`${API_BASE}/professionals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      alert("בעל המקצוע נשמר בהצלחה בבסיס הנתונים!");
      document.getElementById("addProForm").reset();
      loadProfessionals();
    } else {
      alert("שגיאה בשמירת בעל המקצוע.");
    }
  } catch (err) {
    alert("שגיאת תקשורת עם השרת.");
  }
}

// Initial load
window.addEventListener("DOMContentLoaded", () => {
  changeLanguage("he");
});
