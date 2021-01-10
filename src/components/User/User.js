import React, { useEffect, useState } from 'react'
import { db } from '../Firebase/Firebase'

export const User = (props) => {

    const [task, setTask] = useState([])
    const [tasks, setTasks] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState('')

    useEffect(() => {
        const getInformation = async () => {
            try {
                const data = await db.collection(props.user.email).get()
                console.log(data)
                const dataArray = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setTask(dataArray)
            } catch (error) {
                console.log("error::", error)
            }
        }

        getInformation()
    }, [])

    const newTask = async (e)=>{
        e.preventDefault()
        if (!tasks.trim()){
            console.log("Por favor valida que no este vacio")
            return
        }
        try {
            const newItem = {
                name: tasks,
                date: Date.now(),
            }
            const data = await db.collection(props.user.email).add(newItem)
            setTask([
                ...task,
                {...newItem, id: data.id}
            ])
            setTasks('')
        } catch (error) {
            console.log("Falla", error)
        }
        console.log("task", tasks)
    }

    const deletes = async (id) =>{
        try {
            await db.collection('task').doc(id).delete()
            const filteredData =task.filter(item => item.id !== id)
            setTask(filteredData)
        } catch (error) {
            console.log("task", error)   
        }
    }

    const activateEdit = (item) => {
        setEditMode(true)
        setTasks(item.name)
        setId(item.id)
    }

    const edit = async (e) => {
        e.preventDefault()
        if(!tasks.trim()){
            console.log("Valida que no este vacio")
            return
        }
        try {
            await db.collection(props.user.email).doc(id).update({
                name: tasks
            })
            const filtersData = task.map( item => (
                item.id === id ? {id: item.id, date: item.date, name: tasks} : item
            ))
            setEditMode(false)
            setTasks('')
            setId('')
            setTask(filtersData)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="container m-5">
            <div className="row">
                <div className="col-6">
                <h1>Tareas Por hacer</h1>
                <ul className="list-group">
                    {
                        task.length === 0 ? (
                            <li className="list-group-item">No hay tareas para mostar</li>
                        ) : (
                            task.map(item => ( 
                                <li className="list-group-item " key={item.id}>
                                    <span className="lead">{item.name}</span>
                                    <button 
                                        className="btn btn-danger btn-sm float-right mx-2"
                                        onClick={() => deletes(item.id)}
                                    >
                                        Eliminar Tarea
                                    </button>
                                    <button 
                                        className="btn btn-warning btn-sm float-right "
                                        onClick={() => activateEdit(item) }    
                                    >
                                        Editar Tarea
                                    </button>
                                </li>
                            ))
                        )
                    }
                </ul>
                </div>                
                <div className="col-md-6">
                    <h1>Formulario</h1>
                    <h2>
                        {
                            editMode ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h2>
                    <form onSubmit={editMode ? edit : newTask}>
                        <input
                            type="text"
                            placeholder="Ingresa la tarea"
                            className="form-control mb-2"
                            onChange={e => setTasks(e.target.value)}
                            value={tasks}
                        />
                        <button 
                        className={
                            editMode ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
                        }
                        type="submit"
                        >
                            {
                                editMode ? 'Editar' : 'Agregar'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default User