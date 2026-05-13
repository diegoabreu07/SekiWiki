var express = require("express");
var router = express.Router();

var bossController = require("../controllers/bossController");

router.post("/inserir", function (req, res) {
    bossController.inserir(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    bossController.listar(req, res);
});

module.exports = router;