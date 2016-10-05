import {UserDAO} from '../models/User'
import { IRethinkDBConfig,rethinkdbconfig } from '../config/rethinkdb'
import * as thinky from 'thinky'
import  * as shortid from 'shortid'

/**
 * 
 * tipos de dados para persistir no schema 
 * com esse tipo de dados é possivel criar o schema
 * TODO 
 * @export
 * @interface IModelsDAO
 */
// const model =  { id: this.t.type.string().default(() => shortid.generate()),
//                  name: this.t.type.string().required(),
//                  userId: this.t.type.string(),
//                  insertedAt: this.t.type.date().default(new Date(Date.now()))
// }

/**
 * 
 * para uma interface forte, sempre é bom declarar aqui os elmentos da as persistencias
 * a declaracao faz parte do escopo de criacao e coordenacao de todo o schema
 * 
 * interface do dao
 * 
 * @interface IModelsDAO
 */
export interface IModelsDAO {
    users: UserDAO
}

/**
 * interface do modelo pelo schema declarado
 * 
 * @interface IModelsSchema
 */

export interface IModelsSchema {
    User: any
}

export class ClassSchemas {
    modelSchema: IModelsSchema
    models: IModelsDAO
    t: thinky.Thinky
    constructor(config: IRethinkDBConfig) {
        this.t = thinky(rethinkdbconfig)
        this.generateModelSchema()
        this.generateModels()
    }

    public GetModels(): IModelsDAO {
        return this.models
    }

    public GetModelSchema(): IModelsSchema {
        return this.modelSchema
    }

    private generateModelSchema() {
        this.modelSchema = {
            User: this.t.createModel('users', {
                id: this.t.type.string().default(() => shortid.generate()),
                name: this.t.type.string().required(),
                userId: this.t.type.string(),
                insertedAt: this.t.type.date().default(new Date(Date.now()))
            })
        }
    }

    private generateModels() {
        this.models = {
            users : new UserDAO(this.GetAllModels())
        }
    }

    private GetAllModels() {
        return this.modelSchema
    }
}
