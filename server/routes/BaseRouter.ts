import { Response } from 'express'
import {APIError} from '../models'
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
