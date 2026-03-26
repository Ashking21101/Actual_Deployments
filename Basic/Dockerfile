# Use the official lightweight Python image
FROM python:3.9-slim

# Set workspace
WORKDIR /app

# Install only what we need: FastAPI, the server (Uvicorn), and OpenAI
RUN pip install --no-cache-dir fastapi uvicorn openai

# Copy the code into the container
COPY main.py .

# App Runner listens on 8080 by default , or 8000, use same in Apprunner 
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]