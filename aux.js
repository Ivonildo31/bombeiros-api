"use strict";
const PaginaController_1 = require("./server/controllers/PaginaController");
const express = require("express");
const router = express.Router();
module.exports = ((models) => {
    const PaginaController = new PaginaController_1.ControllerPagina(models);
    /* GET todas as páginas. */
    router.get('/findall', (req, res) => {
        let ctrl = new PaginaController_1.ControllerPagina(models);
        return ctrl.findAll;
    });
    /* GET busca a página com o id. */
    router.get('/find/:id', PaginaController.find);
    /* POST cria nova página. */
    router.post('/create', PaginaController.create);
    /* PUT atualiza a página. */
    router.put('/update', PaginaController.update);
    /* DELETE deleta a página com o id. */
    router.delete('/delete/:id', PaginaController.delete);
    /* GET home page. */
    router.get('/', function (req, res, next) {
        res.render('index', { title: 'Express' });
    });
    return router;
});
//# sourceMappingURL=aux.js.map