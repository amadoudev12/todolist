import { useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { GoPencil } from "react-icons/go";

type Task = {
  name: string
  completed: boolean
  date:string
}

type TaskCardProps = {
  task: Task,
  onDelete ?: ()=>void
  onComplete?: ()=>void
  changeTask:(editValue:string)=>void
}
export default function ({task,onDelete, changeTask,onComplete}:TaskCardProps) {
    const [update, setUpdate] = useState(false)
    const [checked, setChecked]= useState(task.completed)
    const [editValue, setEditValue] = useState(task.name)
    
    const chageUpdate = ()=>{
        setUpdate(!update)
    }
    // console.log(checked)
    const editFunction = (task:string)=>{
        changeTask(task)
        setUpdate(false)
    }

  return (
<div className="card min-h-[100px] rounded-lg py-3 px-4 mb-4 shadow-md bg-white border-l-4 border-[#884dee] hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between gap-4">
        {!update ? (
            <div className="flex  gap-3 flex-1 min-w-0">
               <div>
                 <input 
                    type="checkbox"
                    checked={checked} 
                    onChange={() => {setChecked(!checked)}}
                    className="w-5 h-5 my-2 rounded border-gray-300 text-[#884dee] focus:ring-[#884dee] cursor-pointer flex-shrink-0 "
                    onClick={onComplete}
                />
               </div>
                <div>
                    {!checked ? (
                        <div className="flex flex-col ">
                            <div >
                                <h2 className="text-[17px] break-words text-gray-800">{task.name}</h2>
                            </div>
                            <h2 className="text-[12px] break-words text-gray-500 ">Ajoutée le {task.date}</h2>
                        </div>
                    ) : (
                        <div className="flex flex-col ">
                            <div>
                                <del className="text-[15px] break-words text-gray-400">{task.name}</del>
                            </div>
                            <del className="text-[12px] break-words text-gray-400">Ajoutée le {task.date}</del>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            <div className="flex items-center gap-2 flex-1 max-sm:flex-col  ">
                <input 
                    type="text" 
                    onChange={(e) => {setEditValue(e.target.value)}} 
                    defaultValue={task.name}
                    className=" flex-1 px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#884dee] focus:ring-2 focus:ring-[#884dee] focus:ring-opacity-20"
                /> 
                <div className="flex gap-2">
                <button 
                    onClick={() => {editFunction(editValue)}}
                    className="px-4 py-2 bg-[#884dee] text-white rounded-md hover:bg-violet-600 transition-colors"
                >
                    Valider
                </button>
                <button 
                    onClick={() => {setUpdate(false)}}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Annuler
                </button>
                </div>
            </div>
        )}
        <div className="flex items-center gap-4 flex-shrink-0">
            <GoPencil 
                onClick={chageUpdate}
                className="text-[15px] text-gray-600 hover:text-[#884dee] cursor-pointer transition-colors"
            />
            <FaRegTrashAlt 
                className="text-[15px] text-gray-400 hover:text-red-600 cursor-pointer transition-colors" 
                onClick={onDelete}
            />
        </div>
    </div>
</div>
  )
}
