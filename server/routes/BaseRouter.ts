import { Response } from 'express'
import {APIError} from '../models'
export class BaseRouter {
    respond (t: Promise<any>, res: Response): Promise<Response> {
        return t
        .then((u) => res.json(u))
        .catch((err: APIError) => {
            return res.status(err.statusCode).json({error: err.message, model: err.objectResponse})
        })
    }
}
