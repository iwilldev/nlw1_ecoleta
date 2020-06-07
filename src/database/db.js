// importar a dependência do sqlite3

const sqlite3 = require("sqlite3").verbose();

// iniciar o objeto para operar banco de dados

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db; // exportando banco de dados

// utilizar o objeto de banco de dados para nossas operações

db.serialize(() => {
    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //inserir dados na tabela
    const query = `INSERT INTO places (name, image, address, address2, state, city, items) VALUES (?,?,?,?,?,?,?);`;
    const values = [
        "Papersider", 
        "https://images.pexels.com/photos/167538/pexels-photo-167538.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", 
        "Guilherme Gemballa, Jardim America", 
        "Nº 260", 
        "Santa Catarina", 
        "Rio do Sul", 
        "Papéis e Papelão"];

    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
    };
    //db.run(query, values, afterInsertData);



    //consultar os dados da tabela
    function showData(err, rows) {
        if(err) {
            return console.log(err);
        }
        console.log("Registros encontrados");
        console.log(rows);
    };
    //db.all(`SELECT * FROM places WHERE id = 22`, showData);



    //delatar um dado na tabela
    function deleteData(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Registro apagado!")
    }
    //db.run(`DELETE FROM places WHERE id = ?`, [6], deleteData);
});