/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 07/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const filmeDAO = require('../../model/DAO/filme.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

//Retorna uma lista de filmes
const listarFilmes = async () => {

    //Realiza uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções.
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO para retornar a lista de filmes
        let result = await filmeDAO.getSelectAllFilms();

        if (result) {
            if (result.length > 0) {
                let amount = result.length;

                MESSAGE.HEADER.status = MESSAGE.REQUEST_SUCESS.status;
                MESSAGE.HEADER.status_code = MESSAGE.REQUEST_SUCESS.status_code;
                MESSAGE.HEADER.response.movies_amount = amount;
                MESSAGE.HEADER.response.movies = result;

                return MESSAGE.HEADER; //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND; //404
            };
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
        };

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Retorna um filme filtrando pelo ID
const buscarFilmeId = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            //Preserva o argumento e o transforma em inteiro
            let idInt = parseInt(id);

            //Guarda o resultado da função que filtra pelo ID
            let result = await filmeDAO.getSelectByIdFilms(idInt);

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
            return MESSAGE.ERROR_REQUIRED_FIELDS; //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Insere um novo filme
const inserirFilme = async (filme, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JOSN'){

      

            if(filme.nome == "" || filme.nome == null || filme.nome == undefined || filme.nome.length > 100){

                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido'
                return MESSAGE.ERROR_REQUIRED_FIELDS


            } else if (filme.sinopse == undefined){

                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SINOPSE] inválido'
                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            } else if(filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA_LANCAMENTO] inválido'
                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            } else if(filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8 ){
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DURAÇAO] inválido'
                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            } else if(filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || typeof(filme.orcamento) != 'number'){
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ORÇAMENTO] inválido'
                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            } else if(filme.trailer == undefined || filme.trailer.length > 200 ){
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [TRAILER] inválido'
                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            } else if(filme.capa == '' || filme.capa == null || filme.capa == undefined || filme.capa.length > 200){
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CAPA] inválido'
                return MESSAGE.ERROR_REQUIRED_FIELDS //400

            } else {
                //chama a função do DAO para inserir um novo filme
                let result = await filmeDAO.setInsertFilms(filme)

                if(result){
                    MESSAGE.HEADER.status       =  SUCESS_CREATED_ITEM.status
                    MESSAGE.HEADER.status_code  =  SUCESS_CREATED_ITEM.status_code
                    MESSAGE.HEADER.message      =  MESSAGE_DEFAULT.SUCESS_CREATED_ITEM.message

                    return MESSAGE.HEADER //201

                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch(error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
};

//Atualiza um filme filtrando pelo ID
const atualizarFilme = async (filme, id) => {

};

//Exclui um filme filtrando pelo ID
const excluirFilme = async (id) => {

};


module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme
}