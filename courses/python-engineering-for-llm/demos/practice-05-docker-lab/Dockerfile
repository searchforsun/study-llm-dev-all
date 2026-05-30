FROM python:3.12-slim
WORKDIR /app
COPY demos/practice-01-fastapi-intro-lab/main.py ./main.py
RUN pip install --no-cache-dir fastapi uvicorn pydantic
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
