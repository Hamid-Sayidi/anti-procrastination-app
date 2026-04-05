"use client";

import { calculateDecay } from "@/src/lib/decay-logic";
import { useState, useEffect } from "react";
import { deleteTask, toggleTask } from "../../lib/actions";

// Interface yang lebih rapi
interface Task {
  id: string;
  title: string;
  createdAt: Date;
  deadline: Date;
  isCompleted: boolean;
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const decayLevel = calculateDecay(task.createdAt, task.deadline);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = new Date(task.deadline).getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft("WAKTU HABIS");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, [task.deadline]);

  // Fungsi handler internal agar tidak perlu oper props dari server component
  const handleComplete = async () => {
    try {
      await toggleTask(task.id, task.isCompleted);
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Hapus misi ini?")) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error("Gagal hapus tugas:", error);
      }
    }
  };

  return (
    <div className="border border-zinc-800 p-8 bg-zinc-950 shadow-2xl relative overflow-hidden group">
      {decayLevel > 90 && (
        <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      <div className="flex justify-between items-center mb-6 z-10 relative">
        <div className="flex-1">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">
            {task.title}
          </h2>

          {!task.isCompleted && (
            <div className="mb-2">
              <span className="text-xs font-mono px-2 py-1 bg-red-600/10 border border-red-600/20 text-red-500">
                TIME LEFT: {timeLeft}
              </span>
            </div>
          )}

          <p className="text-xs font-mono text-zinc-500">
            Dibuat: {new Date(task.createdAt).toLocaleDateString("id-ID")}
          </p>
          <p className="text-sm font-mono text-zinc-500">
            Deadline: {new Date(task.deadline).toLocaleDateString("id-ID")}
          </p>
        </div>

        <button
          onClick={handleDelete}
          className="p-2 border border-zinc-800 hover:bg-red-600 transition-colors rounded-md text-xs font-bold -mt-4 -mr-4"
          title="Hapus Tugas"
        >
          X
        </button>
        <button
          onClick={handleComplete}
          className="p-2 border border-zinc-800 hover:bg-green-600 transition-colors rounded-md text-xs font-bold -mt-4 -mr-4"
          title="Tandai Selesai"
        >
          {" "}
          Selesai{" "}
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 z-10 relative">
        <button
          onClick={handleComplete}
          className={`py-2 px-6 border transition-colors rounded-md text-xs font-bold ${
            task.isCompleted
              ? "border-zinc-700 bg-zinc-800 text-zinc-500"
              : "border-green-800 bg-green-950 hover:bg-green-600 text-white"
          }`}
        >
          {task.isCompleted ? "Selesai" : "Tandai Selesai"}
        </button>
        <span
          className={`text-xl font-mono ${decayLevel > 90 ? "text-red-500 animate-pulse" : "text-zinc-400"}`}
        >
          DECAY: {decayLevel}%
        </span>
      </div>

      <div className="w-full h-4 bg-zinc-900 rounded-none overflow-hidden border border-zinc-800 relative">
        <div
          className={`h-full transition-all duration-1000 ease-out ${
            decayLevel > 90
              ? "bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.7)]"
              : decayLevel > 50
                ? "bg-orange-600"
                : "bg-zinc-500"
          }`}
          style={{ width: `${decayLevel}%` }}
        />
        <span className="absolute -top-6 right-0 text-xs font-mono text-zinc-500">
          {decayLevel}% DECAYED
        </span>
      </div>
    </div>
  );
}
