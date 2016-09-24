import {UserRouter} from './UserRouter'
import * as express  from 'express'
import {models} from '../models'

export namespace main {
    export const callRoutes = (app: express.Application): express.Application => {
        app.use('/', new UserRouter(models).getRouter())
        return app
    }
}

