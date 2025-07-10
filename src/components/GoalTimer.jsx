import React, { useState, useEffect } from "react";
import "../App.css";

export default function GoalTimer() {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isRunning, setIsRunning] = useState(false);
  const wordGoal = 500;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, timeLeft]);

  const wordCount = () => {
    const text = document.getElementById("editor")?.innerText || "";
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="timer-box">
      <div>
        Goal: {wordGoal} words | Time left: {formatTime()} | Words written: {wordCount()}
      </div>
      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
    </div>
  );
}
