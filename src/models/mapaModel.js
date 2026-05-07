var database = require("../database/config");

function inserir(idUsuario, idChecklist, status) {
    var instrucaoSql = `
        SELECT * FROM UsuarioChecklist WHERE fkUsuario = ${idUsuario} AND fkChecklist = ${idChecklist}
    `;

    return database.executar(instrucaoSql)
    .then(resultado => {
        if (resultado.length > 0) {
            instrucaoSql = `UPDATE UsuarioChecklist SET statusMarcadoChecklist = ${status} WHERE fkUsuario = ${idUsuario} AND fkChecklist = ${idChecklist}`
        } else {
            instrucaoSql = `INSERT INTO UsuarioChecklist (fkUsuario, fkChecklist, statusMarcadoChecklist) VALUES (${idUsuario}, ${idChecklist}, ${status})`
        }
        return database.executar(instrucaoSql)
    }) .catch(e => {
        console.error('Erro no inserir', e)
    })
}

function listar(idUsuario) {

    var instrucaoSql = `
        SELECT c.idChecklist, uc.statusMarcadoChecklist
        FROM UsuarioChecklist uc
        JOIN checklist c ON c.idChecklist = uc.fkChecklist
        WHERE uc.fkUsuario = ${idUsuario};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    inserir,
    listar
};