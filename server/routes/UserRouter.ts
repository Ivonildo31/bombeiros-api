import { UserController } from '../controllers/UserController'
import {BaseRouter} from './BaseRouter'
import { Model } from '../models'
import {Router} from 'express'

export class UserRouter extends BaseRouter {
    controller: UserController
    router: Router

    constructor (models: Model) {
        super()
        this.controller = new UserController(models)
        this.router = Router()
        this.routers()
    }

    public routers() {
        let ctrl = this.controller
        /* GET todas as páginas. */
        this.router.get('/', (req, res, next) => this.respond(ctrl.findAll(req, res, next),res))

        /* GET busca a página com o id. */
        this.router.get('/:id', (req, res, next) => this.respond(ctrl.find(req, res, next),res))

        /* POST cria nova página. */
        this.router.post('/', (req, res, next) => this.respond(ctrl.create(req, res, next),res))

        /* PUT atualiza a página. */
        // this.router.put('/update', (req, res, next) => ctrl.Controller.update(req, res, next))

        /* DELETE deleta a página com o id. */
        this.router.delete('/delete/:id', (req, res, next) => this.respond(ctrl.delete(req, res, next),res))
    }

    public getRouter(): Router {
        return this.router
    }
}
