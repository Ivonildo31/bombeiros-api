import {IModel} from './IModel'

export interface IUser extends IModel {
    name: string
    tpPessoa: TypePerson
    tpUsuario: TypeUser
    active: boolean
    numDocFed: string
    telephone: string
    email: string
    password: string
    zipCode: string
    address: string
    number: string
    complement: string
    neighbor: string
    state: string
    country: string
}

enum TypePerson {
    Personal = 0,
    Enterprise = 1
}


enum TypeUser {
    Client = 0,
    Freighter = 1,
    Operator = 2,
    Administrator = 3
}


