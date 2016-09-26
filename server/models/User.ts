import {DAO, baseModel, BaseModel} from './Model'
import {IUser}  from '../interfaces/IUser'
/**
 * Model para os usuários
 * 
 * @class User
 * @implements {Model.DAO<Model.User>}
 */

export class User extends BaseModel {
    name: string
    constructor(obj: IUser) {
        super(obj)
        this.name = obj.name
    }
}

export class UserDAO implements DAO<IUser> {
    users: any

    constructor(models: any) {
        this.users = models.User
    }

    /**
     * Busca todas as páginas
     * 
     * @returns
     */
    public findAll(): Promise<Array<IUser>> {
        return this.users.run()
    }

    /**
     * Busca a página com o nome
     * 
     * @param {string} nome
     * @returns
     */
    public find(id: string): Promise<IUser> {
        return this.users.get(id)
    }

    /**
     * Cria uma nova página
     * 
     * @param {any} params
     * @returns
     */
    public create(user: IUser): Promise<IUser> {
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
    public update(user: User): Promise<IUser> {
        return this.find(user.id).then((pagina: any) => {
            // if (pagina.nome !== newParams.nome || pagina.descricao !== newParams.descricao) {
            //     let { nome, descricao } = newParams
            //     let lastUpdate = {
            //         userId,
            //         nome: pagina.nome,
            //         descricao: pagina.descricao,
            //         updatedAt: new Date(Date.now())
            //     }

            //     return this.find(id).update({ nome, descricao, lastUpdate })
            // } else {
            //     return this.find(id)
            // }
            return user
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

export const userModel = (t: any) => {
  let ret = {}
  Object.assign(ret , baseModel(t))
  return ret
}
