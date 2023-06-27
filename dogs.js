//not use and set up properly yet...

const { request, response } = require('express');

require('dotenv').config();

const pg = require('pg').Pool
const pool = new pg({
  user: process.env.USER,
  host: 'localhost',
  database: 'pets',
  password: process.env.PASSWORD,
  port: 5432,
})

const getDogs = (request, response) => {
  
    pool.query('SELECT * FROM dogs', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const updateDog = (request, response) => {
    const id = parseInt(request.params.id);
    const { petID, breed, age, color, ownerID} = request.body;
    pool.query (
        'UPDATE dogs SET id = $1, breed = $2, age = $3, color = $4, owner = $5 WHERE id = $6', [petID, breed, age, color, ownerID, id], (error, results) => {
            if(error) {
                throw error
            }
            response.status(200).json(results.rows)
        }
    )

}

const deleteDog = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query (
        `DELETE FROM dog Where id = ${id}`, (error, results) => {
            if(error) {
                throw error
            }
            response.status(200).json(results.rows)
        }
    )
}