import {db,User,IModelsDAO,IModelsSchema} from '../models'
import { Request, Response } from 'express'

export class UserController {

    public find(req: Request, res: Response, next?: Function) {
        return db.users.find(req.params.id)
            .then(pagina => {
                return res.status(200).json(pagina)
            })
            .catch(error => res.status(400).json(error))
    }

    public findAll(req: Request, res: Response, next?: Function) {
        return db.users.findAll()
            .then(pagina => {
                return res.status(200).json(pagina)
            })
            .catch(error => {
                return res.status(400).json({ error })
            })
    }

    public create(req: Request, res: Response, next?: Function) {
        return db.users.create(req.body)
            .then(pagina => {
                return res.status(201).json(pagina)
            })
            .catch(error => res.status(400).json(error))
    }

    // public update(req: Request, res: Response, next?: Function) {
    //     // TOdo Alterar parâmetro 'id' para req.user.id
    //     return db.users.update(req.body.id, req.body, 'idTemporario')
    //         .then(pagina => {
    //             return res.status(200).json(pagina)
    //         })
    //         .catch(error => res.status(400).json(error))
    // }

    public delete(req: Request, res: Response, next?: Function) {
        return db.users.delete(req.params.id)
            .then((pagina) => {
                return res.status(200).json({ success: true })
            })
            .catch(error => res.status(400).json(error))
    }
}
