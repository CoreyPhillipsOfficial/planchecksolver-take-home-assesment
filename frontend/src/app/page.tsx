"use client";

import { useState, useEffect } from "react";

type TaskStatus = {
  status: string;
  progress: number;
  error?: string;
};

export default function Home() {
  const [processState, setProcessState] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [status, setStatus] = useState<{
    total: number;
    completed: number;
    failed: number;
    individual: Record<string, TaskStatus>;
  }>({ total: 0, completed: 0, failed: 0, individual: {} });

  useEffect(() => {
    if (processState !== 'processing') return;
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus({
        total: data.total,
        completed: data.completed,
        failed: data.failed,
        individual: data.individual
      });

      // Auto-complete handling
      if (data.completed + data.failed === data.total) {
        setProcessState('completed'); // Update process state to completed
        ws.close();                   // Close the WebSocket connection
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => ws.close();

  }, [processState]);

  const startProcess = async () => {
    setProcessState('processing');
    setStatus({
      total: 0,
      completed: 0,
      failed: 0,
      individual: {}
    }); // Reset the status state
    try {
      // Reset tasks on the backend
      await fetch('http://localhost:8000/reset', { method: 'POST' });

      // Start processing
      const response = await fetch('http://localhost:8000/start', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to start');
    } catch (error) {
      setProcessState('idle'); // Reset state on error
      alert('Failed to start processing');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <main className="text-center w-full max-w-4xl px-4">
        <button
          onClick={() => {
            if (processState === 'idle' || processState === 'completed') {
              startProcess();
            }
          }}
          disabled={processState === 'processing'}
          className="inline-flex items-center bg-black justify-center gap-2 rounded-lg text-sm font-medium text-white hover:bg-black/80 h-11 px-8 py-2 shadow-lg transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {processState === 'processing'
            ? 'Processing...'
            : processState === 'completed'
              ? 'Completed! Start over?'
              : 'Start Process'}
        </button>

        {/* Progress Display Section */}
        {processState !== 'idle' && (
          <div className="mt-8 space-y-6 animate-fade-in">
            {/* Existing progress display code */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              {/* Progress Bar */}
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${((status.completed + status.failed) / status.total) * 100}%`
                  }}
                />
              </div>

              {/* Status Indicators */}
              <div className="mt-4 flex justify-center gap-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Completed: {status.completed}
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  Failed: {status.failed}
                </span>
              </div>
            </div>

            {/* Task Grid */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 p-4 bg-gray-50 rounded-lg">
              {Object.entries(status.individual).map(([taskId, taskInfo]) => (
                <div
                  key={taskId}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs p-1
                    ${taskInfo.status.includes('failed')
                      ? 'bg-red-400 hover:bg-red-500'
                      : taskInfo.status === 'completed'
                        ? 'bg-green-400 hover:bg-green-500'
                        : 'bg-gray-400 hover:bg-gray-500'
                    }`
                  }
                  title={`Task ${taskId}: ${taskInfo.status}`}
                >
                  {taskInfo.status === "failed" ? (
                    <span className="text-white">Failed</span>
                  ) : taskInfo.status === "completed" ? (
                    <span className="text-white">100%</span>
                  ) : (
                    <>
                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        {taskInfo.progress > 0 && (
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${taskInfo.progress}%` }}
                          />
                        )}
                      </div>
                      <span>{taskInfo.progress}%</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}