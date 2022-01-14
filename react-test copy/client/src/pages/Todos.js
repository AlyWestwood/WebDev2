import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Todos() {

    const [todoList, setTodoList] = useState([]);
    let navigate = useNavigate();

    const deleteTodo = (id) => {
        console.log("about to delete todo # " + id)
        axios.delete(`/todos/${id}`).then(res => {
            const newList = todoList.filter(todo => todo.id !== id);
            if(res){
                setTodoList(newList);
            }
        });
    }

    const changeStatus = (id, value) => {
        axios.patch(`/todos/${id}`, {isDone: value});
    }

    useEffect(() => {
    axios.get('/auth',{
        headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
    }).then(res => {
        console.log(res.data.id)
        axios.get('/todos', {headers:{ownerId: res.data.id}}).then( res => {
        if(!res.data.error){
            setTodoList(res.data);
        }
    });

    })
    }, []);

    return (
        <div>
            {todoList.map((todo) => {
            return (
            <div key={todo.id} className="todo card">
                <div className='card-body'>
                <div className="task card-title">{todo.task}</div>
                <div className="dueDate card-subtitle text-muted">{todo.dueDate}</div>
                <select value={todo.isDone} onChange={()=>changeStatus(todo.id)}><option value="true">done</option><option value="false">not done</option></select>
                <button className="btn btn-danger" type="button" onClick={(event) => {deleteTodo(todo.id, event.target.value)}}>delete</button>
                </div>
            </div>
            )})}

        </div>
    )
}

export default Todos