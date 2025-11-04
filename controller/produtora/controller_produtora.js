/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 07/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const produtoraDAO = require('../../model/DAO/produtora.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

//Retorna uma lista de produtoras
const listarprodutoras = async () => {

    //Realiza uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções.
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO para retornar a lista de produtoras
        let result = await produtoraDAO.getSelectAllProdutora();

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

//Retorna um produtora filtrando pelo ID
const buscarprodutoraId = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            //Preserva o argumento e o transforma em inteiro
            let idInt = parseInt(id);


            //Guarda o resultado da função que filtra pelo ID
            let result = await produtoraDAO.getSelectByIdProdutora(idInt);

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

//Insere um novo produtora
const inserirprodutora = async (produtora, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosprodutora(produtora)
      
            if(!validarDados){
            
                //chama a função do DAO para inserir um novo produtora
                let result = await produtoraDAO.setInsertProdutora(produtora)

                if(result){

                    //chama a função para receber o ID gerado do BD
                let lastIdprodutora = await produtoraDAO.getSelectLastIdProdutora()

                if(lastIdprodutora){
                    //Adiciona no JSON de produtora o ID que foi gerado pelo BD
                    produtora.id                    =  lastIdprodutora
                    MESSAGE.HEADER.status       =  MESSAGE.SUCESS_CREATED_ITEM.status
                    MESSAGE.HEADER.status_code  =  MESSAGE.SUCESS_CREATED_ITEM.status_code
                    MESSAGE.HEADER.message      =  MESSAGE.SUCESS_CREATED_ITEM.message
                    MESSAGE.HEADER.response     =  produtora

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

//Atualiza um produtora filtrando pelo ID
const atualizarprodutora = async (produtora, id, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        //Valida o ContentType
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosprodutora(produtora)
      
            if(!validarDados){
            
                //Verifica se o ID existe no BD, caso exista teremos o status 200
                let validarID = await buscarprodutoraId(id)

                if(validarID.status_code == 200) {

                    //chama a funçõa do DAO para atualizar um produtora
                    produtora.id = parseInt(id)

                //chama a função do DAO para inserir um novo produtora
                let result = await produtoraDAO.setUpdateProdutora(produtora)

                    if(result){
                        MESSAGE.HEADER.status       =  MESSAGE.SUCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code  =  MESSAGE.SUCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message      =  MESSAGE.SUCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response     =   produtora


                        return MESSAGE.HEADER //200

                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return validarID //Retorno da Função de buscarprodutoraID (400 ou 404 ou 500)
                }

            } else {
                return validarDados //Retorno da função de validar dados do produtora (400)
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch(error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
};

//Exclui um produtora filtrando pelo ID
const excluirprodutora = async (id) => {

    //Retorna a mensagem como um JSON
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));
    
    let validarID = await buscarprodutoraId(id)

    if(validarID.status_code == 200){

        let result = await produtoraDAO.setDeleteProdutora(id)

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

//Validação dos dados de Cadastro do produtora
const validarDadosprodutora = async function (produtora) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    console.log(produtora)
    if (produtora.nome == "" || produtora.nome == null || produtora.nome == undefined || produtora.nome.length > 50){

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (produtora.email == "" || produtora.email == null || produtora.email == undefined || produtora.email.length > 100){

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [EMAIL] inválido'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if(produtora.nascionalidade == undefined || produtora.nascionalidade == "" || produtora.nascionalidade == null ||produtora.nascionalidade.length > 150){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [nascionalidade] inválido'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if(produtora.cnpj == "" || produtora.cnpj == null || produtora.cnpj == undefined || produtora.cnpj.length > 20 ){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [CNPJ] inválido'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if(produtora.data_fundacao == "" || produtora.data_fundacao == null || produtora.data_fundacao == undefined ){
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [data_fundacao] inválido'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else {
        return false
}

};


module.exports = {
    listarprodutoras,
    buscarprodutoraId,
    inserirprodutora,
    atualizarprodutora,
    excluirprodutora,
    validarDadosprodutora
}