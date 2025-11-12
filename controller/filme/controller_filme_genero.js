/*******************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a MODEL para o CRUD de Filme e Genero (Validações,
 *              tratamento de dados, tratamento de Erros, etc...).
 * Data: 05/11/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 ******************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no DB
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js');

//Import do arquivo que padroniza as mensagens
const MESSAGE_DEFAULT = require('../module/config_messages.js')

//Retorna uma lista de filmes
const listarFilmesGeneros = async () => {

    //Realiza uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções.
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Chama a função do DAO para retornar a lista de filmes
        let result = await filmeGeneroDAO.getSelectAllFilmsGenres();

        if (result) {
            if (result.length > 0) {
                let amount = result.length;

                MESSAGE.HEADER.status = MESSAGE.REQUEST_SUCESS.status;
                MESSAGE.HEADER.status_code = MESSAGE.REQUEST_SUCESS.status_code;
                MESSAGE.HEADER.response.filmeGenero = result;

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

//Retorna um filmeGenero filtrando pelo ID
const buscarFilmeGeneroId = async (id) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            //Preserva o argumento e o transforma em inteiro
            let idInt = parseInt(id);


            //Guarda o resultado da função que filtra pelo ID
            let result = await filmeGeneroDAO.getSelectByIdFilms(idInt);

            if (result) {

                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.REQUEST_SUCESS.status;
                    MESSAGE.HEADER.status_code = MESSAGE.REQUEST_SUCESS.status_code;
                    MESSAGE.HEADER.response.filmeGenero = result;

                    return MESSAGE.HEADER; //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //404
                }

            } else {

                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] inválido! CONTROLE filme_genero.'
            return MESSAGE.ERROR_REQUIRED_FIELDS; //400
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Retorna os generos filtrando pelo ID do filme
const listarGenerosIdFilme = async (idFilme) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação de campo obrigatório
        if (idFilme != '' && idFilme != null && idFilme != undefined && !isNaN(idFilme) && idFilme > 0) {
            //Preserva o argumento e o transforma em inteiro
            let idInt = parseInt(idFilme);


            //Guarda o resultado da função que filtra pelo ID
            let result = await filmeGeneroDAO.getSelectGenresByIdFilms(idInt);

            if (result) {

                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.REQUEST_SUCESS.status;
                    MESSAGE.HEADER.status_code = MESSAGE.REQUEST_SUCESS.status_code;
                    MESSAGE.HEADER.response.filmeGenero = result;

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

//Retorna os filmes filtrando pelo Id do Genero
const listarFilmeIdGenero = async (idGenero) => {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {
        //Validação de campo obrigatório
        if (idGenero != '' && idGenero != null && idGenero != undefined && !isNaN(idGenero) && idGenero > 0) {
            //Preserva o argumento e o transforma em inteiro
            let idInt = parseInt(idGenero);


            //Guarda o resultado da função que filtra pelo ID
            let result = await filmeGenresDAO.getSelectGenresByIdFilm(idInt);

            if (result) {

                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.REQUEST_SUCESS.status;
                    MESSAGE.HEADER.status_code = MESSAGE.REQUEST_SUCESS.status_code;
                    MESSAGE.HEADER.response.filmeGenero = result;

                    return MESSAGE.HEADER; //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND; //404
                }

            } else {

                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL; //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_Genero] inválido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS; //400
        }
    } catch (error) {

        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; //500
    }
};

//Insere um novo filmeGenero
const inserirFilmeGenero = async (filmeGenero, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmeGenero(filmeGenero)

            if (!validarDados) {

                //chama a função do DAO para inserir um novo filmeGenero
                let result = await filmeGeneroDAO.setInsertFilmsGenre(filmeGenero)
                
                if (result) {

                    //chama a função para receber o ID gerado do BD
                    let lastIdFilmeGenero = await filmeGeneroDAO.getSelectLastIdFilmsGenre()
                    
                    if (lastIdFilmeGenero) {
                        //Adiciona no JSON de filmeGenero o ID que foi gerado pelo BD
                        filmeGenero.id = lastIdFilmeGenero
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = filmeGenero

                        return MESSAGE.HEADER //201
                    }
                } else {
                    
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarDados //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
};

//Atualiza um filmeGenero filtrando pelo ID
const atualizarFilmeGenero = async (filmeGenero, id, contentType) => {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    try {

        //Valida o ContentType
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmeGenero(filmeGenero)

            if (!validarDados) {

                //Verifica se o ID existe no BD, caso exista teremos o status 200
                let validarID = await buscarFilmeGeneroId(id)

                if (validarID.status_code == 200) {

                    //chama a funçõa do DAO para atualizar um filmeGenero
                    filmeGenero.id = parseInt(id)

                    //chama a função do DAO para inserir um novo filmeGenero
                    let result = await filmeGeneroDAO.setUpdateFilmsGenre(filmeGenero)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCESS_UPDATE_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCESS_UPDATE_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCESS_UPDATE_ITEM.message
                        MESSAGE.HEADER.response = filmeGenero


                        return MESSAGE.HEADER //200

                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //Retorno da Função de buscarFilmeID (400 ou 404 ou 500)
                }

            } else {
                return validarDados //Retorno da função de validar dados do Filme (400)
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
};

//Exclui um filmeGenero filtrando pelo ID
const excluirFilmeGenero = async (id) => {
    
    //Retorna a mensagem como um JSON
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    let validarID = await buscarFilmeGeneroId(id)
    console.log(validarID)
    if (validarID.status_code == 200) {
        console.log('uj')
        let result = await filmeGeneroDAO.setDeleteFilmsGenre(id)
            console.log(result)
        if (result) {
            console.log(result)

            MESSAGE.HEADER.status = MESSAGE.SUCESS_DELETE_ITEM.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCESS_DELETE_ITEM.status_code
            MESSAGE.HEADER.message = MESSAGE.SUCESS_DELETE_ITEM.message

            delete MESSAGE.HEADER.response //200

            return MESSAGE.HEADER //200
        } else {
            console.log(result)
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }
};

//Validação dos dados de Cadastro do Filme
const validarDadosFilmeGenero = async function (filmeGenero) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT));

    
    if (filmeGenero.id_filmes == "" || filmeGenero.id_filmes == null || filmeGenero.id_filmes == undefined || isNaN(filmeGenero.id_filmes) || filmeGenero.id_filmes <= 0) {

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_FILME] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (filmeGenero.id_genero == "" || filmeGenero.id_genero == null || filmeGenero.id_genero == undefined || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero <= 0) {

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID_GENERO] inválido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }



};


module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    listarGenerosIdFilme,
    listarFilmeIdGenero,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    validarDadosFilmeGenero
}