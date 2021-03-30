
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import {useState, useEffect} from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos]= useState([]);
  const [message, setMessage]= useState("");
  
  useEffect(()=>{
    filterHandler();
  }, [status, todos]);

  const filterHandler =() =>{
    switch(status){
      case 'completed':
      const arr = todos.filter(todo=>todo.completed === true);
      setFilteredTodos(arr);
      break;
      case 'uncompleted':
      const arr2 = todos.filter(todo=>todo.completed === false);
      setFilteredTodos(arr2);
      break;
      default:
      setFilteredTodos(todos);
      break;
    }
  }
  return (
    <div className="App">
      <header>
      <h1>Todo List</h1>
      </header>
      <Form todos={todos}
      setTodos={setTodos}
      setStatus={setStatus}
      message={message}
      setMessage={setMessage}/>
      <TodoList todos={todos}
      setTodos={setTodos} 
      filteredTodos = {filteredTodos}    
      />
    </div>
  );
}

export default App;
