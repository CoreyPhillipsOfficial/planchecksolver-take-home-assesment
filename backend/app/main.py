from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import random
import asyncio
from typing import Dict

# Global state management
task_states: Dict[str, str] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize all tasks as pending
    global task_states
    task_states = {str(i): {"status": "pending"} for i in range(50)}
    yield
    task_states.clear()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,

)

@app.get("/process")
async def process(request: Request):
    sleep_time = random.randint(30, 120)
    await asyncio.sleep(sleep_time)
    
    return Response("ok", status_code=200)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)