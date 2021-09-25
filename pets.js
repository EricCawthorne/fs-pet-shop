const { argv } = require('process');
const { exit } = require('process');
const { readFile, writeFile } = require('fs/promises');

async function main() {
    //show the command input after node pets.js
    let command = argv[2]
    //check if a command was input
    if (command) {
        //read the json file and parse the value
        const dataString = await readFile('pets.json', 'utf8');
        const data = JSON.parse(dataString)
        //check what the command was
        if (command === 'read') {
            let index = argv[3]
            if (!index) {
                console.log(data)
            } else if (index > data.length - 1){
                console.error('Search index not found')
                exit(1)
            } else {
                console.log(data[index])
            }
        } else if (command === 'create') {
            let ageValue = Number(argv[3])
            let kindValue = argv[4]
            let nameValue = argv[5]
            if (!ageValue || !kindValue || !nameValue) {
                console.error('Usage: node pets.js create AGE KIND NAME');
                exit(1)
            } else { 
               let newPet = {
                   'age': ageValue,
                   'kind': kindValue,
                   'name': nameValue
               }
               data.push(newPet)
               let stringified = JSON.stringify(data)
               await writeFile('pets.json', stringified, 'utf8')
               console.log(data)
            }
        } else if (command === 'update') {
            let index = argv[3]
            let ageValue = Number(argv[4])
            let kindValue = argv[5]
            let nameValue = argv[6]
            if (!index || !ageValue || !kindValue || !nameValue) {
                console.error('Usage: node pets.js update INDEX AGE KIND NAME');
                exit(1);
            } else if (index > data.length - 1) {
                console.error('The index you entered does not exist')
                exit(1)
            } else {
                let updatedPet = {
                    'age': ageValue,
                    'kind': kindValue,
                    'name': nameValue
                }
                data[index] = updatedPet
                let stringified = JSON.stringify(data);
                await writeFile('pets.json', stringified, 'utf8')
                console.log(data)
            }       
        } else if (command === 'destroy') {
            let index = argv[3]
            if (!index) {
                console.error('Usage: node pets.js destroy INDEX')
            } else if (index > data.length - 1) {
                console.error('The index you entered does not exist')
            } else {
                data.splice(index, 1)
                let stringified = JSON.stringify(data)
                await writeFile('pets.json', stringified, 'utf8')
                console.log(data)
            }
        }
    } else {
        console.error('Usage: node pets.js [read | create | update | destroy]');
        exit(1);
    }
}

main();