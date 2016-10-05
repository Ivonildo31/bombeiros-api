import {DAO, BaseModel} from './Model'
import {IModelsSchema} from './Schemas'
import {IUser} from '../interfaces/IUser'
import * as thinky from 'thinky'
import * as  Bluebird from 'bluebird'
/**
 * Model para os usuários
 * 
 * @class User
 * @implements {Model.DAO<Model.User>}
 */

export class User extends BaseModel implements IUser {
    name: string
    email: string
    constructor(obj: IUser) {
        super(obj)
        this.name = obj.name
        this.email = obj.email
    }
}

export class UserDAO extends DAO<IUser> {
    collection: thinky.Model<any,any,any>

    constructor(models: IModelsSchema) {
        super(models.User)
    }

    /**
     * Cria uma nova página
     * 
     * @param {any} params
     * @returns
     */
    public create(user: IUser): Bluebird<IUser> {
        let _user = new User(user)
        return (new this.collection(_user)).save()
    }
}
