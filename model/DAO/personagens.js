/**********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD da tabela Genero no Banco de Dados MySQL
 * Data: 22/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 * 
 ************************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

//Retorna todas as informações do Gênero
const getAllPersonagem = async() => {

    try{

    //script que será utilizado no BD
    let sql = `select * from tbl_personagens order by id desc`;

    //Result - Executa no BD o script do sql (variavel que está o script)
    let result = await prisma.$queryRawUnsafe(sql);

    if (Array.isArray(result))
        return result;
    else
        return false;
    } catch (error) {

        return false;
    }
};

//Retorna Filtrado por ID
const getFilterByPersonagemId = async (id) => {

    try {
    let sql = `select * from tbl_personagens where id = ${id}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (Array.isArray(result)){
        return result;
    } else {
        return false;
    }
    } catch (error) {
        return false;
    }
};

// INSERT - Adciona um novo genero na tabela
const setInsertPersonagem = async (personagens) => {
    try {
            let sql = `INSERT INTO tbl_personagens (nome, data_idade, nascionalidade)
            values ('${personagens.nome}',
                    '${personagens.data_idade}'
                    '${personagens.localidade}'
                    )`
                

            // $executeRawUnsafe() ->  Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else (error)
            return false
        } catch (error){

        }    
};

const setUpdatePersonagem = async(personagens) => {
    try {
        let sql = `update tbl_genero set
                        nome             =   '${personagens.nome}',
                        data_idade       =   '${personagens.data_idade}',
                        localidade       =   '${personagens.localidade}',

                        where id         =    ${personagens.id}`


        // $executeRawUnsafe() ->  Executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }

};

const setDeletePersonagem = async(id) => {
    try {
        let sql = `DELETE FROM tbl_personagens where id = ${id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if(result){
                return true
            } else {
                return false
            }

    } catch (error){

    }
}

const getSelectLastIdPersonagem = async() => {
    try {
        //Script SQL
        let sql = `select * from tbl_personagens order by id desc`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
};

/*//////////////////////////////////////////////////////////////////////*/
module.exports = {
    getAllPersonagem,
    getFilterByPersonagemId,
    setUpdatePersonagem,
    setInsertPersonagem,
    setDeletePersonagem,
    getSelectLastIdPersonagem
}