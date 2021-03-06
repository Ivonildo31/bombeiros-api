import { Response,Router } from 'express'
import {APIError,BaseModel,Model} from '../models'
import {BasePersistController} from '../controllers/BaseControllers'
import * as Bluebird from 'bluebird'

export class BaseRouter {
    respond (t: Bluebird<any>, res: Response): Bluebird<Response> {
        return t
        .then((u) => res.json(u))
        .catch((err: APIError) => {
            return res.status(err.statusCode).json({error: err.message, model: err.objectResponse})
        })
    }
}

export class PersistRouter<M extends BaseModel,C extends BasePersistController<M>> extends BaseRouter {
    controller: BasePersistController<M>
    router: Router

    constructor (models: Model, controller: BasePersistController<M>) {
        super()
        this.controller = controller
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
        this.router.put('/:id', (req, res, next) => this.respond(ctrl.update(req, res, next),res))

        /* DELETE deleta a página com o id. */
        this.router.delete('/:id', (req, res, next) => this.respond(ctrl.delete(req, res, next),res))

        /* POST search */
        this.router.post('/query', (req, res, next) => this.respond(ctrl.query(req, res, next),res))
    }

    public getRouter(): Router {
        return this.router
    }
}
