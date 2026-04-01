"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./db";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const deadlineStr = formData.get("deadline") as string;

  if (!title || !deadlineStr) return;

  await prisma.task.create({
    data: {
      title,
      deadline: new Date(deadlineStr),
      isCompleted: false,
    },
  });
  revalidatePath("/");
}

export async function toggleTask(id: string, isCompleted: boolean) {
  await prisma.task.update({
    where: { id },
    data: { isCompleted: !isCompleted },
  });
  revalidatePath("/");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({
    where: { id },
  });
  revalidatePath("/");
}
