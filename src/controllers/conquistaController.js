var conquistaModel = require("../models/conquistaModel");

function inserir(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idConquista = req.body.idConquistaServer;
    var status = req.body.statusServer;

    if (idUsuario == undefined || idConquista == undefined || status == undefined) {
        res.status(400).send("Dados undefined");
        return;
    } else {
        conquistaModel.inserir(idUsuario, idConquista, status)
            .then(r => res.json(r))
            .catch(e => res.status(500).json(e.sqlMessage));
    }
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    conquistaModel.listar(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

module.exports = {
    inserir,
    listar
};