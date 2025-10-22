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

//Retorna todos os generos Cadastrados
const listartodosGeneros = async () => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Variável que chama a função DAO para retornar a lista de filmes
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

//Retorno de um Genero especifico filtrado pelo ID pertencente
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

module.exports = {
    listartodosGeneros,
    filtrarGenerosId
}