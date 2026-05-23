var database = require("../database/config");

function conquistasConcluidas(idUsuario) {
    var instrucaoSql = `
        SELECT COUNT(*) as concluidas FROM usuarioConquista WHERE fkUsuario = ${idUsuario} AND statusMarcado = 1
    `
    return database.executar(instrucaoSql)
}
function conquistaMaisRara() {
    var instrucaoSql = `
    SELECT COUNT(*) as Mais_rara, c.nome  FROM usuarioConquista uc
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
   SELECT COUNT(*) as total, b.nome FROM usuarioBoss ub
   JOIN boss b ON ub.fkBoss = b.idBoss
   WHERE ub.statusMarcado = 1
   GROUP BY ub.fkBoss
   ORDER BY total ASC
   LIMIT 1
    `
    return database.executar(instrucaoSql)
}
function progressoConquistas(idUsuario) {
    var instrucaoSql = `
    SELECT COUNT(*) as concluidas FROM usuarioConquista WHERE fkUsuario = ${idUsuario} AND statusMarcado = 1
    `
    return database.executar(instrucaoSql)
}
function progressoMapa(idUsuario) {
    var instrucaoSql = `
    SELECT COUNT(*) * 100 / 133 as concluidas FROM usuarioChecklist WHERE fkUsuario = ${idUsuario} AND statusMarcadoChecklist = 1
    `
    return database.executar(instrucaoSql)
}
function progressoGeral(idUsuario) {
    var instrucaoSql = `
    SELECT (
        (SELECT COUNT(*) FROM usuarioChecklist WHERE fkUsuario = ${idUsuario} AND statusMarcadoChecklist = 1)
        +
        (SELECT COUNT(*) FROM usuarioConquista WHERE fkUsuario = ${idUsuario} AND statusMarcado = 1)
    ) * 100 / 167 as concluidas
    `
    return database.executar(instrucaoSql)
}
function progressoUsuarioPorArea(idUsuario) {
    var instrucaoSql = `
    SELECT a.nome, COUNT(uc.fkChecklist) * 100 / COUNT(c.idChecklist) as porcentagem
    FROM area a
    JOIN checklist c ON c.fkArea = a.idArea
    LEFT JOIN usuarioChecklist uc ON uc.fkChecklist = c.idChecklist AND uc.fkUsuario = ${idUsuario} AND uc.statusMarcadoChecklist = 1
    GROUP BY a.idArea
     `
    return database.executar(instrucaoSql)
}
function mediaGlobalPorArea() {
    var instrucaoSql = `
    SELECT a.nome,
        AVG(
            (SELECT COUNT(*) FROM usuarioChecklist uc2 
             WHERE uc2.fkUsuario = u.idUsuario 
             AND uc2.fkChecklist IN (SELECT idChecklist FROM checklist WHERE fkArea = a.idArea)
             AND uc2.statusMarcadoChecklist = 1)
            * 100.0 /
            (SELECT COUNT(*) FROM checklist WHERE fkArea = a.idArea)
        ) as porcentagem
    FROM area a
    CROSS JOIN usuario u
    GROUP BY a.idArea
     `
    return database.executar(instrucaoSql)
}

function bossesTaxaDerrota() {
    var instrucaoSql = `
    SELECT COUNT(ub.fkBoss) * 100 / (SELECT COUNT(*) FROM usuario) as total, b.nome 
    FROM boss b
    LEFT JOIN usuarioBoss ub ON ub.fkBoss = b.idBoss AND ub.statusMarcado = 1
    GROUP BY b.idBoss
    ORDER BY b.idBoss ASC
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