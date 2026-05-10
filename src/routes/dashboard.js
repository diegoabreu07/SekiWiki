var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/conquistasConcluidas/:idUsuario", function (req, res) {
    dashboardController.conquistasConcluidas(req, res);
});

router.get("/progressoConquistas/:idUsuario", function (req, res) {
    dashboardController.progressoConquistas(req, res);
});

router.get("/progressoMapa/:idUsuario", function (req, res) {
    dashboardController.progressoMapa(req, res);
});

router.get("/progressoGeral/:idUsuario", function (req, res) {
    dashboardController.progressoGeral(req, res);
});

router.get("/progressoUsuarioPorArea/:idUsuario", function (req, res) {
    dashboardController.progressoUsuarioPorArea(req, res);
});

router.get("/conquistaMaisRara", function (req, res) {
    dashboardController.conquistaMaisRara(req, res);
});

router.get("/bossMaisTemido", function (req, res) {
    dashboardController.bossMaisTemido(req, res);
});

router.get("/mediaGlobalPorArea", function (req, res) {
    dashboardController.mediaGlobalPorArea(req, res);
});
router.get("/bossesTaxaDerrota", function (req, res) {
    dashboardController.bossesTaxaDerrota(req, res);
});

module.exports = router;