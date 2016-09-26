import {UserRouter} from './UserRouter'
import * as express  from 'express'
import {Model} from '../models'
import { IRethinkDBConfig } from '../config/rethinkdb'

export namespace main {
    export const callRoutes = (app: express.Application, rethinkdbconfig: IRethinkDBConfig): express.Application => {
        let models = new Model(rethinkdbconfig)
        app.use('/users', new UserRouter(models).getRouter())
        app.use('/', (req,res,nex) => res.json('ok'))
        return app
    }
}
