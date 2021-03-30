import axios from 'axios';
import React from 'react'

function Todo(props) {
  const {todo, todos, setTodos} = props; 
  const completeHandler = () =>{
    const arr = todos.map(element =>{
      if (element.id === todo.id){
        const id = element.id;
        console.log("id: ", id);
        axios.put(`http://localhost:8080/togglecompleted/${id}`, { element }).then(response=>{
          console.log("response inside todos: ",response.data.todos);
          setTodos(response.data.todos);
        }).catch(error=>{
          console.log(error);
        });
      }
      return element;
    });
  }

 const deleteHandler = () =>{
   const arr = todos.map(element=>{
     if (element.id === todo.id){
     const id = element.id;
     console.log("id: ", id);
     axios.delete(`http://localhost:8080/deletetodo/${id}`, { element }).then(response=>{
       console.log("response inside todo",response);
       setTodos(response.data.todos);
     }).catch(error =>{
       console.log("error inside todo: ",error);
     }); 
     }
   });
 }
  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed ? "completed": ""}`}>{todo.text}</li>
      <button onClick={completeHandler} className="complete-btn"><i className="fas fa-check"></i></button>
      <button onClick={deleteHandler} className="trash-btn"><i className="fas fa-trash"></i></button>
    </div>
  )
}

export default Todo;
