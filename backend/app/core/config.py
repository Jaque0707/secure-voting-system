from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int = 5432
    DB_NAME: str

    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    INITIAL_ADMIN_USERNAME: str
    INITIAL_ADMIN_PASSWORD: str

    class Config:
        env_file = ".env"


settings = Settings()