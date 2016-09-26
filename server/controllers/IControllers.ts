import {IModelsDAO,IModelsSchema} from '../models'
import { Request, Response } from 'express'

export interface IPersistController<T> {
    db: IModelsDAO
    models: IModelsSchema
    find(req: Request, res: Response, next?: Function): Promise<T>
    findAll(req: Request, res: Response, next?: Function): Promise<[T]>
    create(req: Request, res: Response, next?: Function): Promise<T>
    // public update(req: Request, res: Response, next?: Function) {
    //     // TOdo Alterar parâmetro 'id' para req.user.id
    //     return db.users.update(req.body.id, req.body, 'idTemporario')
    //         .then(pagina => {
    //             return res.status(200).json(pagina)
    //         })
    //         .catch(error => res.status(400).json(error))
    // }
    delete(req: Request, res: Response, next?: Function): Promise<boolean>
}
