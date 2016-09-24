import {ClassSchemas, IModelsDAO ,IModelsSchema} from './Schemas'
import { IRethinkDBConfig } from '../config/rethinkdb'

export {User,UserDAO} from './User'
export {IModelsDAO,IModelsSchema} from './Schemas'


export class DbConn {
    db: IModelsDAO
    models: IModelsSchema
    constructor(rethinkdbconfig: IRethinkDBConfig) {
        const classSchema = new ClassSchemas(rethinkdbconfig)
        this.db = classSchema.GetModels()
        this.models = classSchema.GetModelSchema()
    }
}
