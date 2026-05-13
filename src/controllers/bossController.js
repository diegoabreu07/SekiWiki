var bossModel = require("../models/bossModel");

function inserir(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idBoss = req.body.idBossServer;
    var status = req.body.statusServer;

    if (idUsuario == undefined || idBoss == undefined || status == undefined) {
        res.status(400).send("Dados undefined");
        return;
    } else {
        bossModel.inserir(idUsuario, idBoss, status)
            .then(r => res.json(r))
            .catch(e => res.status(500).json(e.sqlMessage));
    }
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    bossModel.listar(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

module.exports = {
    inserir,
    listar
};