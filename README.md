# OlimHelpSearch 🚀

פלטפורמה חכמה לאיתור בעלי מקצוע ונותני שירות לעולים חדשים בשפת האם שלהם.

## 🌍 שפות נתמכות (Supported Languages)
1. **עברית (Hebrew)** — RTL
2. **Français (French)** — LTR
3. **English** — LTR
4. **Русский (Russian)** — LTR
5. **Español (Spanish)** — LTR
6. **العربية (Arabic)** — RTL

---

## 🛠️ דרישות מוקדמות (Prerequisites)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) מותקן ורץ ברקע.
* חשבון [Supabase](https://supabase.com) (לפרויקט המשותף של הצוות).

---

## 🚀 הוראות הרצה (Quick Start)

### 1. הכנת קובץ המשתנים (.env)
העתיקו את קובץ הדוגמה לקובץ `.env`:
```bash
cp .env.example .env
```
פתחו את קובץ `.env` והדביקו את ה-`SUPABASE_URL` ואת ה-`SUPABASE_KEY` של הפרויקט שלכם.

### 2. הרצת המערכת באמצעות Docker
פתחו טרמינל בתיקיית הפרויקט והריצו:
```bash
docker compose up --build
```

### 3. בדיקת המערכת בדפדפן
* **ממשק המשתמש (Frontend):** פתחו את הכתובת [http://localhost:3000](http://localhost:3000)
* **שרת ה-Backend ומסמכי ה-API (Swagger):** פתחו את [http://localhost:8000/docs](http://localhost:8000/docs)
* **בדיקת בריאות שרת (Health Check):** פתחו את [http://localhost:8000/api/health](http://localhost:8000/api/health)

---

## 👥 משימות חברי הצוות לבדיקת התשתית (שלב ג1)
לפי דרישות המחוון, כל חבר צוות עובד בענף נפרד ומבצע Pull Request (PR):
1. **איש צוות 1:** בדיקת שליפת בעלי מקצוע לפי שפה ועיר (`GET /api/professionals`).
2. **איש צוות 2:** הוספת בעל מקצוע חדש מתוך טופס הפתיחה (`POST /api/professionals`).
3. **איש צוות 3:** הרצת בדיקת בריאות וחיבור ל-Supabase (`GET /api/health`).
