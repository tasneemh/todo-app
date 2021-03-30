const { Pool } = require('pg');

const pool = new Pool({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'todos_db',
  port: 5432,
});

pool.connect((err) => {
  if (err) throw new Error(err);
})

console.log('postgrel sql db connection establishing...');
//exporting pool in 
module.exports = pool;