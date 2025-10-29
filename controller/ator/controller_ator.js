/********************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD da tabela Genero no Banco de Dados MySQL
 * Data: 29/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 * 
******************************************************************************** */

//import do arquivo 
const atorDAO = require('../../model/DAO/ator.js');

const MESSAGE_DEFAULT = require('../module/config_messages.js');

//GET - Retorna todos os ator Cadastrados
const listarAtor = async () => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Variável que chama a função DAO para retornar a lista de generos
        let result = await atorDAO.getAllAtor();

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
const filtrarAtorId = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação do ID 
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0){

            //Preserva o arguemento e o transforma em inteiro
            let idInt = parseInt(id)

            let result = await atorDAO.getFilterByAtorId(idInt);

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
const atualizarAtor = async (Ator, id, contentType) => {
    
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Valida o ContentType
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosAtor(Ator)
        
            if(!validarDados){
            
                //Verifica se o ID existe no BD, caso exista teremos o status 200
                let validarID = await filtrarAtorId(id)

                if(validarID.status_code == 200) {

                    //chama a funçõa do DAO para atualizar um Ator
                    Ator.id = parseInt(id)

                //chama a função do DAO para inserir um novo Ator
                let result = await atorDAO.setUpdateAtor(Ator)

                    if(result){
                        MESSAGE.HEADER.status       =  MESSAGE.SUCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code  =  MESSAGE.SUCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message      =  MESSAGE.SUCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response     =   Ator


                        return MESSAGE.HEADER //200

                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return validarID //Retorno da Função de buscargeneroID (400 ou 404 ou 500)
                }

            } else {
                return validarDados //Retorno da função de validar dados do Ator (400)
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }       
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
};

//INSERT - Adiciona um novo Genero na tabela
const inserirAtor = async (Ator, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosAtor(Ator)
      
            if(!validarDados){
            
                //chama a função do DAO para inserir um novo Ator
                let result = await atorDAO.setInsertAtor(Ator)

                if(result){

                    //chama a função para receber o ID gerado do BD
                let lastIdAtor = await atorDAO.getSelectLastIdAtor()

                if(lastIdAtor){
                    //Adiciona no JSON de Ator o ID que foi gerado pelo BD
                    Ator.id                    =  lastIdAtor
                    MESSAGE.HEADER.status       =  MESSAGE.SUCESS_CREATED_ITEM.status
                    MESSAGE.HEADER.status_code  =  MESSAGE.SUCESS_CREATED_ITEM.status_code
                    MESSAGE.HEADER.message      =  MESSAGE.SUCESS_CREATED_ITEM.message
                    MESSAGE.HEADER.response     =  Ator

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

//DELETE - Exclui um Ator da tabela 
const excluirAtor = async (id) => {
    //Retorna a mensagem como um JSON
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));
    
    let validarID = await filtrarAtorId(id)

    if(validarID.status_code == 200){

        let result = await atorDAO.setDeleteAtor(id)

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

const validarDadosAtor = async function (Ator) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    console.log(Ator)

    if(Ator.nome == "" || Ator.nome == null || Ator.nome == undefined || Ator.nome.length > 50){

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS


    } else if (Ator.data_nascimento == "" || Ator.data_nascimento == null || Ator.data_nascimento == undefined){

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_NASCIMENTO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS


    } else if (Ator.nascionalidade == "" || Ator.nascionalidade == null || Ator.nascionalidade == undefined || Ator.nascionalidade.length > 150){

    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NASCIONALIDADE] inválido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS


    } else if (Ator.cpf == "" || Ator.cpf == null || Ator.cpf == undefined || Ator.cpf.length > 20){

    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CPF] inválido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS


    } else if (Ator.tempo_carreira == "" || Ator.tempo_carreira == undefined || Ator.tempo_carreira.length > 150){

    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS

    } else {
        return false
}

};


module.exports = {

    listarAtor,
    filtrarAtorId,
    inserirAtor,
    atualizarAtor,
    excluirAtor,
    validarDadosAtor
}