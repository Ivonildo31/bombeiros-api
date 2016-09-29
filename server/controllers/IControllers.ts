import {IModelsDAO,IModelsSchema} from '../models'
import { Request, Response } from 'express'
import  * as Bluebird  from 'bluebird'

export interface IPersistController<T> {
    db: IModelsDAO
    models: IModelsSchema
    find(req: Request, res: Response, next?: Function): Bluebird<T>
    findAll(req: Request, res: Response, next?: Function): Bluebird<T[]>
    create(req: Request, res: Response, next?: Function): Bluebird<T>
    // public update(req: Request, res: Response, next?: Function) {
    //     // TOdo Alterar parâmetro 'id' para req.user.id
    //     return db.users.update(req.body.id, req.body, 'idTemporario')
    //         .then(pagina => {
    //             return res.status(200).json(pagina)
    //         })
    //         .catch(error => res.status(400).json(error))
    // }
    delete(req: Request, res: Response, next?: Function): Bluebird<boolean>
}
