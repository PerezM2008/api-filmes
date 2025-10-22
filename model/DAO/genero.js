/***********************************************************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD da tabela Genero no Banco de Dados MySQL
 * Data: 22/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 * 
 ************************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

//Retorna todas as informações do Gênero
const getAllGenere = async() => {

    try{

    //script que será utilizado no BD
    let sql = `select * from tbl_genero order by id desc`;

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
const getFilterByGenereId = async (id) => {

    try {
    let sql = `select * from tbl_genero where id = ${id}`;

    let result = await prisma.$queryRawUnsafe(sql);

    if (Array.isArray(result)){
        return result;
    } else {
        return false;
    }
    } catch (error) {
        return false;
    }
}
/*//////////////////////////////////////////////////////////////////////*/
module.exports = {
    getAllGenere,
    getFilterByGenereId
}