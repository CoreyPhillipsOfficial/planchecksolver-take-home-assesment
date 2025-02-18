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
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
)

# @app.get("/process")
# async def process(request: Request):
#     sleep_time = random.randint(30, 120)
#     await asyncio.sleep(sleep_time)
    
#     return Response("ok", status_code=200)

async def process_task(task_id: str):
    "Simulate long-running task with random failure chance"
    try:
        # Adjust the vlues for testing vs final version
        delay = random.randint(5, 10) if __debug__ else random.randint(30, 120)
        # 20% chance of failure
        failure_chance = 0.2

        await asyncio.sleep(delay)

        if random.random() < failure_chance:
            raise RuntimeError(f"Simulated failure for task {task_id}")
        
        task_states[task_id] = "completed"
    except Exception as e:
        task_states[task_id] = f"failed: {str(e)}"
    finally:
        # Cleanup logic if needed
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)