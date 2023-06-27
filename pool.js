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

const getPets = (request, response) => {
    //const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM pet', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getDogs = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query(
        `SELECT pet.id,pet.name, dogs.age, dogs.breed, dogs.color, pet.owner FROM pet INNER JOIN dogs on pet.id = dogs.id;`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getDogById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        `SELECT pet.id,pet.name, dogs.age, dogs.breed, dogs.color, pet.owner FROM pet INNER JOIN dogs on pet.id = dogs.id WHERE pet.id = ${id};`, (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

const getCats = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query(
        `SELECT pet.id,pet.name, cats.age, cats.breed, cats.color, pet.owner FROM pet INNER JOIN cats on pet.id = cats.id;`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getCatById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(
        `SELECT pet.id,pet.name, cats.age, cats.breed, cats.color, pet.owner FROM pet INNER JOIN cats on pet.id = cats.id WHERE pet.id = ${id};`, (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).json(results.rows)
      })
}

const createPet = (request, response) => {
    const { name, type, ownerID} = request.body;

    pool.query('Insert INTO pet (name, type, owner) Values ($1, $2, $3) returning *;', [name, type, ownerID], (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updatePet = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, type, ownerID} = request.body;
    pool.query (
        'UPDATE pet SET name = $1, type = $2, owner = $3 WHERE id = $4', [name, type, ownerID, id], (error, results) => {
            if(error) {
                throw error
            }
            response.status(200).json(results.rows)
        }
    )

}

const deletePet = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query (
        `DELETE FROM pet Where id = ${id}`, (error, results) => {
            if(error) {
                throw error
            }
            response.status(200).json(results.rows)
        }
    )
}

module.exports = {
    getPets,
    createPet,
    updatePet,
    deletePet,
    getCatById,
    getDogById,
    getCats,
    getDogs
}