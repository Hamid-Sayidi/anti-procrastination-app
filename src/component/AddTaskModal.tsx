"use client";
import { useState } from "react";
import { createTask } from "../lib/actions";

export default function AddTaskModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const handleAddTask = async () => {
    if (!newTitle || !newDeadline) return alert("Semua field harus diisi?");
    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("deadline", newDeadline);

    await createTask(formData);
    setIsOpen(false);
    setNewTitle("");
    setNewDeadline("");
  };

  return (
    <>
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
    </>
  );
}
