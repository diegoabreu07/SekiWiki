var database = require("../database/config");

function conquistasConcluidas(idUsuario) {
    var instrucaoSql = `
        SELECT COUNT(*) as concluidas FROM UsuarioConquista WHERE fkUsuario = ${idUsuario} AND statusMarcado = 1
    `
    return database.executar(instrucaoSql)
}
function conquistaMaisRara() {
    var instrucaoSql = `
    SELECT COUNT(*) as Mais_rara, c.nome  FROM UsuarioConquista uc
    JOIN conquista c ON uc.fkConquista = c.idConquista
    WHERE statusMarcado = 1
    GROUP BY fkConquista
    ORDER BY Mais_rara
    LIMIT 1
    `
    return database.executar(instrucaoSql)
}

function bossMaisTemido() {
    var instrucaoSql = `
   SELECT COUNT(*) as total, c.nome FROM UsuarioChecklist uc
   JOIN Checklist c ON uc.fkChecklist = c.idChecklist
   WHERE c.tipo = 'boss' AND uc.statusMarcadoChecklist = 1
   GROUP BY uc.fkChecklist
   ORDER BY total ASC
   LIMIT 1
    `
    return database.executar(instrucaoSql)
}
function progressoConquistas(idUsuario) {
    var instrucaoSql = `
    SELECT COUNT(*) * 100 / 34 as concluidas FROM UsuarioConquista WHERE fkUsuario = ${idUsuario} AND statusMarcado = 1
    `
    return database.executar(instrucaoSql)
}
function progressoMapa(idUsuario) {
    var instrucaoSql = `
    SELECT COUNT(*) * 100 / 133 as concluidas FROM UsuarioChecklist WHERE fkUsuario = ${idUsuario} AND statusMarcadoChecklist = 1
    `
    return database.executar(instrucaoSql)
}
function progressoGeral(idUsuario) {
    var instrucaoSql = `
    SELECT (
        (SELECT COUNT(*) FROM UsuarioChecklist WHERE fkUsuario = ${idUsuario} AND statusMarcadoChecklist = 1)
        +
        (SELECT COUNT(*) FROM UsuarioConquista WHERE fkUsuario = ${idUsuario} AND statusMarcado = 1)
    ) * 100 / 167 as concluidas
    `
    return database.executar(instrucaoSql)
}
function progressoUsuarioPorArea(idUsuario) {
    var instrucaoSql = `
    SELECT a.nome, COUNT(uc.fkChecklist) * 100 / COUNT(c.idChecklist) as porcentagem
    FROM Area a
    JOIN Checklist c ON c.fkArea = a.idArea
    LEFT JOIN UsuarioChecklist uc ON uc.fkChecklist = c.idChecklist AND uc.fkUsuario = ${idUsuario} AND uc.statusMarcadoChecklist = 1
    GROUP BY a.idArea
     `
    return database.executar(instrucaoSql)
}
function mediaGlobalPorArea() {
    var instrucaoSql = `
    SELECT a.nome, COUNT(uc.fkChecklist) * 100 / COUNT(c.idChecklist) / COUNT(DISTINCT uc.fkUsuario) as porcentagem
    FROM Area a
    JOIN Checklist c ON c.fkArea = a.idArea
    LEFT JOIN UsuarioChecklist uc ON uc.fkChecklist = c.idChecklist AND uc.statusMarcadoChecklist = 1
    GROUP BY a.idArea
     `
    return database.executar(instrucaoSql)
}

function bossesTaxaDerrota() {
    var instrucaoSql = `
    SELECT COUNT(uc.fkConquista) * 100 / (SELECT COUNT(*) FROM usuario) as total, c.nome 
    FROM conquista c
    LEFT JOIN UsuarioConquista uc ON uc.fkConquista = c.idConquista AND uc.statusMarcado = 1
    WHERE c.idConquista BETWEEN 5 AND 17
    GROUP BY c.idConquista
    ORDER BY c.nome ASC
    `
    return database.executar(instrucaoSql)
}

module.exports = {
    conquistasConcluidas,
    conquistaMaisRara,
    bossMaisTemido,
    progressoConquistas,
    progressoMapa,
    progressoGeral,
    progressoUsuarioPorArea,
    mediaGlobalPorArea,
    bossesTaxaDerrota
};