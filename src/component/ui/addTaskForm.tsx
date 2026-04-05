"use client";

import { createTask } from "../../lib/actions";
import { useRef } from "react";

export default function AddTaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createTask(formData);
        formRef.current?.reset(); // Biar form kosong lagi setelah input
      }}
      className="mb-10 flex flex-col gap-4 max-w-4xl"
    >
      <input
        name="title"
        type="text"
        placeholder="Apa misimu hari ini?"
        className="bg-zinc-900 border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-500 uppercase font-bold"
        required
      />
      <div className="flex gap-4">
        <input
          name="deadline"
          type="date"
          className="bg-zinc-900 border border-zinc-800 p-4 text-white flex-1 focus:outline-none focus:border-red-500"
          required
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 transition-all uppercase tracking-widest"
        >
          Tambah Misi
        </button>
      </div>
    </form>
  );
}
