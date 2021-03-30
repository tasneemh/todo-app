import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

function Form(props) {
  const {todos, setTodos, setStatus, message, setMessage} = props;
  const { register, handleSubmit, errors } = useForm();

 const getAllTodos = () =>{
  return axios.get(`http://localhost:8080/getalltodos`).then(response=>{
    return response.data.todos;
  }).catch(error=>{
    console.log(error);
  });
 };

  const onSubmit = async (data, event) =>{  
    data.completed = false;
    data.id = uuidv4();   
    const todosArray = await getAllTodos();
    let isDuplicate = false;
    todosArray.forEach(todo=>{
      if (todo.text === data.text){
        console.log("todo: ", todo);
        setMessage(`${data.text} is already present in your todo list`);
        isDuplicate = true;
      }
    });    

  if(!isDuplicate){
    setMessage("");
    axios.post('http://localhost:8080/addnewtodo', {data}).then(response=>{
      setTodos(response.data.todos);
      }).catch(error=>{
      console.log(error);
      });
  } 
    event.target.reset();
  }
  const statusHandler =(event)=>{
    setStatus(event.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className="todo-input"
        name="text"
        autoComplete="off"
        placeholder="Enter your todo"
        ref={register({ required: true })}
        />
        <button className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select name="todos" className="filter-todo"
          ref={register}
          onChange={statusHandler}>
          <option value="all">ALL</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
          </select>        
        </div>
      </form>
      <div className="message">
      { message }
      </div>
    </div>
  )
}

export default Form
