var database = require("../database/config");

function inserir(idUsuario, idBoss, status) {
    var instrucaoSql = `
        SELECT * FROM usuarioBoss WHERE fkUsuario = ${idUsuario} AND fkBoss = ${idBoss}
    `;

    return database.executar(instrucaoSql)
    .then(resultado => {
        if (resultado.length > 0) {
            instrucaoSql = `UPDATE usuarioBoss SET statusMarcado = ${status} WHERE fkUsuario = ${idUsuario} AND fkBoss = ${idBoss}`
        } else {
            instrucaoSql = `INSERT INTO usuarioBoss (fkUsuario, fkBoss, statusMarcado) VALUES (${idUsuario}, ${idBoss}, ${status})`
        }
        return database.executar(instrucaoSql)
    }) .catch(e => {
        console.error('Erro no inserir', e)
    })
}

function listar(idUsuario) {

    var instrucaoSql = `
        SELECT b.idBoss, ub.statusMarcado
        FROM usuarioBoss ub
        JOIN boss b ON b.idBoss = ub.fkBoss
        WHERE ub.fkUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    inserir,
    listar
};