"use client";
// import { Task } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import TaskCard from "../component/ui/TaskCard";

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
        Anti Procrastination Sistem
      </h1>

      <div className="grid gap-8 max-w-4xl">
        {activeTasks.length === 0 && (
          <p className="text-zinc-600 fon-mono italic">No active tasks.</p>
        )}
        {activeTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={toggleComplete}
            onDelete={deleteTask}
          />
        ))}
      </div>

      {/* {completedTasks.length > 0 && ( */}
      {tasks.some((task) => task.isCompleted) && (
        <div className="mt-20 max-w-4xl">
          <h3 className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">
            Tugas Selesai
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
              Tugas Baru
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
                className="w-full bg-black border-b-2 border-zinc-800 p-3 outline-none focus:border-red-600 transition-colors uppercase font-bold"
              />
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-zinc-800 py-4 hover:bg-zinc-900 font-bold transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddTask}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 font-bold transition-all"
                >
                  Tambahkan Tugas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
