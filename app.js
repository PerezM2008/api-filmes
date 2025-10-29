/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API do projeto da locadora de filmes.
 * Data: 07/10/2025
 * Autor: Matheus Perez
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
const controllerFilme   = require('./controller/filme/controller_filme.js')
const controllerGenero  = require('./controller/genero/controller_genero.js')
const controllerCenario = require('./controller/cenario/controller_cenario.js')
const controllerPersonagem = require('./controller/personagens/controller_personagens.js')

// ============ CONFIGURAÇÕA DA PORTA DE SAIDA ==============

const PORT = process.PORT || 8080;
const app = express();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    app.use(cors());
    next();
})


// ========== ENDPOINTS CRUD - FILMES ==========>

//EndPoint que retorna a lista de filmes
app.get('/v1/locadora/filme', cors(), async (request, response) => {
    let filmes = await controllerFilme.listarFilmes();

    response.status(filmes.status_code);
    response.json(filmes);
});

//EndPoint que retorna um personagem filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let id = request.params.id;

    let filme = await controllerFilme.buscarFilmeId(id);

    response.status(filme.status_code);
    response.json(filme);
});

// POST - Cria recursos novos
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response){
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o personagem, enviamos os dados do body e o content-type 
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)


})
// PUT - update modifica um recurso já existente 
app.put('/v1/locadora/filme/:id', cors(),bodyParserJSON, async function (request, response) {
    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o id do personagem encaminhado pela URL 
    let idFilme = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

app.delete('/v1/locadora/filmes/:id', cors(), async function (request, response) {

    let idFilme = request.params.id

    let filmes = await controllerFilme.excluirFilme(idFilme)

    response.status(filmes.status_code)
    response.json(filmes)
    
})

// ========== ENDPOINTS CRUD - GÊNEROS ==========>

app.get('/v1/locadora/genero', cors(), async (request, response) => {
    let genero = await controllerGenero.listarGeneros();

    response.status(genero.status_code);
    response.json(genero);

});

app.get('/v1/locadora/genero/:id', cors(), async (request, response) => {
    let id = request.params.id;

    let genero = await controllerGenero.filtrarGenerosId(id);

    response.status(genero.status_code);
    response.json(genero);
});

app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function (request, response){
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o personagem, enviamos os dados do body e o content-type 
    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
});

app.put('/v1/locadora/genero/:id', cors(),bodyParserJSON, async function (request, response) {
    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o id do personagem encaminhado pela URL 
    let idGenero = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //
    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)
});

app.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {

    let idGenero = request.params.id

    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
    
})

// ========== ENDPOINTS CRUD - CENÁRIOS ==========>

app.get('/v1/locadora/cenario', cors(), async (request, response) => {
    
    let cenario = await controllerCenario.listarCenario();

    response.status(cenario.status_code);
    response.json(cenario);
})

app.get('/v1/locadora/cenario/:id', cors(), async (request, response) => {
    let id = request.params.id;

    let cenario = await controllerCenario.buscarCenarioId(id);

    response.status(cenario.status_code);
    response.json(cenario);
});

app.post('/v1/locadora/cenario', cors(), bodyParserJSON, async function (request, response){
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o personagem, enviamos os dados do body e o content-type 
    let cenario = await controllerCenario.inserirCenario(dadosBody, contentType)

    response.status(cenario.status_code)
    response.json(cenario)


})

app.put('/v1/locadora/cenario/:id', cors(),bodyParserJSON, async function (request, response) {
    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o id do cenario encaminhado pela URL 
    let idCenario = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //
    let cenario = await controllerCenario.atualizarCenario(dadosBody, idCenario, contentType)

    response.status(cenario.status_code)
    response.json(cenario)
})

app.delete('/v1/locadora/cenario/:id', cors(), async function (request, response) {

    let idCenario = request.params.id

    let personagem = await controllerCenario.excluirCenario(idCenario)

    response.status(cenario.status_code)
    response.json(cenario)
    
})

// ========== ENDPOINTS CRUD - PERSONAGEM ==========>

app.get('/v1/locadora/personagem', cors(), async (request, response) => {
    let personagem = await controllerPersonagem.listarPersonagem();

    response.status(personagem.status_code);
    response.json(personagem);
});

//EndPoint que retorna um personagem filtrando pelo ID
app.get('/v1/locadora/personagem/:id', cors(), async (request, response) => {
    let id = request.params.id;

    let personagem = await controllerPersonagem.buscarPersonagemId(id);

    response.status(personagem.status_code);
    response.json(personagem);
});

app.post('/v1/locadora/personagem', cors(), bodyParserJSON, async function (request, response){
    // Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    // Recebe o content type da requisição
    let contentType = request.headers['content-type']

    // Chama a função da controller para inserir o Personagem, enviamos os dados do body e o content-type 
    let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)

    response.status(personagem.status_code)
    response.json(personagem)


})

app.put('/v1/locadora/personagem/:id', cors(),bodyParserJSON, async function (request, response) {
    //Recebe os dados do body
    let dadosBody = request.body

    //Recebe o id do personagem encaminhado pela URL 
    let idPersonagem = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //
    let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)

    response.status(personagem.status_code)
    response.json(personagem)
})

app.delete('/v1/locadora/personagem/:id', cors(), async function (request, response) {

    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.excluirPersonagem(idPersonagem)

    response.status(personagem.status_code)
    response.json(personagem)
    
})

// ========== ENDPOINTS CRUD - ATOR ==========>

    app.get('/v1/locadora/ator', cors(), async (request, response) => {
        let ator = await controllerAtor.listarAtor();
    
        response.status(ator.status_code);
        response.json(ator);
    
    });
    
    app.get('/v1/locadora/ator/:id', cors(), async (request, response) => {
        let id = request.params.id;
    
        let ator = await controllerAtor.filtrarAtorId(id);
    
        response.status(ator.status_code);
        response.json(ator);
    });
    
    app.post('/v1/locadora/ator', cors(), bodyParserJSON, async function (request, response){
        // Recebe o objeto JSON pelo body da requisição
        let dadosBody = request.body
    
        // Recebe o content type da requisição
        let contentType = request.headers['content-type']
    
        // Chama a função da controller para inserir o personagem, enviamos os dados do body e o content-type 
        let ator = await controllerAtor.inserirAtor(dadosBody, contentType)
    
        response.status(ator.status_code)
        response.json(ator)
    });
    
    app.put('/v1/locadora/ator/:id', cors(),bodyParserJSON, async function (request, response) {
        //Recebe os dados do body
        let dadosBody = request.body
    
        //Recebe o id do personagem encaminhado pela URL 
        let idAtor = request.params.id
    
        //Recebe o content-type da requisição
        let contentType = request.headers['content-type']
    
        //
        let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)
    
        response.status(ator.status_code)
        response.json(ator)
    });
    
    app.delete('/v1/locadora/ator/:id', cors(), async function (request, response) {
    
        let idAtor = request.params.id
    
        let ator = await controllerAtor.excluirAtor(idAtor)
    
        response.status(ator.status_code)
        response.json(ator)
        
    })
    
    
/*/////////////////////////////////////////////////////////////////////*/

app.listen(PORT, function() {
    console.log('API aguardando requisições...')
});
