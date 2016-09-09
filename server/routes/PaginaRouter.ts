import { PaginaController } from "../controllers/PaginaController";
import { Request, Response } from 'express'
import * as express from "express";

export class PaginaRouter {
    Controller: PaginaController
    router: express.Router

    constructor (models: any){
        this.Controller = new PaginaController(models)
        this.router = express.Router()
        this.routers()
    }

    public routers() {
        let ctrl = this
        /* GET todas as páginas. */
        this.router.get('/findall', (req, res, next) => ctrl.Controller.findAll(req, res, next)) 

        /* GET busca a página com o id. */
        this.router.get('/find/:id', (req, res, next) => ctrl.Controller.find(req, res, next))

        /* POST cria nova página. */
        this.router.post('/create', (req, res, next) => ctrl.Controller.create(req, res, next))

        /* PUT atualiza a página. */
        this.router.put('/update', (req, res, next) => ctrl.Controller.update(req, res, next))

        /* DELETE deleta a página com o id. */
        this.router.delete('/delete/:id', (req, res, next) => ctrl.Controller.delete(req, res, next))

        /* GET home page. */
        this.router.get('/', function(req: Request, res: Response, next: Function) {
            res.render('index', { title: 'Express' })
        });
    }

    public getRouter(): express.Router {
        return this.router
    }
}
