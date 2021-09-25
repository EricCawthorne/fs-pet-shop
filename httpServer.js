const { readFile } = require("fs/promises");
const { createServer } = require("http");


const server = createServer(async (req, res) => {

    let pathArray = req.url.split('/')
    let pets = await readFile('pets.json', 'utf8')
    let parsedPets = JSON.parse(pets)
    let index = parsedPets[pathArray[2]]

    function failCase() {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end('Not Found')
    }

    function successCase() {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(pathArray[2] ? JSON.stringify(index) : pets) 
    }

    if (pathArray[1] === 'pets') {
        if (pathArray[2]) {
            if (pathArray[2] <= parsedPets.length - 1 && pathArray[2] >= 0) {
                successCase();            
            } else {
                failCase();
            }
        } else {
            successCase();
        }
    } else {
       failCase();
    }
});

server.listen(8000)

