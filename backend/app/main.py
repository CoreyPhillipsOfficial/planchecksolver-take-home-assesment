from fastapi import FastAPI, BackgroundTasks, WebSocket, WebSocketDisconnect, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import random
import asyncio
from typing import Dict

# Global state management
task_states: Dict[str, str] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize all tasks as pending with 0% progress
    global task_states
    task_states = {str(i): {"status": "pending", "progress": 0} for i in range(50)}
    yield
    task_states.clear()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
)

async def process_task(task_id: str):
    "Simulate long-running task with incremental progress updates"
    try:
        # Total duration for the task
        total_delay = random.randint(30, 120) # Can adjust amount of time here
        failure_chance = 0.2

        # Number of progress updates
        steps = 100
        step_delay = total_delay / steps

        for i in range(steps):
            # Simulate work
            await asyncio.sleep(step_delay)
            # Update progress
            task_states[task_id]['progress'] = int(((i + 1) / steps) * 100)
            task_states[task_id]['status'] = "in_progress"

        # After completing all steps, determine if the task fails or succeeds
        if random.random() < failure_chance:
            raise RuntimeError(f"Simulated failure for task {task_id}")

        task_states[task_id]['status'] = "completed"

    except Exception as e:
        task_states[task_id]['status'] = "failed"
        task_states[task_id]['error'] = str(e)
    finally:
        pass

@app.post("/start")
async def start_process(background_tasks: BackgroundTasks):
    "Endpoint to trigger processing of all tasks"
    for task_id in task_states:
        background_tasks.add_task(process_task, task_id)
    return {"message": "50 tasks started"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    "WebSocket connection for real-time updates"
    await websocket.accept()
    try:
        while True:
            # Aggregate statuses
            status = {
                "total": len(task_states),
                "completed": sum(1 for s in task_states.values() if s.get('status') == "completed"),
                "failed": sum(1 for s in task_states.values() if s.get('status') == "failed"),
                "individual": task_states  # Includes progress for each individual task
            }
            await websocket.send_json(status)
            await asyncio.sleep(0.5)

    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception as e:
        print(f"WebSocket error: {str(e)}")

@app.post("/reset")
async def reset_tasks():
    global task_states
    task_states = {str(i): {"status": "pending", "progress": 0} for i in range(50)}
    return {"message": "Tasks reset"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)