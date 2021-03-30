const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pool = require('./sqldb/db');
const sqldbHelpers = require('./sqldb/dbHelpers/index')(pool);

const app = express();
const PORT = 8080;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
app.get("/getalltodos", (request, response)=>{
  sqldbHelpers.getAllTodos().then(todosArr=>{
  console.log("todosArr: in getAlltodos: in server", todosArr);
    if (!todosArr){
      response.send({error: "error"});
      return;
    }
    console.log("Hello: ");
    response.send({todos: todosArr});
    
  }).catch(error=>{
    console.log(error);
    return error;
  });
});

app.post("/addnewtodo", (request, response)=>{
  const data = request.body.data;
  sqldbHelpers.addNewTodo(data).then(todosArr=>{   
    if (!todosArr){
      response.send({error: "error"});
      return;
    }
    response.send({
      todos: todosArr
    });
  }).catch(error=>response.send(error));
  
});

app.delete("/deletetodo/:id", (request, response)=>{
  const id = request.params.id;
  sqldbHelpers.deleteTodo(id).then(todosArr=>{
    console.log("response inside server: ", todosArr);
     if (!todosArr){
      response.send({error: "error"});
      return;
    }
    response.send({
      todos: todosArr
    });
  }).catch(error=>{
    return error;
  });
});

app.put("/togglecompleted/:id", (request, response)=>{
  const todo = request.body.element;
  sqldbHelpers.toggleCompleted(todo).then(todosArr=>{
    if (!todosArr){
      response.send({error: "error"});
    } else{
      response.send({todos: todosArr});
    }
  }).catch(error=>{
    return error;
  });
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});