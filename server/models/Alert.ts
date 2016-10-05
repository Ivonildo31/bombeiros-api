import {DAO, BaseModel} from './Model'
import {IModelsSchema} from './Schemas'
import {IAlert,TypeLevel,TypeRender}  from '../interfaces/IAlert'
import * as thinky from 'thinky'
import * as  Bluebird from 'bluebird'
/**
 * Model para os usuários
 * 
 * @class User
 * @implements {Model.DAO<Model.User>}
 */

export class Alert extends BaseModel implements IAlert {
    level: TypeLevel
    title: string
    message: string
    beginDate: Date
    endDate: Date
    region: {
        type: TypeRender,
        center: {lat: number, lon: number},
        polygon: [{lat: number, lon: number}],
        radius: number
    }



    constructor(obj: IAlert) {
        super(obj)
        this.level = obj.level
        this.title = obj.title
        this.message = obj.message
        this.beginDate = obj.beginDate
        this.endDate = obj.endDate
        this.region = obj.region
    }
}

export class AlertDAO extends DAO<IAlert> {
    collection: thinky.Model<any,any,any>

    constructor(models: IModelsSchema) {
        super(models.Alert)
    }

    /**
     * Cria uma nova página
     * 
     * @param {any} params
     * @returns
     */
    public create(alert: IAlert): Bluebird<IAlert> {
        let _alert = new Alert(alert)
        return (new this.collection(_alert)).save()
    }
}
