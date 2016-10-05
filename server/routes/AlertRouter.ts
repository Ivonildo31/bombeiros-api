import { AlertController } from '../controllers/AlertController'
import {PersistRouter} from './BaseRouter'
import { Model,IAlert } from '../models'
import {Router} from 'express'

export class AlertRouter extends PersistRouter<IAlert,AlertController> {
    controller: AlertController
    router: Router

    constructor (models: Model) {
        let ctrl = new AlertController(models)
        super(models,ctrl)
    }
}
