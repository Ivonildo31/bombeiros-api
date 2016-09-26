import {ClassSchemas, IModelsDAO ,IModelsSchema} from './Schemas'
import { IRethinkDBConfig } from '../config/rethinkdb'

export {User,UserDAO} from './User'
export {APIError} from './APIError'
export {IModelsDAO,IModelsSchema} from './Schemas'

export class Model {
    db: IModelsDAO
    entities: IModelsSchema
    constructor(rethinkdbconfig: IRethinkDBConfig) {
        const classSchema = new ClassSchemas(rethinkdbconfig)
        this.db = classSchema.GetModels()
        this.entities = classSchema.GetModelSchema()
    }
}
