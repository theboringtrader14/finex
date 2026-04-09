import httpx
from datetime import datetime
from zoneinfo import ZoneInfo
from app.core.config import settings


async def fetch_context() -> dict:
    context = {}
    async with httpx.AsyncClient(timeout=5.0) as client:
        try:
            r = await client.get(f"{settings.staax_api_url}/api/v1/mobile/dashboard")
            dashboard = r.json() if r.status_code == 200 else {}
            context["trading"] = dashboard.get("trading", {})
        except Exception:
            context["trading"] = {}
        try:
            r = await client.get(f"{settings.budgex_api_url}/api/v1/expenses/summary")
            context["budget"] = r.json() if r.status_code == 200 else {}
        except Exception:
            context["budget"] = {}
    return context


def _format_briefing(context: dict) -> str:
    now = datetime.now(ZoneInfo("Asia/Kolkata"))
    hour = now.hour
    greeting = (
        "Good morning" if hour < 12
        else "Good afternoon" if hour < 17
        else "Good evening"
    )

    trading = context.get("trading", {})
    budget = context.get("budget", {})
    fy_pnl = trading.get("fy_pnl", 0)
    active_algos = trading.get("active_algos", 0)

    monthly = budget.get('this_month_total') or budget.get('monthly') or 0
    monthly_budget = budget.get('monthly_budget') or budget.get('budget_limit') or 30000

    text = f"{greeting}, Karthikeyan. "

    if fy_pnl > 0:
        text += f"FY P&L is +₹{fy_pnl:,.0f}. "
    elif fy_pnl < 0:
        text += f"FY P&L is -₹{abs(fy_pnl):,.0f}. "

    if active_algos > 0:
        text += f"{active_algos} algo{'s' if active_algos > 1 else ''} active today. "

    if monthly and monthly_budget:
        pct = (monthly / monthly_budget) * 100
        if pct > 90:
            text += f"Budget alert: ₹{monthly:,.0f} spent of ₹{monthly_budget:,.0f} ({pct:.0f}%). "
        elif monthly > 0:
            text += f"₹{monthly:,.0f} spent this month of ₹{monthly_budget:,.0f} budget. "

    return text.strip()


async def generate_daily_briefing(context: dict) -> str:
    if settings.google_ai_api_key:
        try:
            import google.genai as genai
            client = genai.Client(api_key=settings.google_ai_api_key)
            trading = context.get("trading", {})
            budget = context.get("budget", {})
            prompt = (
                f"Generate a warm, concise 3-sentence morning financial briefing for Karthikeyan. "
                f"Trading data: {trading}. Budget this month: {budget}. "
                f"Sound like a knowledgeable friend. Use ₹ for amounts. No markdown."
            )
            response = client.models.generate_content(model="gemma-2.0-flash", contents=prompt)
            return response.text
        except Exception:
            pass

    return _format_briefing(context)
