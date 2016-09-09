import {ControllerPagina} from "./server/controllers/PaginaController";
import { Request, Response } from 'express'
import * as express from "express";

const router = express.Router()

export = ((models: any) => {
    const PaginaController: ControllerPagina = new ControllerPagina(models)

    /* GET todas as páginas. */
    router.get('/findall', (req,res) =>{
        let ctrl = new ControllerPagina(models)
        return ctrl.findAll 
    }) 

    /* GET busca a página com o id. */
    router.get('/find/:id', PaginaController.find)

    /* POST cria nova página. */
    router.post('/create', PaginaController.create)

    /* PUT atualiza a página. */
    router.put('/update', PaginaController.update)

    /* DELETE deleta a página com o id. */
    router.delete('/delete/:id', PaginaController.delete)

    /* GET home page. */
    router.get('/', function(req: Request, res: Response, next: Function) {
        res.render('index', { title: 'Express' })
    });

    return router
})