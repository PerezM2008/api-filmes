/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 07/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const personagemDAO = require('../../model/DAO/personagem.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

//Retorna uma lista de filmes
const listarPersonagem = async () => {

    //Realiza uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções.
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO para retornar a lista de filmes
        let result = await personagemDAO.getAllPersonagem();

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

//Retorna um personagem filtrando pelo ID
const buscarPersonagemId = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            //Preserva o argumento e o transforma em inteiro
            let idInt = parseInt(id);


            //Guarda o resultado da função que filtra pelo ID
            let result = await personagemDAO.getSelectByIdPersonagem(idInt);

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

//Insere um novo personagem
const inserirPersonagem = async (personagem, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosPersonagem(personagem)
      
            if(!validarDados){
            
                //chama a função do DAO para inserir um novo personagem
                let result = await personagemDAO.setInsertPersonagem(personagem)

                if(result){

                    //chama a função para receber o ID gerado do BD
                let lastIdPersonagem = await personagemDAO.getSelectLastIdPersonagem()

                if(lastIdPersonagem){
                    //Adiciona no JSON de personagem o ID que foi gerado pelo BD
                    personagem.id                    =  lastIdPersonagem
                    MESSAGE.HEADER.status       =  MESSAGE.SUCESS_CREATED_ITEM.status
                    MESSAGE.HEADER.status_code  =  MESSAGE.SUCESS_CREATED_ITEM.status_code
                    MESSAGE.HEADER.message      =  MESSAGE.SUCESS_CREATED_ITEM.message
                    MESSAGE.HEADER.response     =  personagem

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

//Atualiza um personagem filtrando pelo ID
const atualizarPersonagem = async (personagem, id, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        //Valida o ContentType
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosPersonagem(personagem)
      
            if(!validarDados){
            
                //Verifica se o ID existe no BD, caso exista teremos o status 200
                let validarID = await buscarPersonagemId(id)

                if(validarID.status_code == 200) {

                    //chama a funçõa do DAO para atualizar um personagem
                    personagem.id = parseInt(id)

                //chama a função do DAO para inserir um novo personagem
                let result = await personagemDAO.setUpdatePersonagem(personagem)

                    if(result){
                        MESSAGE.HEADER.status       =  MESSAGE.SUCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code  =  MESSAGE.SUCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message      =  MESSAGE.SUCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response     =  personagem


                        return MESSAGE.HEADER //200

                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return validarID //Retorno da Função de buscarPersonagemID (400 ou 404 ou 500)
                }

            } else {
                return validarDados //Retorno da função de validar dados do Personagem (400)
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch(error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
};

//Exclui um personagem filtrando pelo ID
const excluirPersonagem = async (id) => {

    //Retorna a mensagem como um JSON
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));
    
    let validarID = await buscarPersonagemId(id)

    if(validarID.status_code == 200){

        let result = await personagemDAO.setDeletePersonagem(id)

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

//Validação dos dados de Cadastro do Filme
const validarDadosPersonagem = async function (personagem) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    console.log(personagem)
    if (personagem.nome == "" || personagem.nome == null || personagem.nome == undefined || personagem.nome.length > 100){

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (personagem.data_idade == "" || personagem.data_idade == null || personagem.data_idade == undefined){

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Data_Idade] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (personagem.localidade == "" || personagem.localidade == null){

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Localidade] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else {
        return false
}

};


module.exports = {
    listarPersonagem,
    buscarPersonagemId,
    inserirPersonagem,
    atualizarPersonagem,
    excluirPersonagem,
    validarDadosPersonagem
}