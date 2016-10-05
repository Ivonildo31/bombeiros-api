import {UserDAO} from '../models/User'
import {AlertDAO} from '../models/Alert'
import { IRethinkDBConfig,rethinkdbconfig } from '../config/rethinkdb'
import * as thinky from 'thinky'
import * as shortid from 'shortid'

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
    alerts: AlertDAO
}

/**
 * interface do modelo pelo schema declarado
 * 
 * @interface IModelsSchema
 */

export interface IModelsSchema {
    User: any
    Alert: any
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


// level: TypeLevel,
//   title: string,
//   message: string,
//   beginDate: Date,
//   endDate: Date,
//   region: {
//     type: TypeRender,
//     center: {lat: number, lon: number},
//     polygon: [{lat: number, lon: number}],
//     radius: number
//  }

    private generateModelSchema() {
        // let point = {lat: this.t.type.number().required(), lon: this.t.type.number().required()}
        // let region = {
        //           type: this.t.type.number(),
        //           center: this.t.type.object(),
        //           polygon: [this.t.type.object()],
        //           radius: this.t.type.number()
        //         }

        this.modelSchema = {
            User: this.t.createModel('users', {
                id: this.t.type.string().default(() => shortid.generate()),
                name: this.t.type.string().required(),
                email: this.t.type.string().required(),
                userId: this.t.type.string(),
                insertedAt: this.t.type.date().default(new Date(Date.now()))
            }),
            Alert: this.t.createModel('alerts', {
                id: this.t.type.string().default(() => shortid.generate()),
                userId: this.t.type.string(),
                insertedAt: this.t.type.date().default(new Date(Date.now())),
                level: this.t.type.number().required().default(2),
                title: this.t.type.string().required(),
                message: this.t.type.string().required(),
                beginDate: this.t.type.date().required(),
                endDate: this.t.type.date(),
                region: this.t.type.object()
            })
        }
    }

    private generateModels() {
        this.models = {
            users : new UserDAO(this.GetAllModels()),
            alerts : new AlertDAO(this.GetAllModels())
        }
    }

    private GetAllModels() {
        return this.modelSchema
    }
}
