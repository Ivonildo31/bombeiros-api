import  * as shortid from 'shortid'
import {IModel}  from '../interfaces/IModel'
import * as thinky from 'thinky'
import * as  Bluebird from 'bluebird'
/**
 * Model
 */
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

export let lib = {
    generateId : shortid.generate
}

export class BaseModel {
  id: string
  insertedAt: Date
  userId: string
  constructor(obj: IModel) {
    if (!obj.id) {
      this.id = shortid.generate()
    } else {
      this.id = obj.id
    }
    this.userId = obj.userId || null
    this.insertedAt = new Date()
  }
}

export const baseModel = (T: thinky.Thinky) : Object => {
  return {
    id: T.type.string().default(() => shortid.generate()),
    name: T.type.string().required(),
    userId: T.type.string(),
    insertedAt: T.type.date().default(new Date(Date.now()))
  }
}

export class DAO<T extends BaseModel> implements IDAO<T> {
  collection: thinky.Model<any,any,any>

  constructor(modelSchema: any) {
        if (!modelSchema) {
          throw Error('classe não instanciada corretamente')
        }
        this.collection = modelSchema
  }

  /**
   * busca todos os usuários
   * 
   * @returns {Bluebird<Array<IUser>>}
   * 
   * @memberOf UserDAO
   */
    public findAll(): Bluebird<Array<T>> {
        return this.collection.run()
    }

    /**
     * find user by id
     * 
     * @param {string} id
     * @returns {Bluebird<IUser>}
     * 
     * @memberOf UserDAO
     */
    public find(id: string): Bluebird<T> {
        return this.collection.get(id).run()
    }

    /**
     * create user
     * 
     * @param {IUser} user
     * @returns {Bluebird<IUser>}
     * 
     * @memberOf UserDAO
     */
    public create(obj: T): Bluebird<T> {
        throw Error('nao implementado')
    }

    /**
     * 
     * altera usuário 
     * @param {string} id
     * @param {IUser} user
     * @returns {Bluebird<IUser>}
     * 
     * @memberOf UserDAO
     */
    public update(id: string, obj: T): Bluebird<T> {
        return this.collection.get(obj.id).run()
        .then((curObj) => curObj.merge(obj).save() )
    }

    /**
     * delete user
     * 
     * @param {string} id
     * @returns {Bluebird<boolean>}
     * 
     * @memberOf UserDAO
     */
    public delete(id: string): Bluebird<boolean> {
        return this.find(id)
        .then((c: any) => c.delete())
        .then(() => true)
        .catch(() => false)
    }

  /**
   * 
   * realize search query using limits and page control
   * @param {Object} search
   * @param {number} [page]
   * @param {number} [limit]
   * @returns {Bluebird<IResultSearch<IUser>>}
   * 
   * @memberOf UserDAO
   */
  query(search: Object, page?: number, limit?: number, order?: string[]): Bluebird<IResultSearch<T>> {
        let _page: number = page || 1
        let _limit: number = limit || 10
        let _order: string[] = []
        return this.collection.filter(search).count().execute()
                   .then((countResult) => {
                     return this.collection.filter(search)
                                .orderBy(_order)
                                .limit(_limit)
                                .skip(((_page - 1) * _limit))
                                .run()
                                .then((results) => {
                                      return {
                                        page : _page,
                                        total: countResult,
                                        result: results
                                      } as IResultSearch<T>
                                })
                   })
  }
}

export interface IDAO<T extends BaseModel> {
    create(t: T): Bluebird<T>
    find(id: string): Bluebird<T>
    findAll(): Bluebird<T[]>
    update(id: string, t: T): Bluebird<T>
    delete(id: string): Bluebird<boolean>
    query(search: Object, page?: number, limit?: number): Bluebird<IResultSearch<T>>
}

export interface IResultSearch<T extends BaseModel> {
  page: number,
  total: number,
  result: T[]
}
