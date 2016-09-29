import  * as shortid from 'shortid'
import {IModelInterface}  from '../interfaces/IModelInterface'
import {Thinky} from 'thinky'
import {Thenable} from 'bluebird'
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
    create(t: T): Thenable<T>
    find(id: string): Thenable<T>
    findAll(): Thenable<T[]>
    update(t: T): Thenable<T>
    delete(id: string): Thenable<boolean>
}
