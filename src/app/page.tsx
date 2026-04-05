// import { Task } from "@prisma/client";
// import { PrismaClient } from "@prisma/client";
import TaskCard from "../component/ui/TaskCard";
import { deleteTask, toggleTask, getTasks } from "../lib/actions";
import AddTaskForm from "../component/ui/addTaskForm";
// import { prisma } from "../lib/db";

// const prisma = new PrismaClient({});

interface Task {
  id: string;
  title: string;
  createdAt: Date;
  deadline: Date;
  isCompleted: boolean;
}

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

export default async function Dasboard() {
  const tasks = (await getTasks()) as Task[];
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  // const [tasks, setTasks] = useState([
  //   {
  //     id: "1",
  //     title: "Deadline Desain UI",
  //     createdAt: new Date("2026-03-31T12:00:00"),
  //     deadline: new Date("2026-04-01T12:00:00"),
  //     isCompleted: false,
  //   },
  // ]);

  // const [isOpen, setIsOpen] = useState(false);
  // const [newTitle, setNewTitle] = useState("");
  // const [newDeadline, setNewDeadline] = useState("");

  // const handleAddTask = () => {
  //   if (!newTitle || !newDeadline) return alert("Please fill in all fields");

  //   const newTask = {
  //     id: Math.random().toString(),
  //     title: newTitle.toUpperCase(),
  //     createdAt: new Date(),
  //     deadline: new Date(newDeadline),
  //     isCompleted: false,
  //   };
  //   setTasks([newTask, ...tasks]);
  //   setIsOpen(false);
  //   setNewTitle("");
  //   setNewDeadline("");
  // };

  // const toggleComplete = (id: string) => {
  //   setTasks((PreviousTasks) =>
  //     PreviousTasks.map((task) =>
  //       task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
  //     ),
  //   );
  // };

  // const deleteTask = (id: string) => {
  //   if (confirm("Are you sure you want to delete this task?")) {
  //     setTasks((PreviousTasks) =>
  //       PreviousTasks.filter((task) => task.id !== id),
  //     );
  //   }
  // };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-10 font-poppins">
      <h1 className="text-3xl font-bold mb-8 text-red-500 underline">
        Anti Procrastination Sistem
      </h1>

      <AddTaskForm />

      {/* <div className="grid gap-8 max-w-4xl">
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
      </div> */}

      {/* {completedTasks.length > 0 && (
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
      )} */}
      <div className="grid gap-6 max-w-4xl">
        {activeTasks.length === 0 && (
          <p className="text-zinc-600 font-mono italic">
            No urgent tasks. Relax, but stay sharp.
          </p>
        )}

        {activeTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {completedTasks.length > 0 && (
        <div className="mt-20 max-w-4xl">
          <h3 className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">
            Misi Berhasil
          </h3>
          <div className="space-y-3 opacity-50">
            {completedTasks.map((task: Task) => (
              <div
                key={task.id}
                className="flex justify-between items-center border border-zinc-800 p-4 bg-zinc-900"
              >
                <form
                  action={async () => {
                    "use server";
                    await toggleTask(task.id, false);
                  }}
                >
                  <button
                    type="submit"
                    className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-1 hover:text-white"
                  >
                    RECOVER
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
