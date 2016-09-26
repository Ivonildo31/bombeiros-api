import {APIError,User,Model,IModelsDAO,IModelsSchema} from '../models'
import { Request, Response } from 'express'
import { IPersistController } from './IControllers'

export class UserController implements IPersistController<User> {
    db: IModelsDAO
    models: IModelsSchema
    public constructor(model: Model) {
        this.db = model.db
        this.models = model.entities
    }
    public find(req: Request, res: Response, next?: Function): Promise<User> {
        return this.db.users.find(req.params.id)
            .then(users => {
                res.status(200)
                return users
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }

    public findAll(req: Request, res: Response, next?: Function): Promise<[User]> {
        return this.db.users.findAll()
            .then(users => {
                res.status(201)
                return users
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }

    public create(req: Request, res: Response, next?: Function): Promise<User> {
        return this.db.users.create(req.body)
            .then(user => {
                res.status(201)
                return user
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }

    // public update(req: Request, res: Response, next?: Function) {
    //     // TOdo Alterar parâmetro 'id' para req.user.id
    //     return db.users.update(req.body.id, req.body, 'idTemporario')
    //         .then(pagina => {
    //             return res.status(200).json(pagina)
    //         })
    //         .catch(error => res.status(400).json(error))
    // }

    public delete(req: Request, res: Response, next?: Function): Promise<boolean> {
        return this.db.users.delete(req.params.id)
            .then((isDeleted) => {
                res.status(200)
                return isDeleted
            })
            .catch(error => {
                throw new APIError(error,400)
            })
    }
}
