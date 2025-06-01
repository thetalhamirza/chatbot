from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React default port
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    message: str

@app.post("/ask")
async def ask_ai(data: Message):
    with open("prompt_init.txt", "r", encoding="utf-8") as f:
        system_prompt = f.read().strip()
    try:
        completion = client.chat.completions.create(
            model="llama3-8b-8192",
            # Load system prompt from file

            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": data.message}
            ]

        )
        return {"reply": completion.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}
