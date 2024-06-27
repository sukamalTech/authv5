'use client'
import Lists from "@/components/lists";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export type Task = {
  id: string
  name: string
  status: "TODO" | "INPROCESS" | "CLOSED"
}
const defaultValues: Task = {
  id: "",
  name: "",
  status: "TODO"
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([defaultValues])
  const [task, setTask] = useState<Task>(defaultValues)
  useEffect(() => {
    if (localStorage.getItem('tasks') === null) {
      localStorage.setItem('tasks', JSON.stringify([])); // Initialize as an empty array
    }
    //@ts-ignore
    setTasks(JSON.parse(window.localStorage.getItem("tasks")))

  }, [])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTasks((prev) => {
      const list = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(list))
      return list
    })
    setTask(defaultValues)
  }

  return (
    <main className="flex flex-col items-center">
      <div className=" flex items-center justify-center h-20">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input type="text" className="border rounded-md px-3 h-12 w-60"
            name="todo"
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value, id: uuidv4() })}
          />
          <button className="h-12 w-32 bg-black text-white rounded-md" type="submit">Create task</button>
        </form>
      </div>
      <Lists tasks={tasks} setTasks={setTasks} />
    </main>
  );
}
