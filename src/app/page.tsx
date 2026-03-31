"use client";
// import { Task } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import { calculateDecay } from "../lib/decay-logic";
import PreviousMap_ from "postcss/lib/previous-map";

// const prisma = new PrismaClient({});

// const tasks = [
//   {
//     id: "1",
//     title: "Deadline Sangat Dekat",
//     createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 2 hari lalu
//     deadline: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 jam lagi
//   },
//   {
//     id: "2",
//     title: "Tugas Santai",
//     createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Kemarin
//     deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 hari lagi
//   },
// ];

export default function Dasboard() {
  // const tasks = await prisma.task.findMany();

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Deadline Desain UI",
      createdAt: new Date("2026-03-31T12:00:00"),
      deadline: new Date("2026-04-01T12:00:00"),
      isCompleted: false,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleAddTask = () => {
    if (!newTitle || !newDeadline) return alert("Please fill in all fields");

    const newTask = {
      id: Math.random().toString(),
      title: newTitle.toUpperCase(),
      createdAt: new Date(),
      deadline: new Date(newDeadline),
      isCompleted: false,
    };
    setTasks([newTask, ...tasks]);
    setIsOpen(false);
    setNewTitle("");
    setNewDeadline("");
  };

  const toggleComplete = (id: string) => {
    setTasks((PreviousTasks) =>
      PreviousTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((PreviousTasks) =>
        PreviousTasks.filter((task) => task.id !== id),
      );
    }
  };

  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10 font-poppins">
      <h1 className="text-3xl font-bold mb-8 text-red-500 underline">
        Anti-Procrastination-Sistem
      </h1>

      <div className="grid gap-8 max-w-4xl">
        {activeTasks.length === 0 && (
          <p className="text-zinc-600 fon-mono italic">No active tasks.</p>
        )}
        {activeTasks.map((task) => {
          const decayLevel = calculateDecay(task.createdAt, task.deadline);
          return (
            <div
              className="border border-zinc-800 p-8 bg-zinc-950 shadow-2xl relative overflow-hidden group"
              key={task.id}
            >
              {decayLevel > 90 && (
                <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
              <div className=" flex justify-between items-center mb-6 z-10 relative">
                <div className=" flex-1">
                  <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">
                    {task.title}
                  </h2>
                  <p className="text-xs font-mono text-zinc-500">
                    CREATED: {task.createdAt.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm font-mono text-zinc-500">
                    DEADLINE: {task.deadline.toLocaleString("id-ID")}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => toggleComplete(task.id)}
                    className="p-2 border border-zinc-800 hover:bg-green-600 transition-colors rounded-md text-xs font-bold"
                  >
                    {" "}
                    DONE{" "}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 border border-zinc-800 hover:bg-red-600 transition-colors rounded-md text-xs font-bold"
                  >
                    {" "}
                    X{" "}
                  </button>
                </div>
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
                      ? "bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.7)]" // Efek glow kalau bahaya
                      : decayLevel > 50
                        ? "bg-orange-600"
                        : "bg-zinc-500" // Warna netral kalau baru mulai
                  }`}
                  // className={`h-full transition-all duration-1000 ${decayLevel > 90 ? "bg-red-600 animate-pulse" : "bg-zinc-400"}`}
                  style={{ width: `${decayLevel}%` }}
                />
                <span className="absolute -top-6 right-0 text-xs font-mono text-zinc-500">
                  {decayLevel}% DECAYED
                </span>
              </div>

              {/* <div className="text-sm text-zinc-400">
                <p>CREATED: {new Date(task.createdAt).toLocaleString()}</p>
                <p>DEADLINE: {new Date(task.deadline).toLocaleString()}</p>
              </div>

              <div>
                <div
                  className="h-full bg-red-600 transtion-all duration-500 ${decayLevel >= 80 ? 'bg-red-600' animation-pulse' : 'bg-zinc-500'}"
                  style={{ width: `${decayLevel}` }}
                />
              </div> */}
            </div>
          );
        })}
      </div>

      {completedTasks.length > 0 && (
        <div className="mt-20 max-w-4xl">
          <h3 className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">
            Completed Tasks
          </h3>
          <div className="space-y-3 opacity-50">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center border border-zinc-800 p-4 bg-zinc-900"
              >
                <span className="line-through text-zinc-600 font-bold uppercase tracking-tight">
                  {task.title}
                </span>
                <button
                  className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 hover:text-white"
                  onClick={() => toggleComplete(task.id)}
                >
                  UNDO
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 w-20 h-20 bg-red-600 rounded-full text-5xl font-black shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:bg-red-700 transition-all hover:scale-110 active:scale-95"
      >
        +
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border-2 border-red-600 p-8 w-full max-w-md shadow-[0_0_50px_rgba(220,38,38,0.2)]">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-widest text-red-600">
              New Task
            </h2>
            <div>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="WHAT NEEDS TO BE DONE ?"
                className="w-full bg-black border-b-2 border-zinc-800 p-3 outline-none focus:border-red-600 transition-colors uppercase font-bold"
              />

              <input
                type="datetime-local"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full bg-black border-b-2 border-zinc-800 p-3 outline-non focus:border-red-600 transition-colors uppercase font-bold"
              />
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-zinc-800 py-4 hover:bg-zinc-900 font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 font-bold transition-all"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
