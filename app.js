/*******************************************************************************************
 * Objetivo: Arquivo respnsável pelas requisições da API do projeto da locadora de filmes.
 * Data: 07/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');

//Cria um objeto especialista no formato JSON para receber os dados do body (POST e PUT)
const bodyParserJSON = bodyParser.json()

// ========== IMPORT'S CONTROLLER'S ==========
//Controller Filme
const controllerFilme = require('./controller/filme/controller_filme.js')

// ===========================================

const PORT = process.PORT || 8080;

const app = express();

//cors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    app.use(cors());
    next();
})


// ========== ENDPOINTS CRUD ==========

//EndPoint que retorna a lista de filmes
app.get('/v1/locadora/filme', cors(), async (request, response) => {
    let filmes = await controllerFilme.listarFilmes();

    response.status(filmes.status_code);
    response.json(filmes);
});

//EndPoint que retorna um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let id = request.params.id;

    let filme = await controllerFilme.buscarFilmeId(id);

    response.status(filme.status_code);
    response.json(filme);
});

app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response){
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o filme, enviamos os dados do body e o content-type 
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)


})

app.put('/v1/locadora/filme/:id', cors(),bodyParserJSON, async function (request, response) {
    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o id do filme encaminhado pela URL 
    let idFilme = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

app.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {

    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
    
})
// ====================================

app.listen(PORT, function() {
    console.log('API aguardando requisições...')
});
