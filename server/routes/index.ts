import {UserRouter} from './UserRouter'
import {AlertRouter} from './AlertRouter'
import * as express  from 'express'
import {Model} from '../models'
import { IRethinkDBConfig } from '../config/rethinkdb'

export namespace main {
    export const callRoutes = (app: express.Application, rethinkdbconfig: IRethinkDBConfig): express.Application => {
        let models = new Model(rethinkdbconfig)
        app.use('/cbmes/users', new UserRouter(models).getRouter())
        app.use('/cbmes/alerts', new AlertRouter(models).getRouter())
        app.use('/cbmes', (req,res,nex) => res.json('ok'))
        return app
    }
}
