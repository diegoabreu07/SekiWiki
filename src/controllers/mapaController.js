var mapaModel = require("../models/mapaModel");

function inserir(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idChecklist = req.body.idChecklistServer;
    var status = req.body.statusServer;

    if (idUsuario == undefined || idChecklist == undefined || status == undefined) {
        res.status(400).send("Dados undefined");
        return;
    } else {
        mapaModel.inserir(idUsuario, idChecklist, status)
            .then(r => res.json(r))
            .catch(e => res.status(500).json(e.sqlMessage));
    }
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    mapaModel.listar(idUsuario)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

module.exports = {
    inserir,
    listar
};