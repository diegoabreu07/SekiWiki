var database = require("../database/config");

function inserir(idUsuario, idConquista, status) {
    var instrucaoSql = `
        SELECT * FROM UsuarioConquista WHERE fkUsuario = ${idUsuario} AND fkConquista = ${idConquista}
    `;

    return database.executar(instrucaoSql)
    .then(resultado => {
        if (resultado.length > 0) {
            instrucaoSql = `UPDATE UsuarioConquista SET statusMarcado = ${status} WHERE fkUsuario = ${idUsuario} AND fkConquista = ${idConquista}`
        } else {
            instrucaoSql = `INSERT INTO UsuarioConquista (fkUsuario, fkConquista, statusMarcado) VALUES (${idUsuario}, ${idConquista}, ${status})`
        }
        return database.executar(instrucaoSql)
    }) .catch(e => {
        console.error('Erro no inserir', e)
    })
}

function listar(idUsuario) {

    var instrucaoSql = `
        SELECT c.idConquista, uc.statusMarcado
        FROM UsuarioConquista uc
        JOIN conquista c ON c.idConquista = uc.fkConquista
        WHERE uc.fkUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    inserir,
    listar
};