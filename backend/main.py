import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="OlimHelpSearch API",
    description="Multilingual API supporting Hebrew, French, English, Russian, Spanish, and Arabic",
    version="1.0.0"
)

# CORS configuration for Frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Client setup
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY and SUPABASE_URL != "https://your-project.supabase.co":
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        print(f"Warning: Could not connect to Supabase: {e}")

# In-memory mock database as fallback if Supabase is not yet configured
MOCK_PROFESSIONALS = [
    {
        "id": 1,
        "full_name": "יונתן כהן (Jonathan Cohen)",
        "profession": "אינסטלטור / Plombier",
        "languages": ["צרפתית", "עברית", "English"],
        "service_city": "ירושלים / Jerusalem",
        "phone": "050-1234567",
        "whatsapp": "0501234567",
        "indicative_price": "250-350 ILS",
        "available_today": True,
        "status": "Published"
    },
    {
        "id": 2,
        "full_name": "מישל לוי (Michel Levy)",
        "profession": "חשמלאי / Électricien",
        "languages": ["צרפתית", "English"],
        "service_city": "נתניה / Netanya",
        "phone": "052-7654321",
        "whatsapp": "0527654321",
        "indicative_price": "300 ILS",
        "available_today": False,
        "status": "Published"
    },
    {
        "id": 3,
        "full_name": "אלכסנדר איבנוב (Alexander Ivanov)",
        "profession": "מנעולן / Serrurier",
        "languages": ["רוסית", "עברית"],
        "service_city": "חיפה / Haifa",
        "phone": "053-9988776",
        "whatsapp": "0539988776",
        "indicative_price": "200-300 ILS",
        "available_today": True,
        "status": "Published"
    },
    {
        "id": 4,
        "full_name": "קרלוס רודריגז (Carlos Rodriguez)",
        "profession": "טכנאי מיזוג / Climatisation",
        "languages": ["ספרדית", "עברית", "English"],
        "service_city": "תל אביב / Tel Aviv",
        "phone": "054-1122334",
        "whatsapp": "0541122334",
        "indicative_price": "350 ILS",
        "available_today": True,
        "status": "Published"
    },
    {
        "id": 5,
        "full_name": "עלי חאג' (Ali Haj)",
        "profession": "שיפוצים / Rénovation",
        "languages": ["ערבית", "עברית"],
        "service_city": "ירושלים / Jerusalem",
        "phone": "052-5544332",
        "whatsapp": "0525544332",
        "indicative_price": "לפי הצעת מחיר",
        "available_today": False,
        "status": "Published"
    }
]

class ProfessionalCreate(BaseModel):
    full_name: str
    profession: str
    languages: List[str]
    service_city: str
    phone: str
    whatsapp: Optional[str] = None
    indicative_price: Optional[str] = None
    available_today: bool = False

@app.get("/api/health")
def health_check():
    supabase_connected = False
    if supabase:
        try:
            res = supabase.table("professionals").select("id").limit(1).execute()
            supabase_connected = True
        except Exception:
            supabase_connected = False

    return {
        "status": "healthy",
        "service": "OlimHelpSearch Backend",
        "supported_languages": ["he", "fr", "en", "ru", "es", "ar"],
        "supabase_connected": supabase_connected
    }

@app.get("/api/professionals")
def get_professionals(language: Optional[str] = None, city: Optional[str] = None):
    # Try fetching from Supabase first
    if supabase:
        try:
            query = supabase.table("professionals").select("*").eq("status", "Published")
            if city:
                query = query.ilike("service_city", f"%{city}%")
            res = query.execute()
            data = res.data
            if language:
                data = [p for p in data if any(language.lower() in l.lower() for l in p.get("languages", []))]
            return {"source": "supabase", "data": data}
        except Exception as e:
            print(f"Supabase fetch error, fallback to mock: {e}")

    # Fallback to local data
    results = MOCK_PROFESSIONALS
    if language:
        results = [p for p in results if any(language.lower() in l.lower() for l in p["languages"])]
    if city:
        results = [p for p in results if city.lower() in p["service_city"].lower()]
    return {"source": "mock_data", "data": results}

@app.post("/api/professionals")
def add_professional(pro: ProfessionalCreate):
    if supabase:
        try:
            new_record = pro.dict()
            new_record["status"] = "Published"
            res = supabase.table("professionals").insert(new_record).execute()
            return {"success": True, "source": "supabase", "data": res.data}
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    # Fallback in-memory insert
    new_item = pro.dict()
    new_item["id"] = len(MOCK_PROFESSIONALS) + 1
    new_item["status"] = "Published"
    MOCK_PROFESSIONALS.append(new_item)
    return {"success": True, "source": "mock_data", "data": new_item}
