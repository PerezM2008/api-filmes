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
};

// INSERT - Adciona um novo genero na tabela
const setInsertGenere = async (genero) => {
    try {
            let sql = `INSERT INTO tbl_genero (nome)
            values ('${genero.nome}')`
                

            // $executeRawUnsafe() ->  Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
            let result = await prisma.$executeRawUnsafe(sql)

            if (result)
                return true
            else (error)
            return false
        } catch (error){

        }    
};

const setUpdateGenere = async(genero) => {
    try {
        let sql = `update tbl_genero set
                        nome             =   '${genero.nome}'
                        
                        where id         =    ${genero.id}`


        // $executeRawUnsafe() ->  Executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }

};

const setDeleteGenere = async(id) => {
    try {
        let sql = `DELETE FROM tbl_genero where id = ${id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if(result){
                return true
            } else {
                return false
            }

    } catch (error){

    }
}

const getSelectLastIdGenere = async() => {
    try {
        //Script SQL
        let sql = `select * from tbl_genero order by id desc`;

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
    getAllGenere,
    getFilterByGenereId,
    setUpdateGenere,
    setInsertGenere,
    setDeleteGenere,
    getSelectLastIdGenere
}
