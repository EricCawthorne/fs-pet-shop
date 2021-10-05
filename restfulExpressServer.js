const express = require('express');
const { readFile, writeFile, appendFile } = require('fs/promises');
const { parse } = require('path');
const app = express();

app.use(express.json());




app.post('/pets', async (req, res) => {
    let body = req.body
    let data = await readFile('pets.json', 'utf8')
    let parsedData = JSON.parse(data)
    parsedData.push(body)
    await writeFile('pets.json', JSON.stringify(parsedData))
    res.status(200)
    res.set('Content-Type', 'application/json')
    res.end(JSON.stringify(body))
});

app.get('/pets/:index', async (req, res) => {
    let data = await readFile('pets.json', 'utf8')
    let parsedData = JSON.parse(data)
    let index = JSON.parse(req.params.index) - 1
    if (index > parsedData.length - 1 || index < 0) {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.end('Not Found')
    } else {
        res.status(200)
        res.set('Content-Type', 'application/json')
        res.end(JSON.stringify(parsedData[index]))
    }
});

app.patch('/pets/:index', async (req, res) => {
    let valueToChange = Object.keys(req.body).toString()
    let newValue = req.body[valueToChange]
    let data = await readFile('pets.json', 'utf8')
    let parsedData = JSON.parse(data)
    let index = JSON.parse(req.params.index) - 1
    let selectedPet = parsedData[index]
    if (selectedPet[valueToChange]){
        selectedPet[valueToChange] = newValue
        await writeFile ('pets.json', JSON.stringify(parsedData))
        res.status(201)
        res.set('Content-Type', 'application/json')
        res.end(JSON.stringify(parsedData))
    } else {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.end('Description Not Found, you can change name, age, or kind.')
    }
})

app.delete('/pets/:index', async (req, res) => {
    let data = await readFile('pets.json', 'utf8')
    let parsedData = JSON.parse(data)
    let index = JSON.parse(req.params.index) - 1
    if (index < parsedData.length && index >= 0) {
        parsedData.splice(index, 1)
        await writeFile('pets.json', JSON.stringify(parsedData))
        res.status(200)
        res.set('Content-Type', 'application/json')
        res.end(JSON.stringify(parsedData))
    } else {
        res.status(404)
        res.set('Content-Type', 'text/plain')
        res.end('Index Not Found')
    }
})


app.listen(4000, () => {
    console.log('Listening at port 4000')
})

module.exports = app;