# Take Home Assessment - Full Stack Engineer

## Task
Modify the starter project in the repository to implement a user-friendly and creative solution for tracking and displaying the progress of a long-running backend process. The goal is to provide feedback as tasks are completed or fail. You are free to design the solution using a progress bar or any alternative you find effective.

## System Overview
- The front end will trigger 50 simultaneous requests to the backend, simulating a long-running process
- The backend will sleep for 30 seconds to 2 minutes (random for each individual request) per request to simulate processing (you can adjust this for testing purposes)
- Both the backend and frontend code are fully customizable. Feel free to modify the architecture and design, provided the core requirements are met

## Requirements

### 1. Progress Tracking
- Implement a mechanism to track the progress of the process as the 50 backend tasks complete or fail
- The user should be kept informed with clear and intuitive updates
- You are encouraged to explore creative solutions and are not limited to traditional progress bars

### 2. Resilience and Fault Tolerance
- The system should handle temporary issues (e.g., network delays, partial task failures) gracefully, without requiring user intervention
- The process should not break if some tasks encounter errors or delays

### 3. User Feedback and Completion
- Provide meaningful feedback once the process completes, including successes, failures, or any relevant status summaries

### 4. Things to Not Be Caught Up On
- Don't worry about authentication or authorization
- Don't worry about the UI design, just use a UI library (It should look uniform)

## Scoring Criteria

### 1. User Experience (UX)
- A smooth and intuitive user interface that effectively communicates progress

### 2. Code Quality
- Clean, maintainable, and modular code
- Proper use of reusable components and separation of concerns
- Effective error handling and adherence to best practices

### 3. Robustness
- The system should handle errors, network issues, and other temporary problems without breaking the process
- Ensure the system gracefully reflects the process status, even if some tasks fail


## Submission
- Please submit your solution as a fork of this repository.
- Include a README.md file with your thoughts and any additional notes.