import { useEffect, useState } from "react"
import TaskList from "./components/TaskList"
import { Progress } from "./components/ui/progress"
import "./index.css"
type task = {
    id:number,
    name: string,
    completed:boolean,
    date:string
}
export default function App() {
  const [task, setTask] = useState("")
  const[allTasks, setallTasks] = useState(true)
  const[activeTasks, setactiveTasks] = useState(false)
  const[completeTasks, setcompleteTasks] = useState(false)
  // recupération des données depui le local storage
  const [tasks, setTasks] = useState<task[]>(()=>{
  const savedTask = localStorage.getItem('tasks')
    return savedTask ? JSON.parse(savedTask) : []
  })
  const taskF = tasks.filter((task)=>(task.completed != false)) //taches terminées
  const taskActive = tasks.filter((task)=>(task.completed != true)) //taches en cours
  const progresValue = tasks.length > 0  ? Math.round((taskF.length / tasks.length)*100) : 0
    const viewActiveTask = ()=>{
        setactiveTasks(!activeTasks)
        setallTasks(false)
        setcompleteTasks(false)
    }
    const viewcompleteTask = ()=>{
        setactiveTasks(false)
        setallTasks(false)
        setcompleteTasks(!completeTasks)
    }
    const viewAllTask = ()=>{
        setactiveTasks(false)
        setallTasks(!allTasks)
        setcompleteTasks(false)
    }
  //  ajouter le tableau de tache dans le local storage 
  useEffect(()=>{
      localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])
  // fontion pour ajouter une tache 
  const addTask = ()=>{
    const date = new Date()
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = date.getFullYear()
    console.log(day)
    
      const completeDate = `${day}/${month}/${year}`
      if(task.trim()!== ""){
        setTasks(prevtask=>[
          ...prevtask,
          {
            id:prevtask.length + 1,
            name:task,
            completed:false,
            date: completeDate
          }
        ])
          setTask('') 
      }   
  }
// fontion pour supprimer une tache 
  const deleTask = (id:number)=>{
    setTasks(tasks.filter((t)=>t.id != id))
    console.log('tache supprimé !!')
  }
  // fontion pour modifier une tache 
  const EditTaskFunction = (id:number,newTask:string)=>{
    setTasks(tasks.map((t)=>(t.id === id ? {...t, name:newTask} : t )))
  }
  // fontion pour completer une tache 
  const taskCompletFuction = (id:number)=>{
    setTasks(tasks.map((t)=>{
      return (
        t.id == id ? {...t, completed:true}:t
      )
    }))
  }
  
  return (
    <div className="px-10 py-2">
        <div className="mb-8 flex items-center justify-center px-4 mt-4">
            <div className="w-full max-w-md flex flex-col rounded-md shadow-md px-6 py-4 sm:px-8 sm:py-6 bg-white">
              <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-[#884dee] font-semibold text-center">
                Ajouter une tâche
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <input 
                  value={task} 
                  onChange={(e) => {setTask(e.target.value)}} 
                  className="flex-1 px-4 py-2 outline-none rounded-md border border-gray-300 
                            focus:border-[#884dee] focus:ring-2 focus:ring-[#884dee] focus:ring-opacity-20
                            transition-all" 
                  type="text"
                  placeholder="Entrez une tâche..." 
                />
                <button 
                  onClick={addTask} 
                  className="rounded-md bg-[#884dee] text-white px-6 py-2 
                            hover:bg-violet-400 active:bg-violet-600
                            transition-colors cursor-pointer font-medium
                            whitespace-nowrap">
                  Ajouter
                </button>
              </div>
            </div>
          </div>
          {/* barre de progression  */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-700">Progression</p>
                <span className="text-sm font-semibold text-[#884dee]">
                  {taskF.length}/{tasks.length}
                </span>
              </div>
              <Progress 
                value={tasks.length > 0 ? progresValue : 0} 
                className="w-full h-2" 
              />
            </div>

            <div className="flex justify-between items-center w-full max-sm:grid max-sm:grid-cols-1">
              <div className="card flex justify-between items-center  w-[30%] max-sm:w-[100%] rounded-lg py-3 px-4 mb-4 shadow-md bg-white border-1 border-[#884dee] hover:shadow-lg transition-shadow">
                <div>
                  <h3>Total</h3>
                  <h2>{tasks.length}</h2>
                </div>
                <div className="w-[35px] h-[35px] rounded-full bg-[#884dee]"></div>
              </div>
              <div className="card flex justify-between items-center  w-[30%] max-sm:w-[100%] rounded-lg py-3 px-4 mb-4 shadow-md bg-white border-1 border-[#884dee] hover:shadow-lg transition-shadow ">
                <div>
                  <h3>Terminés</h3>
                  <h2>{taskF.length}</h2>
                </div>
                <div className="w-[35px] h-[35px] rounded-full bg-[#884dee]"></div>
              </div>
                <div className="card flex justify-between items-center  w-[30%] max-sm:w-[100%] rounded-lg py-3 px-4 mb-4 shadow-md bg-white border-1 border-[#884dee] hover:shadow-lg transition-shadow ">
                  <div>
                    <h3>En cours</h3>
                    <h2>{taskActive.length}</h2>
                  </div>
                  <div className="w-[35px] h-[35px] rounded-full bg-[#884dee]"></div>
              </div>
            </div>
            {/* barre de nevigation  */}
            <nav className="flex justify-between mb-5 max-sm:flex-col max-sm:gap-3 ">
              <div>
                <h2 className="text-[25px] font-bold text-gray-700">Nos tâches</h2>
              </div>
              <div>
                <ul className="flex  gap-4  shadow-md  bg-gray-300 items-center justify-center py-2 rounded-full px-2  max-sm:justify-start">
                  <button className={`${allTasks ? "bg-[#884dee] px-2 rounded-full text-white": "bg-none"}`} onClick={viewAllTask}>Toutes</button>
                  <button className={`${activeTasks ? "bg-[#884dee] px-2 rounded-full text-white" : "bg-none"}`} onClick={viewActiveTask}>Actives</button>
                  <button className={`${completeTasks ? "bg-[#884dee] px-2 rounded-full text-white": "bg-none"}`} onClick={viewcompleteTask}>Terminées</button>
                </ul>
              </div>
            </nav>
        <div>
          {
            tasks.length > 0 ?(
            <TaskList 
              tasks={tasks}
              onDelete={deleTask}
              onComplete={taskCompletFuction}
              changeTask={EditTaskFunction}
              activeTasks={activeTasks}
              completeTask={completeTasks}
            />
            ):(
              <div className="w-full flex justify-center items-center border-1 py-10 border-dashed rounded-md text-gray-600 text-center">
                Aucune tâche pour le moment. Ajoutez votre première tâche ci-dessus.
              </div>
            )
          }
         
        </div>
    </div>
  )
}
