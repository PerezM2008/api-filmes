/********************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD da tabela Genero no Banco de Dados MySQL
 * Data: 22/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 * 
******************************************************************************** */

//import do arquivo 
const generoDAO = require('../../model/DAO/genero.js');

const MESSAGE_DEFAULT = require('../module/config_messages.js');

//GET - Retorna todos os generos Cadastrados
const listarTodosGeneros = async () => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Variável que chama a função DAO para retornar a lista de generos
        let result = await generoDAO.getAllGenere();

        if (result) {
            if (result.length > 0) {
                let amount = result.length;

                //Prenche os campos criados dentro do arquivo JS de mensagens
                MESSAGE.HEADER.status = MESSAGE.REQUEST_SUCESS.status;
                MESSAGE.HEADER.status_code = MESSAGE.REQUEST_SUCESS.status_code;
                MESSAGE.HEADER.response.movies_amount =  amount;
                MESSAGE.HEADER.response.movies = result;

                return MESSAGE.HEADER; // Retorno 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; // 404
            };
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
        };

    } catch (error){
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER;
    }
};

//GET - Retorno de um Genero especifico filtrado pelo ID pertencente
const filtrarGenerosId = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do ID 
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0){

            //Preserva o arguemento e o transforma em inteiro
            let idInt = parseInt(id)

            let result = await generoDAO.getFilterByGenereId(idInt);

            if (result) {

                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.REQUEST_SUCESS.status;
                    MESSAGE.HEADER.status_code = MESSAGE.REQUEST_SUCESS.status_code;
                    MESSAGE.HEADER.response.movie = result;

                    return MESSAGE.HEADER; //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //404
                }

            } else {

                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS; //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//UPDATE - Atualizar os generos da tabela pelo Id
const atualizarGenero = async (genero, id, contentType) => {
    
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Valida o ContentType
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosGenero(genero)
        
            if(!validarDados){
            
                //Verifica se o ID existe no BD, caso exista teremos o status 200
                let validarID = await filtrarGeneroId(id)

                if(validarID.status_code == 200) {

                    //chama a funçõa do DAO para atualizar um genero
                    genero.id = parseInt(id)

                //chama a função do DAO para inserir um novo genero
                let result = await generoDAO.setUpdateGenere(genero)

                    if(result){
                        MESSAGE.HEADER.status       =  MESSAGE.SUCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code  =  MESSAGE.SUCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message      =  MESSAGE.SUCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response     =   genero


                        return MESSAGE.HEADER //200

                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return validarID //Retorno da Função de buscargeneroID (400 ou 404 ou 500)
                }

            } else {
                return validarDados //Retorno da função de validar dados do genero (400)
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }       
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
};

//INSERT - Adiciona um novo Genero na tabela
const inserirGenero = async (genero, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosGenero(genero)
      
            if(!validarDados){
            
                //chama a função do DAO para inserir um novo genero
                let result = await generoDAO.setInsertGenere(genero)

                if(result){

                    //chama a função para receber o ID gerado do BD
                let lastIdGenere = await generoDAO.getSelectLastIdGenere()

                if(lastIdGenere){
                    //Adiciona no JSON de genero o ID que foi gerado pelo BD
                    genero.id                    =  lastIdGenere
                    MESSAGE.HEADER.status       =  MESSAGE.SUCESS_CREATED_ITEM.status
                    MESSAGE.HEADER.status_code  =  MESSAGE.SUCESS_CREATED_ITEM.status_code
                    MESSAGE.HEADER.message      =  MESSAGE.SUCESS_CREATED_ITEM.message
                    MESSAGE.HEADER.response     =  genero

                    return MESSAGE.HEADER //201
                }
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarDados //400
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch(error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
};

//DELETE - Exclui um genero da tabela 
const excluirGenero = async (id) => {
    //Retorna a mensagem como um JSON
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));
    
    let validarID = await filtrarGenerosId(id)

    if(validarID.status_code == 200){

        let result = await generoDAO.setDeleteGenere(id)

        if(result){
            MESSAGE.HEADER.status            =   MESSAGE.SUCESS_DELETE_ITEM.status
            MESSAGE.HEADER.status_code       =   MESSAGE.SUCESS_DELETE_ITEM.status_code
            MESSAGE.HEADER.message           =   MESSAGE.SUCESS_DELETE_ITEM.message

            return MESSAGE.HEADER //200
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }
};

const validarDadosGenero = async function (genero) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    console.log(genero)

    if(genero.nome == "" || genero.nome == null || genero.nome == undefined || genero.nome.length > 50){

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else {
        return false
}

};


module.exports = {
    listarTodosGeneros,
    filtrarGenerosId,
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    validarDadosGenero
}