require('dotenv').config();

const pg = require('pg').Pool
const pool = new pg({
  user: process.env.USER,
  host: 'localhost',
  database: 'pets',
  password: process.env.PASSWORD,
  port: 5432,
})

const getPetsById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM pet', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

module.exports = {
    getPetsById
}