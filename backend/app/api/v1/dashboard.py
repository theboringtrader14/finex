from fastapi import APIRouter
from app.engine.briefing import fetch_context, generate_daily_briefing

router = APIRouter()


@router.get("/dashboard")
async def get_dashboard():
    context = await fetch_context()
    trading = context.get("trading", {})
    budget = context.get("budget", {})
    budget_pct = budget.get("budget_pct", 50) if budget else 50
    alerts = []
    if budget_pct and budget_pct > 90:
        alerts.append({"type": "budget", "message": "Budget nearly exhausted this month", "severity": "warning"})
    alerts.append({"type": "goal", "message": "Emergency fund: only 4% funded", "severity": "warning"})
    alerts.append({"type": "fi", "message": "FI on track: estimated 2.8 years to ₹1.8Cr target", "severity": "info"})
    return {
        "lifex_score": 72,
        "trading": trading,
        "budget": budget,
        "alerts": alerts,
    }


@router.get("/briefing/today")
async def get_today_briefing():
    from datetime import datetime
    from zoneinfo import ZoneInfo
    from app.core.config import settings
    context = await fetch_context()
    text = await generate_daily_briefing(context)
    now = datetime.now(ZoneInfo("Asia/Kolkata"))
    return {
        "text": text,
        "generated_at": now.isoformat(),
        "source": "ai" if settings.google_ai_api_key else "static",
    }


@router.get("/briefing/history")
async def get_briefing_history(limit: int = 30):
    return {"briefings": [], "message": "Briefing history coming in Phase 2"}
