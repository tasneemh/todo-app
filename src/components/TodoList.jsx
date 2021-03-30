import React from "react";
import Todo from "./Todo";
function TodoList(props) {
  const {todos, setTodos, filteredTodos} = props; 
  return (
    <div className="todo-container">
      <ul className="todo-list">
      {filteredTodos.map(todo=>
        <Todo key={todo.id} todo={todo}
        todos={todos}
        setTodos={setTodos}
        />
        )}     
      </ul>
    </div>
  )
}

export default TodoList;
