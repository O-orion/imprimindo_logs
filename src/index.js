import database from "../database.json" assert { type: "json" };
import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from 'readline';
import Person from "./persona.js";
import axios from "axios";


DraftLog(console).addLineListener(process.stdin);

const options = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.blueBright("ID") },
        { field: "name", name: chalk.greenBright("name") },
        { field: "email", name: chalk.yellowBright("email") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: chalk.redBright("Km Traveled") },
        { field: "from", name: chalk.cyanBright("From") },
        { field: "to", name: chalk.cyan("To") },
    ]
}

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Imprimindo tabela após usuário escolher o idioma pelo terminal
terminal.question("Insira seu indioma ", async (lang) => {
    console.log(`Idioma selecionado: , ${lang}!`);

    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        const persons = data.map(user => new Person({
            id: user.id,
            name: user.name,
            email: user.email,
            vehicles: ['Car', 'Bike'],
            kmTraveled: 10000,
            from: "2000-01-01",
            to: "2023-12-31"
        }))

        const formattedPersons = persons.map((person) => person.formatted(lang))
        const table = chalkTable(options, formattedPersons);
        const print = console.draft(table);
        
    } catch(err) {
        
    }
    terminal.close();
    
});