/***********************************************************************************************************************************
 * Objetivo: BONUS DO MARCEL
 * Data: 16/12/2025
 * Autor: Matheus Perez
 * Versão: 2.0
 * 
 ************************************************************************************************************************************/

const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

//Retorna todas as informações do Gênero
const getAllBonus = async() => {

    try{

    //script que será utilizado no BD
    let sql = `select * from tbl_bonus order by id desc`;

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
const getFilterByBonusId = async (id) => {

    try {
    let sql = `select * from tbl_bonus where id = ${id}`;

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

// INSERT - Adciona um novo marcel na tabela
const setInsertMarcel = async (marcel) => {
    try {
            let sql = `INSERT INTO tbl_bonus (
                foto,
                nome,
                descrição,
                data_registro

            )values (
            '${marcel.foto}',
            '${marcel.nome}',
            '${marcel.descrição}',
            '${marcel.data_registro}'
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

const setUpdateMarcel = async(marcel) => {
    try {
        let sql = `update tbl_bonus set
                        foto                 =   '${marcel.foto}',
                        nome                 =   '${marcel.nome}',
                        descrição            =   '${marcel.descrição}',
                        data_registro        =   '${marcel.data_registro}'
                       

                        where id            =    ${marcel.id}`


        // $executeRawUnsafe() ->  Executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else (error)
        return false
    } catch (error){

    }

};

const setDeleteMarcel = async(id) => {
    try {
        let sql = `DELETE FROM tbl_bonus where id = ${id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if(result){
                return true
            } else {
                return false
            }

    } catch (error){

    }
}

const getSelectLastIdMarcel = async() => {
    try {
        //Script SQL
        let sql = `select * from tbl_bonus order by id desc`;

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
    getAllBonus,
    getFilterByBonusId,
    setUpdateMarcel,
    setInsertMarcel,
    setDeleteMarcel,
    getSelectLastIdMarcel
}
