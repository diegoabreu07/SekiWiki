var express = require("express");
var router = express.Router();

var mapaController = require("../controllers/mapaController");

router.post("/inserir", function (req, res) {
    mapaController.inserir(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    mapaController.listar(req, res);
});

module.exports = router;