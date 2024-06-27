"use client"
import { Task } from '@/app/page'
import React, { useEffect, useState } from 'react'
interface Props {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

interface SectionProps {
    heading: string,
    value: Task[],
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setTodo: React.Dispatch<React.SetStateAction<Task[]>>
    setInProcess: React.Dispatch<React.SetStateAction<Task[]>>
    setClosed: React.Dispatch<React.SetStateAction<Task[]>>
}
export default function Lists({ tasks, setTasks }: Props) {
    const [todo, setTodo] = useState<Task[]>([])
    const [inProcess, setInProcess] = useState<Task[]>([])
    const [closed, setClosed] = useState<Task[]>([])
    useEffect(() => {
        const ftodo = tasks && tasks.filter(task => task.status === "TODO")
        const finprocess = tasks && tasks.filter(task => task.status === "INPROCESS")
        const fclosed = tasks && tasks.filter(task => task.status === "CLOSED")
        setTodo(ftodo); setClosed(fclosed); setInProcess(finprocess)
    }, [tasks])
    function deleteToDo() {

    }
    const sections = [{ name: "todo", value: todo }, { name: "in process", value: inProcess }, { name: "closed", value: closed }]
    return (
        <div className='h-full w-full min-h-96   gap-10 items-start justify-between max-w-5xl grid grid-cols-3'>
            {
                sections && sections.map((section, i) =>
                    <div key={i}>

                        <Section
                            heading={section.name}
                            value={section.value}
                            tasks={tasks}
                            setClosed={setClosed}
                            setTasks={setTasks}
                            setInProcess={setInProcess}
                            setTodo={setTodo} />
                    </div>
                )
            }

        </div>
    )
}

function Section({ heading, value, tasks, setTasks, setClosed, setInProcess, setTodo }: SectionProps) {
    return (
        <div className='h-full min-w-full flex flex-col items-center gap-2'>
            <h1 className='text-2xl capitalize'>{heading}</h1>
            <p>{value && value.length}</p>
            {
                value && value.map((v, i) =>
                    <ListItem key={i} name={v.name} id={v.id} tasks={tasks} setTasks={setTasks} />
                )
            }


        </div>
    )
}


function ListItem({ name, id, tasks, setTasks }: { name: string, id: string, tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) {
    function deleteToDo() {
        setTasks(prev => {
            const list = tasks.filter(task => task.id !== id)
            localStorage.setItem("tasks", JSON.stringify(list))
            return list
        })
    }
    return (
        <div className='w-full h-16 border rounded-md flex items-center justify-start relative px-3 py-1 bg-green-300'>
            {name}
            <button type='button' onClick={deleteToDo}
                className='absolute flex items-center justify-center top-1 right-1 h-4 w-4 rounded-full bg-red-400'>
                x
            </button>
        </div>
    )
}