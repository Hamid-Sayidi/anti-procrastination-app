// import { Task } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
import { calculateDecay } from "../lib/decay-logic";

// const prisma = new PrismaClient({});

const tasks = [
  {
    id: "1",
    title: "Deadline Sangat Dekat",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 2 hari lalu
    deadline: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 jam lagi
  },
  {
    id: "2",
    title: "Tugas Santai",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Kemarin
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 hari lagi
  },
];

export default async function Dasboard() {
  // const tasks = await prisma.task.findMany();

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10 font-poppins">
      <h1 className="text-3xl font-bold mb-8 text-red-500 underline">
        Anti-Procrastination-Sistem
      </h1>

      <div>
        {tasks.map((task) => {
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
                <div className=" space-y-1">
                  <h2 className="text-xl font-bold uppercase tracking-widest">
                    {task.title}
                  </h2>
                  <p className="text-sm font-mono text-zinc-500">
                    CREATED: {task.createdAt.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm font-mono text-zinc-500">
                    DEADLINE: {task.deadline.toLocaleString("id-ID")}
                  </p>
                </div>
                <span
                  className={`text-xl font-mono ${decayLevel > 90 ? "text-red-500 animate-pulse" : "text-zinc-400"}`}
                >
                  DECAY: {decayLevel}%
                </span>
              </div>

              <div className="w-full h-5 bg-zinc-800 rounded-none overflow-hidden border-2 border-zinc-700 z-10 relative">
                <div
                  className={`h-full transition-all duration-1000 ease-out ${
                    decayLevel > 90
                      ? "bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.7)]" // Efek glow kalau bahaya
                      : decayLevel > 50
                        ? "bg-orange-600"
                        : "bg-zinc-500" // Warna netral kalau baru mulai
                  }`}
                  style={{ width: `${decayLevel}%` }}
                />
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

      <button className="fixed bottom-10 right-10 w-20 h-20 bg-red-600 rounded-full text-5xl font-black shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:bg-red-700 transition-all hover:scale-110 active:scale-95">
        +
      </button>
    </div>
  );
}
