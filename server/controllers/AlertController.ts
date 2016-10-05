import {Model} from '../models'
import {BasePersistController} from './BaseControllers'
import {IAlert} from '../interfaces/IAlert'

export class AlertController extends BasePersistController<IAlert> {
    public constructor(model: Model) {
        super(model,model.db.alerts)
    }
}
