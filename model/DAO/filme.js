/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD de filme no Banco de Dados MySQL
 * Data: 01/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 ******************************************************************************************/

/*******************************************************************************************
 * Dependências do node para DB relacionais:
 *      Sequelize   -> Foi uma biblioteca para acesso a DB;
 *      Prisma      -> É uma biblioteca atual para acesso e manipulação de dados, utilizando
 *                      SQL ou ORM (MySQL, PostgreSQL, SQLServer, Oracle);
 *      Knex        -> É uma biblioteca atual para acesso e manipulação de dados, utilizando
 *                      SQL (MySQL).
 * 
 * Dependências do node para DB não relacionais:
 *      Mongoose    -> É uma biblioteca para acesso a DB não relacional (MongoDB);
 * 
 * 
 * 
 * Instalação do Prisma:
 *       npm install prisma         --save   -> Realiza a conexão com o DB
 *      npm install @prisma/client --save   -> Permite executar scripts SQL no DB
 *      npx prisma init            --save   -> Inicializador do prisma no projeto (.env , prisma)
 *      npx prisma migrate dev     --save   -> Permite sincronizar o Prisma com o DB, Modelar o
 *                                              DB conforme as configurações do ORM.
 *                                              CUIDADO: Esse comando faz um reset no DB.
 *      npx prisma migrate reset   --save   -> Realiza o reset do DB.
 *      npx prisma generate        --save   -> Realiza apenas o sincronismo com o DB
 * 
 *  ========================================================================================
 *  $queryRawUnsafe()   -> Permite executar apenas scripts SQL que retornam dados do DB
 *                          (SELECT), permite também executar um script SQL através de uma
 *                          variável;
 * 
 *  $exeuteRawUnsafe()  -> Permite executar scripts SQL que NÃO retornam dados do DB
 *                          (INSERT, UPDATE, DELETE);
 * 
 *  $queryRaw()         -> Permite executar apenas scripts SQL que retornam dados do DB
 *                          (SELECT), permite APENAS executar um script SQL direto no método.
 *                          Permite também aplicar segurança contra SQL Injection.
 * 
 *  $executeRaw()       ->Permite executar scripts SQL que NÃO retornam dados do DB
 *                          (INSERT, UPDATE, DELETE). Permite também aplicar segurança 
 *                          contra SQL Injection.
 ******************************************************************************************/

//Import da biblioteca do @prisma/client
//*ANTIGO* const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os filmes do DB
const getSelectAllFilms = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_filmes order by id desc`;

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

//Retorna um filme filtrando pelo ID do DB
const getSelectByIdFilms = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_filmes where id = ${id}`;

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

//Insere um filme no DB
const setInsertFilms = async (filme) => {

    try {
        let sql = `INSERT INTO tbl_filmes (
        nome,
        sinopse,
        data_lancamento,
        duracao, 
        orcamento, 
        trailer, 
        capa
        )
        values ('${filme.nome}',
                '${filme.sinopse}',
                '${filme.data_lancamento}',
                '${filme.duracao}',
                '${filme.orcamento}',
                '${filme.trailer}',
                '${filme.capa}')`
               

        // $executeRawUnsafe() ->  Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }

};

//Atualiza um filme existente no DB filtrando pelo ID
const setUpdateFilms = async (filme) => {
    
    try {
        let sql = `update tbl_filmes set
                        nome             =   '${filme.nome}',
                        sinopse          =   '${filme.sinopse}',
                        data_lancamento  =   '${filme.data_lancamento}',
                        duracao          =   '${filme.duracao}',
                        orcamento        =   '${filme.orcamento}',
                        trailer          =   '${filme.trailer}',
                        capa             =   '${filme.capa}'
                        
                        where id = ${filme.id}`


        // $executeRawUnsafe() ->  Executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }
};

//Deleta um filme existente no DB filtrando pelo ID
const setDeleteFilms = async function (id) {

    try {
        let sql = `DELETE FROM tbl_filmes where id = ${id}`

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
    getSelectAllFilms,
    getSelectByIdFilms,
    setInsertFilms,
    setUpdateFilms,
    setDeleteFilms
}