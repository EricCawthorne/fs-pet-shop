const { Pool } = require('pg')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

const pool = new Pool({
  database: 'petshop',
})

app.post('/pets', async (req, res) => {
    const { name, age, kind } = req.body
    const postData = await pool.query(
        'INSERT INTO pets (name, age, kind) VALUES ($1, $2, $3) RETURNING *', [name, age, kind]
    );
    res.set('Content-Type', 'application/json')
    res.status(200)
res.end(`Added: ${JSON.stringify(postData.rows[0])} to table 'pets'`)
})

app.get('/pets/:id', async (req, res) => {
    let id = req.params.id
    let readData = await pool.query(
        'SELECT * FROM pets WHERE pet_id = $1', [id]
        );
    if (readData.rows.length === 0) {
        res.status(404)
        res.set('Content-type', 'text/plain')
        res.end(`There is no pet with an id of ${id}`)
    } else {
        res.status(200)
        res.set('Content-Type', 'application/json')
        res.end(JSON.stringify(readData.rows))
    }
})

app.patch('/pets/:id', async (req, res) => {
    let id = req.params.id
    let valueToChange = Object.keys(req.body).toString()
    let newValue = req.body[valueToChange]
    let rowCount = await pool.query(
        'SELECT * FROM pets WHERE pet_id = $1', [id]
    );
    let columnName = ''
    if (valueToChange === 'name') {
        columnName += 'name'
    } else if (valueToChange === 'age') {
        columnName += 'age'
    } else if (valueToChange === 'kind') {
        columnName += 'kind'
    }
        let changeData = await pool.query(
            `UPDATE pets SET ${columnName} = $1 WHERE pet_id = $2`, [newValue, id]
            );
            if (rowCount.rows.length != 0) {
                res.status(200)
                res.set('Content-Type', 'application/json')
                res.end(`Updated 'pets' at pet_id: ${id} with ${JSON.stringify(req.body)}`)
            } else {
                res.status(404)
                res.set('Content-type', 'text/plain')
                res.end(`There is no pet with an id of ${id}`)
            }
})

app.delete('/pets/:id', async (req, res) => {
    let id = req.params.id
    let rowCount = await pool.query(
        'SELECT * FROM pets WHERE pet_id = $1', [id]
    );
    let deleteData = await pool.query(
        'DELETE FROM pets WHERE pet_id = $1', [id]
    )
    if (rowCount.rows.length != 0) {
        res.status(200)
        res.set('Content-Type', 'application/json')
        res.end(`Deleted pet ${id} from 'pets' table`)
    } else {
        res.status(404)
        res.set('Content-type', 'text/plain')
        res.end(`Pet at id: ${id}, does not exist`)
    }
})

app.listen(port, (err) => {
    console.log("Listening at port:" + port)
})