# Task Processing Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A full-stack application demonstrating real-time progress tracking for concurrent tasks, built with FastAPI and Next.js. Designed for a full-stack software engineer role assessment.

![Task Processing Demo](./demo-screenshot.png)

## Features

### Progress Tracking & User Feedback
- 🕒 Real-time updates via WebSocket connections
- 📊 Two-level progress visualization:
  - **Global Progress Bar**: Overall completion percentage
  - **Task Grid**: 50 individual task indicators with color-coded statuses
- 🎯 Completion states clarity:
  - ✅ Completed (Green)
  - ❌ Failed (Red)
  - ⏳ In-progress (Gray + percentage)

### Resilience & Fault Tolerance
- 🛡 20% simulated failure rate for robustness testing
- 🔄 Automatic WebSocket reconnection handling
- 💪 Graceful error handling at both backend and frontend layers
- 🔄 Process restart capability without manual intervention

### Technical Implementation
- ⚡ FastAPI backend with ASGI server (uvicorn)
- 🚀 Next.js 13 frontend with App Router
- 🎨 Tailwind CSS for modern, responsive styling
- 🔄 Bi-directional WebSocket communication

## System Architecture

### Backend (FastAPI)
- 🐍 Python
# Key Features:
- REST endpoints: /start, /reset
- WebSocket endpoint: /ws
- Global state management for task statuses
- Randomized task durations (30-120s simulation)
- Background task processing
Frontend (Next.js)
typescript


### Key Features:
- WebSocket integration with auto-reconnect
- State management for process status
- Responsive grid layout (5-10 columns based on viewport)
- Interactive UI components with hover states
- Error boundary handling
Getting Started
Prerequisites
Node.js 18+ & npm
Python 3.10+
Modern web browser
Installation
Backend Setup
bash


cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
Frontend Setup
bash


cd frontend
npm install
Running the Application
Start Backend
bash


uvicorn main:app --reload --host 0.0.0.0 --port 8000
Start Frontend
bash


npm run dev
Access the application at http://localhost:3000
Usage Workflow
Click "Start Process" to initiate 50 concurrent tasks
Observe real-time updates in:
Global progress bar (top)
Color-coded task grid
Completed/Failed counters
After completion:
Button changes to "Completed! Start over?"
Click to reset and restart the process
Technical Highlights
Backend Resilience
Automatic State Initialization: Async lifespan management
Concurrent Processing: Background tasks with error isolation
WebSocket Optimization: 500ms update intervals
CORS Configuration: Secure cross-origin policies
Frontend UX
State Management:
typescript


const [processState, setProcessState] = useState<'idle' | 'processing' | 'completed'>('idle');
const [status, setStatus] = useState<{/*...*/}>(initialState);
Responsive Design:
Mobile-first grid layout
Smooth animations for state transitions
Accessibility:
Semantic HTML elements
Color contrast ratios for visibility
Title attributes for task details
License
This project is licensed under the MIT License - see LICENSE for details.
Developer Contact
[Your Name]
[Your Email]
[LinkedIn Profile]