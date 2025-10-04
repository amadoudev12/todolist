import TaskCard from "./TaskCard"
type task = {
    id:number,
    name: string,
    completed:boolean,
    date:string
}

type TaskCardProps = {
  tasks: task[],
  onDelete : (id:number)=>void,
  onComplete: (taskId: number)=>void,
  changeTask:(taskId: number,editValue:string )=>void,
  activeTasks: boolean
  completeTask: boolean

}
export default function TaskList({tasks, onDelete, onComplete,  changeTask, activeTasks, completeTask}:TaskCardProps) {
    const filterTask = () => {
        if(activeTasks) {
            return tasks.filter((task) => !task.completed)
        } else if(completeTask) {
            return tasks.filter((task) => task.completed)
        } else {
            return tasks
        }
    }
const filteredTask = filterTask()
  return (
    <div>
        {
            filteredTask.length > 0 ? (
            <div  className="grid grid-cols-3 flex-wrap gap-6 max-sm:grid-cols-1">
                {
                    filteredTask.map((task:task)=>{
                        return (
                            <TaskCard 
                            key={task.id}
                            task={task}
                            onDelete={() => onDelete(task.id)}
                            onComplete={()=>{onComplete(task.id)}}
                            changeTask={(newTask)=>{changeTask(task.id,newTask)}}/>
                        )
                }) 
                }
            </div>
            ):(
                <div className="w-full flex justify-center items-center border-1 py-10 border-dashed rounded-md text-gray-600 text-center">
                    Aucune tâche pour le moment. Ajoutez votre première tâche ci-dessus.
                </div>
            )
        }
    </div>
  )
}
