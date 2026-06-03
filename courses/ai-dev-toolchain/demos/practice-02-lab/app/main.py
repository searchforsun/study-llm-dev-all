from fastapi import FastAPI

from app.rag.router import router

app = FastAPI(title="CorpAssist Doc Lab", version="1.0.0")
app.include_router(router)
