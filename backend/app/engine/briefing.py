import httpx
from app.core.config import settings


async def fetch_context() -> dict:
    context = {}
    async with httpx.AsyncClient(timeout=5.0) as client:
        try:
            r = await client.get(f"{settings.staax_api_url}/api/v1/system/stats")
            context["trading"] = r.json() if r.status_code == 200 else {}
        except Exception:
            context["trading"] = {}
        try:
            r = await client.get(f"{settings.budgex_api_url}/api/v1/expenses/summary")
            context["budget"] = r.json() if r.status_code == 200 else {}
        except Exception:
            context["budget"] = {}
    return context


async def generate_daily_briefing(context: dict) -> str:
    if not settings.google_ai_api_key:
        return (
            "Good morning, Karthikeyan. Your LIFEX systems are running. "
            "Have a productive trading day."
        )
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
        return (
            "Good morning, Karthikeyan. Your financial systems are online. "
            "Check STAAX for today's trading opportunities."
        )
