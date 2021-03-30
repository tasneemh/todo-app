module.exports = (pool) => {
  const addNewTodo = (newTodo) =>{
    const { text, completed, id } = newTodo;
    return pool.query(`
    INSERT INTO todos(text, is_completed, uuid_id) VALUES ($1, $2, $3) RETURNING *;`, [text, completed, id]) 
    .then(response=>{
      return pool.query(`SELECT text AS text, is_completed AS completed, uuid_id AS id FROM todos;`).then(data=>{
        return data.rows;
      })      
    }).catch(error=>{
      return error;
    });
  };
  const getAllTodos = () =>{
    return pool.query(`SELECT * FROM todos;`).then(response=>{
      return response.rows;
    }).catch(error=>{
      console.log(error);
      return error;
    });
  }
  
  const toggleCompleted = (todo) =>{
    let {completed, id} = todo;    
    completed = !completed;
    return pool.query(`UPDATE todos SET is_completed = $1 WHERE uuid_id = $2`, [completed, id]).then(response =>{
      return pool.query(`SELECT text AS text, is_completed AS completed, uuid_id AS id FROM todos;`).then(data=>{
        return data.rows;
      })
    }).catch(error=>{
      return error;
    });
  }
  const deleteTodo = (id) =>{
    return pool.query(`DELETE FROM todos WHERE uuid_id = $1;`, [id]).then(response=>{
      return pool.query(`SELECT text AS text, is_completed AS completed, uuid_id AS id FROM todos;`).then(data=>{
        return data.rows;
      });
    }).catch(error=>{
      return error;
    });
  }
  return{ addNewTodo, toggleCompleted, deleteTodo,  getAllTodos };
}