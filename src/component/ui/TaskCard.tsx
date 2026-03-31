import { calculateDecay } from "@/src/lib/decay-logic";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    createdAt: Date;
    deadline: Date;
    isCompleted: boolean;
  };
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}
export default function TaskCard({
  task,
  onComplete,
  onDelete,
}: TaskCardProps) {
  const decayLevel = calculateDecay(task.createdAt, task.deadline);

  return (
    <div
      className="border border-zinc-800 p-8 bg-zinc-950 shadow-2xl relative overflow-hidden group"
      key={task.id}
    >
      {decayLevel > 90 && (
        <div className="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <div className=" flex justify-between items-center mb-6 z-10 relative ">
        <div className=" flex-1">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">
            {task.title}
          </h2>
          <p className="text-xs font-mono text-zinc-500">
            Tugas Dibuat : {task.createdAt.toLocaleString("id-ID")}
          </p>
          <p className="text-sm font-mono text-zinc-500">
            Batas Akhir : {task.deadline.toLocaleString("id-ID")}
          </p>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 border border-zinc-800 hover:bg-red-600 transition-colors rounded-md text-xs font-bold -mt-4 -mr-4"
          title="Hapus Tugas"
        >
          {" "}
          X{" "}
        </button>
      </div>

      <div className="flex justify-between items-center mb-6 z-10 relative">
        <button
          onClick={() => onComplete(task.id)}
          className="py-2 px-6 border border-green-800 bg-green-950 hover:bg-green-600 transition-colors rounded-md text-xs font-bold "
        >
          {" "}
          Selesai{" "}
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
    </div>
  );
}
