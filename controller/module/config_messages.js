/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela padronização de todas as mensagens da API do Projeto de
 *              Filmes.
 * Data: 07/10/2025
 * Autor: Leonardo Scotti
 * Versão: 1.0
 ******************************************************************************************/

const dataAtual = new Date();

/*************************** MENSAGENS DE PADRONIZAÇÃO DO PROJETO ***************************/
const HEADER = {
    status: '',
    status_code: '',
    developer: 'Leonardo Scotti',
    api_description: 'API para manipular dados da locadora de filmes.',
    version: '1.0.10.25',
    request_date: dataAtual.toLocaleDateString(),
    response: {}
};
/*========================================================================================= */

/******************************* MENSAGENS DE ERRO DO PROJETO *******************************/
const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Nenhum dado de retorno foi encontrado!'
};

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a problemas na cadama de MODELAGEM de dados!'
};

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição devido a problemas na cadama de CONTROLE de dados!'
};

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possível processar a requisição devido a campos obrigatórios que não foram enviados corretamente, conforme a documentação da API!'
};

const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message: 'Não foi possível concluir, pois o tipo de conteúdo não é um JSON! ' }
/*========================================================================================= */


/***************************** MENSAGENS DE SUCESSO DO PROJETO ******************************/
const REQUEST_SUCESS = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!'
};

const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Requisição bem sucedida! Novo recurso criado.'};
/*========================================================================================= */

module.exports = {
    ERROR_CONTENT_TYPE,
    SUCESS_CREATED_ITEM,
    HEADER,
    REQUEST_SUCESS,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_REQUIRED_FIELDS
};