var dashboardModel = require("../models/dashboardModel");

function conquistasConcluidas(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.conquistasConcluidas(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
}
function conquistaMaisRara(req, res) {
    dashboardModel.conquistaMaisRara()
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
}
function bossMaisTemido(req, res) {
    dashboardModel.bossMaisTemido()
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
}
function progressoConquistas(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.progressoConquistas(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
}
function progressoMapa(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.progressoMapa(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
}
function progressoGeral(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.progressoGeral(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
}
function progressoUsuarioPorArea(req, res) {
    var idUsuario = req.params.idUsuario;

    dashboardModel.progressoUsuarioPorArea(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
}
function mediaGlobalPorArea(req, res) {
    dashboardModel.mediaGlobalPorArea()
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
}
function bossesTaxaDerrota(req, res) {
    dashboardModel.bossesTaxaDerrota()
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage))
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
}