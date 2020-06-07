const express = require("express");
const server = express();

// upload arquivo (multer e body-parser)
const bodyParser= require('body-parser');
const multer = require('multer');
server.use(bodyParser.urlencoded({extended: true}));

// configurando armazenamento das imagens

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage });

// pegar o banco de dados

const db = require("./database/db");

// configurar pasta pública

server.use(express.static("public"));

server.use(express.static("uploads"));

// habilitar req.body

server.use(express.urlencoded({extended: true}));

// utilizando template engine

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurando caminhos da minha aplicação

// página inicial
// req: requisição
// res: resposta

server.get("/", (req, res) => {
    return res.render("index.html");
});

server.get("/new-point", (req, res) => {

    return res.render("new-point.html");
});

server.post("/save-point", upload.single("image"), (req, res, next) => {

    // Upload da imagem
    
    console.log(req.file);
    const file = req.file;
    if (!file) {
        const error = new Error('Adicione uma imagem!');
        error.httpStatusCode = 400;
        return next(error);
    }
    imageurl = file.filename

    // req.body - corpo do formulário

    const query = `INSERT INTO places (name, image, address, address2, state, city, items) VALUES (?,?,?,?,?,?,?);`;
    const values = [
        req.body.name, 
        imageurl, 
        req.body.address, 
        req.body.address2, 
        req.body.state, 
        req.body.city, 
        req.body.items];

    function afterInsertData(err) {
        if(err) {
            return res.render("new-point.html", {erroEnvio: true});
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
        return res.render("new-point.html", {saved: true});
    };
    db.run(query, values, afterInsertData);

    // deletar novos dados automaticamente após 2 minutos

    function deleteData(err){
        if(err) {
            return console.log(err);
        }
        console.log("Registro apagado automaticamente!")
    }
    
    function deleteAuto() {
        (db.run(`DELETE FROM places WHERE id > ?`, [5], deleteData));
    }

    setTimeout(deleteAuto, 120000);

});

server.get("/results", (req, res) => {

    const search = req.query.search;

    // sem conteúdo na busca
    if(search == "") {
        // mostrar a página vazia
        return res.render("results.html", {total: 0});
    }
    // pegando dados da db

    function showData(err, rows) {
        if(err) {
        return console.log(err);
        }
        //console.log("Registros encontrados");
        //console.log(rows);

        const total = rows.length;

        // mostrar a página html com os dados da db
        return res.render("results.html", {places: rows, total});
    };
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, showData);
});

// server.post("/save-point", upload.single('image'), (req, res, next) => {
    
//     const file = req.file;
//     if (!file) {
//         const error = new Error('Please upload a file');
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     res.send(file);
//     console.log(multer.diskStorage.filename);
// });



// ligando o servidor

server.listen(3000);