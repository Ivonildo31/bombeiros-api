import {DAO, baseModel, BaseModel} from './Model'

/**
 * Model para os usuários
 * 
 * @class User
 * @implements {Model.DAO<Model.IUser>}
 */

export class User extends BaseModel {
    name: string
    constructor(name: string,id?: string) {
        super(id)
        this.name = name
    }
}

export class UserDAO implements DAO<User> {
    users: any

    constructor(models: any) {
        this.users = models.Pagina
    }

    /**
     * Busca todas as páginas
     * 
     * @returns
     */
    public findAll(): Promise<Array<User>> {
        return this.users.run()
    }

    /**
     * Busca a página com o nome
     * 
     * @param {string} nome
     * @returns
     */
    public find(id: string): Promise<User> {
        return this.users.get(id)
    }

    /**
     * Cria uma nova página
     * 
     * @param {any} params
     * @returns
     */
    public create(user: User): Promise<User> {
        return (new this.users(user)).save()
    }

    /**
     * Atualiza a página com o id
     * 
     * @param {string} paginaId
     * @param {any} newParams
     * @param {string} userId
     * @returns
     */
    public update(user: User): Promise<User> {
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



export const userModel = (T: any) => {
  let ret = {name: T.type.string()}
  Object.assign(ret , baseModel)
  return ret
}
