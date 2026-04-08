from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    finex_port: int = 8003
    staax_api_url: str = "http://localhost:8000"
    invex_api_url: str = "http://localhost:8001"
    budgex_api_url: str = "http://localhost:8002"
    google_ai_api_key: str = ""

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
