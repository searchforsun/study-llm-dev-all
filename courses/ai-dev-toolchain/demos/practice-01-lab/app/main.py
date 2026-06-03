from fastapi import FastAPI

from app.rag.router import router as rag_router

app = FastAPI(title="CorpAssist RAG Test Lab")
app.include_router(rag_router)
