/***********************************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD da tabela Genero no Banco de Dados MySQL
 * Data: 29/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 * 
 ************************************************************************************************************************************/


//Import da biblioteca do Prisma
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma para manipulação scripts SQL
const prisma = new PrismaClient();

const getSelectAllProdutora = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_produtora order by id desc`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
};

const getSelectByIdProdutora = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_produtora where id = ${id}`;

        //Executa no DB o script SQL
        let result = await prisma.$queryRawUnsafe(sql);

        //Validação para identificar se o retorno do DB é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        //console.log(error);
        return false;
    }
};

const getSelectLastIdProdutora = async() => {
    try {
        //Script SQL
        let sql = `select * from tbl_produtora order by id desc`;

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

const setInsertProdutora = async (produtora) => {
    try {
        let sql = `INSERT INTO tbl_produtora (
        nome,
        email,
        nascionalidade,
        cnpj, 
        data_fundacao
        )
        values ('${produtora.nome}',
                '${produtora.email}',
                '${produtora.nascionalidade}',
                '${produtora.cnpj}',
                '${produtora.data_fundacao}')`
               

        // $executeRawUnsafe() ->  Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }
}

const setUpdateProdutora = async (produtora) => {
    
    try {
        let sql = `update tbl_produtora set
                        nome                 =   '${produtora.nome}',
                        email                =   '${produtora.email}',
                        nascionalidade       =   '${produtora.nascionalidade}',
                        cnpj                 =   '${produtora.cnpj}',
                        data_fundacao        =   '${produtora.data_fundacao}'
                        
                        where id = ${produtora.id}`


        // $executeRawUnsafe() ->  Executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }
};

//Deleta um produtora existente no DB filtrando pelo ID
const setDeleteProdutora = async function (id) {

    try {
        let sql = `DELETE FROM tbl_produtora where id = ${id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if(result){
                return true
            } else {
                return false
            }

    } catch (error){

    }
};

module.exports = {
    getSelectAllProdutora,
    getSelectByIdProdutora,
    setInsertProdutora,
    setUpdateProdutora,
    setDeleteProdutora,
    getSelectLastIdProdutora
};