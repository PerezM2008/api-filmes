/***********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD da tabela Genero no Banco de Dados MySQL
 * Data: 29/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 * 
 ************************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

//Retorna todas as informações do Gênero
const getAllAtor = async() => {

    try{

    //script que será utilizado no BD
    let sql = `select * from tbl_ator order by id desc`;

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
const getFilterByAtorId = async (id) => {

    try {
    let sql = `select * from tbl_ator where id = ${id}`;

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

// INSERT - Adciona um novo ator na tabela
const setInsertAtor = async (ator) => {
    try {
            let sql = `INSERT INTO tbl_ator (nome)
            values (
            '${ator.nome}',
            '${ator.data_nascimento}',
            '${ator.nascionalidade}',
            '${ator.cpf}',
            '${ator.tempo_carreira}'
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

const setUpdateAtor = async(ator) => {
    try {
        let sql = `update tbl_ator set
                        nome                 =   '${ator.nome}',
                        data_nascimento      =   '${ator.data_nascimento}',
                        nascionalidade       =   '${ator.nascionalidade}',
                        cpf                  =   '${ator.cpf}',
                        tempo_carreira       =   '${ator.tempo_carreira}',

                        where id            =    '${ator.id}'`


        // $executeRawUnsafe() ->  Executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }

};

const setDeleteAtor = async(id) => {
    try {
        let sql = `DELETE FROM tbl_ator where id = ${id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if(result){
                return true
            } else {
                return false
            }

    } catch (error){

    }
}

const getSelectLastIdAtor = async() => {
    try {
        //Script SQL
        let sql = `select * from tbl_ator order by id desc`;

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
    getAllAtor,
    getFilterByAtorId,
    setUpdateAtor,
    setInsertAtor,
    setDeleteAtor,
    getSelectLastIdAtor
}
