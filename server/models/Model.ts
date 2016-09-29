import  * as shortid from 'shortid'
import {IModelInterface}  from '../interfaces/IModelInterface'
import {Thinky} from 'thinky'
import * as Bluebird from 'bluebird'
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
  constructor(obj: IModelInterface) {
    if (!obj.id) {
      this.id = shortid.generate()
    } else {
      this.id = obj.id
    }
    this.insertedAt = new Date()
  }
}

export const baseModel = (T: Thinky) : Object => {
  return {
    id: T.type.string().default(() => shortid.generate()),
    insertedAt: T.type.date().default(new Date(Date.now()))
  }
}

export interface DAO<T extends BaseModel> {
    create(t: T): Bluebird<T>
    find(id: string): Bluebird<T>
    findAll(): Bluebird<T[]>
    update(t: T): Bluebird<T>
    delete(id: string): Bluebird<boolean>
}
