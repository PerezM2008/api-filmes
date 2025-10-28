/***********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD da tabela Genero no Banco de Dados MySQL
 * Data: 28/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 * 
 ************************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

//Retorna todas as informações de Cenarios cadastrados
const getAllScenario = async() => {

    try{

    //script que será utilizado no BD
    let sql = `select * from tbl_cenario order by id desc`;

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

//Retorna os Cenarios Filtrado por ID
const getFilterByScenarioId = async (id) => {

    try {
    let sql = `select * from tbl_cenario where id = ${id}`;

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

// INSERT - Adciona um novo cenario na tabela
const setInsertScenario = async (cenario) => {
    try {
            let sql = `INSERT INTO tbl_cenario (
            nome,
            localidade
            )
            values ('${cenario.nome}',
                    '${cenario.localidade}')`
                

            // $executeRawUnsafe() ->  Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else (error)
            return false
        } catch (error){

        }    
};

// UPDATE - Faz o update de informações da tabela 
const setUpdateScenario = async(cenario) => {
    try {
        let sql = `update tbl_cenario set
                        nome             =   '${cenario .nome}'
                        localidade       =   '${cenario.localidade}'
                        where id         =    ${cenario.id}`


        // $executeRawUnsafe() ->  Executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }

};

// DELETE - Exclui de forma permanente alguma tabela
const setDeleteScenario = async(id) => {
    try {
        let sql = `DELETE FROM tbl_cenario where id = ${id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if(result){
                return true
            } else {
                return false
            }

    } catch (error){

    }
}

// Retorna o ID junto com a tabela
const getSelectLastIdScenario = async() => {
    try {
        //Script SQL
        let sql = `select * from tbl_cenario order by id desc`;

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

module.exports = {
    getAllScenario,
    getFilterByScenarioId,
    setInsertScenario,
    setUpdateScenario,
    setDeleteScenario,
    getSelectLastIdScenario
}