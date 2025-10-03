import { useEffect, useState } from "react"
import TaskCard from "./components/TaskCard"
import "./index.css"
type task = {
    id:number,
    name: string,
    completed:boolean
}
export default function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState<task[]>([])
  useEffect(()=>{
    const savedTask = localStorage.getItem('tasks')
    try{
      if(savedTask){
      setTasks(JSON.parse(savedTask)) // recpee les Ajouts
    }
    }catch(erreur){
      console.log(erreur);
      
    }
  },[])
  const addTask = ()=>{
      if(task.trim()!== ""){
        setTasks(prevtask=>[
          ...prevtask,
          {
            id:prevtask.length + 1,
            name:task,
            completed:false
          }
        ])
          setTask('') 
      }      
  }
  //  ajouter le tableau de tache dans le local storage 
  useEffect(()=>{
    if(tasks.length >0){
      localStorage.setItem('tasks', JSON.stringify(tasks))
      console.log('taches sauvegardés', tasks);
      
    }
    console.log('kk');
    
  },[tasks])



  const deleTask = (id:number)=>{
    setTasks(tasks.filter(t=>t.id !== id))
    console.log(tasks)
  }
  const EditTaskFunction = (id:number,newTask:string)=>{
    setTasks(tasks.map((t)=>(t.id === id ? {...t, name:newTask} : t )))
  }
  const taskCompletFuction = (id:number)=>{
    setTasks(tasks.map((t)=>{
      return (
        t.id == id ? {...t, completed:true}:t
      )
    }))
    console.log(tasks)
    
  }
  return (
    <div className="px-10 py-2">
        <div className="mb-15 flex  items-center justify-center gap-5">
          <div className="flex flex-col mt-4 rounded-md shadow-md px-4 py-2">
            <h2 className="text-1xl mb-5 text-[#884dee]">Ajouter une tache</h2>
            <div className="flex items-center gap-3 pb-12">
              <input value={task} onChange={(e)=>{setTask(e.target.value)}} className="w-lg px-2 outline-0 rounded-md" type="text" />
              <button onClick={addTask} className="rounded-md bg-[#884dee] text-white p-1 hover:bg-violet-400 pointer-cursor">Ajouter</button>
            </div>
          </div>
        </div>
        {
          tasks.length > 0 && (
            <div className="flex justify-between items-center w-full">
              <div className="card flex justify-between items-center  w-[30%] rounded-lg py-3 px-4 mb-4 shadow-md bg-white border-1 border-[#884dee] hover:shadow-lg transition-shadow">
                <div>
                  <h3>Total</h3>
                  <h2>{tasks.length}</h2>
                </div>
                <div className="w-[35px] h-[35px] rounded-full bg-[#884dee]"></div>
              </div>
              <div className="card flex justify-between items-center  w-[30%] rounded-lg py-3 px-4 mb-4 shadow-md bg-white border-1 border-[#884dee] hover:shadow-lg transition-shadow ">
                <div>
                  <h3>Total</h3>
                  <h2>{tasks.length}</h2>
                </div>
                <div className="w-[35px] h-[35px] rounded-full bg-[#884dee]"></div>
              </div>
                <div className="card flex justify-between items-center  w-[30%] rounded-lg py-3 px-4 mb-4 shadow-md bg-white border-1 border-[#884dee] hover:shadow-lg transition-shadow ">
                  <div>
                    <h3>Total</h3>
                    <h2>{tasks.length}</h2>
                  </div>
                  <div className="w-[35px] h-[35px] rounded-full bg-[#884dee]"></div>
              </div>
            </div>
          ) 
        }
        <div className="flex items-center flex-wrap gap-6">
          {
          tasks.map((task)=>{
            return (
              <TaskCard key={task.id} task={task} onDelete={()=>{deleTask(task.id)}} changeTask={(newTask)=>{EditTaskFunction(task.id,newTask)}} onComplete={()=>{taskCompletFuction(task.id)}} /> 
            )
          })
        }
        </div>
    </div>
  )
}
