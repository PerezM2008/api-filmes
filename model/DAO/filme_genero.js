/*******************************************************************************************
 * Objetivo: Arquivo respnsável pela realização do CRUD de filme no Banco de Dados MySQL
 * Data: 01/10/2025
 * Autor: Matheus Perez
 * Versão: 1.0
 ******************************************************************************************/


//Import da biblioteca do @prisma/client
//*ANTIGO* const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('../../generated/prisma');

//Cria um objeto do @prisma/client para manipular os scripts SQL
const prisma = new PrismaClient();

//Retorna todos os filmes do DB
const getSelectAllFilmsGenres = async () => {
    try {
        //Script SQL
        let sql = `select * from tbl_filmes_genero order by id desc`;

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
const getSelectByIdFilmsGenre = async (id) => {
    try {
        //Script SQL
        let sql = `select * from tbl_filmes_genero where id = ${id}`;

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

//Retorna os generos filtrando pelo ID do filme
const getSelectGenresByIdFilms = async (idFilme) => {
    try {
        //Script SQL
        let sql = `select tbl_genero.id, tbl_genero.nome
         from tbl_filme
                inner join tbl_filmes_genero
                    on tbl_filme.id = tbl_filme_genero.id_filme
                inner join tbl_genero
                    on tbl_genero.id = tbl_filme_genero.id
            where tbl_filme.id = ${idFilme}`

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

//Retorna os filmes filtrando pelo Id do genero
const getSelectFilmsByIdGenres = async (idGenero) => {
    try {
        //Script SQL
        let sql = `select tbl_filme.id, tbl_filme.nome
         from tbl_filme
                inner join tbl_filmes_genero
                    on tbl_filme.id = tbl_filme_genero.id_filme
                inner join tbl_genero
                    on tbl_genero.id = tbl_filme_genero.id
            where tbl_genero.id = ${idGenero}`

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

//
const getSelectLastIdFilmsGenre = async() => {
    try {
        //Script SQL
        let sql = `select * from tbl_filmes_genero order by id desc`;

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

//Inserir um filme no DB
const setInsertFilmsGenre = async (filmeGenero) => {

    try {
        let sql = `INSERT INTO tbl_filme_genero (id_filmes, id_genero)
        values (${filmeGenero.id_filmes}, ${filmeGenero.id_genero})`
               
console.log(sql)
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
const setUpdateFilmsGenre = async (filmeGenero) => {
    
    try {
        let sql = `update tbl_filmes_genero set
                        id_filme            =   ${filmeGenero.id_filme},
                        id_genero           =   ${filmeGenero.id_genero}
                        
                        where id = ${filmeGenero.id}`


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
const setDeleteFilmsGenre = async function (id) {

    try {
        let sql = `DELETE FROM tbl_filmes_genero where id = ${id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if(result){
                return true
            } else {
                return false
            }

    } catch (error){

    }
};


/*///////////////////////////////////////////////////////////////////////////////////////// */
module.exports = {
    getSelectAllFilmsGenres,
    getSelectByIdFilmsGenre,
    getSelectGenresByIdFilms,
    getSelectFilmsByIdGenres,
    setInsertFilmsGenre,
    setUpdateFilmsGenre,
    setDeleteFilmsGenre,
    getSelectLastIdFilmsGenre
}
