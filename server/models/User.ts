import {DAO, baseModel, BaseModel} from './Model'
import {IUserInterface} from '../interfaces/IUserInterface'
import * as thinky from 'thinky'
import  * as shortid from 'shortid'
/**
 * Model para os usuários
 * 
 * @class User
 * @implements {Model.DAO<Model.User>}
 */

export class User extends BaseModel implements IUserInterface {
    email: string
    userId: string
    constructor(obj: IUserInterface) {
        super(obj)
        this.email = obj.email
        this.userId = obj.userId
    }
}

export class UserDAO implements DAO<IUserInterface> {
    users: any

    constructor(models: any) {
        this.users = models.User
    }

    /**
     * Busca todas as páginas
     * 
     * @returns
     */
    public findAll(): Promise<Array<IUserInterface>> {
        return this.users.run()
    }

    /**
     * Busca a página com o nome
     * 
     * @param {string} nome
     * @returns
     */
    public find(id: string): Promise<IUserInterface> {
        return this.users.get(id)
    }

    /**
     * Cria uma nova página
     * 
     * @param {any} params
     * @returns
     */
    public create(user: IUserInterface): Promise<IUserInterface> {
        let _user = new User(user)
        return (new this.users(_user)).save()
    }

    /**
     * Atualiza a página com o id
     * 
     * @param {string} paginaId
     * @param {any} newParams
     * @param {string} userId
     * @returns
     */
    public update(newUser: IUserInterface): Promise<IUserInterface> {
        return this.find(newUser.id).then((oldUser: IUserInterface) => {
            if (oldUser.email !== newUser.email || oldUser.userId !== newUser.userId) {
                return this.users.
            } else {
                return Promise.resolve(oldUser)
            }
            return oldUser
        })
    }

    /**
     * Apaga a página com o id
     * 
     * @param {string} paginaId
     * @returns
     */
    public delete(id: string): Promise<boolean> {
        return this.find(id)
        .then((c: any) => c.delete())
        .then(() => true)
        .catch(() => false)
    }
}


