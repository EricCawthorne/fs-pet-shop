const express = require('express')
const { readFile } = require('fs/promises')
const app = express()
const port = process.env.PORT || 3000


    app.get('/', (req, res) => {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.end('Not Found')
    })
    
    app.get('/pets', async (req, res) => {
        const data = await readFile('pets.json', 'utf8')
        res.status(200)
        res.set('Content-Type', 'application/json')
        res.end(data)
    })
    
    app.get('/pets/:index', async (req, res) => {
        const data = await readFile('pets.json', 'utf8')
        const parsedData = JSON.parse(data)
        const index = req.params.index
        if (index < parsedData.length && index >= 0) {
            res.status(200)
            res.set('Content-Type', 'application/json')
            res.end(JSON.stringify(parsedData[index]))
        } else {
            res.status(404)
            res.set('Content-Type', 'text/plain')
            res.end('Not Found') 
        }
    })

    // app.post('/pets/:age/:kind/:name', async (req, res) => {

    //     let newPet = req.params
    //     res.end(JSON.stringify(newPet) )
    // })
    
    app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}`)
    })


    module.exports = app;