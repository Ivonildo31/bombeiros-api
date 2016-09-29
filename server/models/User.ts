import {DAO, BaseModel} from './Model'
import {IUserInterface} from '../interfaces/IUserInterface'
import * as thinky from 'thinky'
import {Thenable} from 'bluebird'
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
    users: thinky.Model<any,any,any>

    constructor(models: any) {
        this.users = models.User
    }

    /**
     * Busca todas as páginas
     * 
     * @returns
     */
    public findAll(): Thenable<Array<IUserInterface>> {
        return this.users.run()
    }

    /**
     * Busca a página com o nome
     * 
     * @param {string} nome
     * @returns
     */
    public find(id: string): Thenable<IUserInterface> {
        return this.users.get(id).run()
    }

    /**
     * Cria uma nova página
     * 
     * @param {any} params
     * @returns
     */
    public create(user: IUserInterface): Thenable<IUserInterface> {
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
    public update(newUser: IUserInterface): Thenable<IUserInterface> {
        return this.find(newUser.id).then((oldUser: IUserInterface) => {
            if (oldUser.email !== newUser.email || oldUser.userId !== newUser.userId) {
                return this.users.save(newUser).then(d => newUser)
            } else {
                return Promise.resolve(oldUser)
            }
        })
    }

    /**
     * Apaga a página com o id
     * 
     * @param {string} paginaId
     * @returns
     */
    public delete(id: string): Thenable<boolean> {
        return this.find(id)
        .then((c: any) => c.delete())
        .then(() => true)
    }
}
