import {IModel} from './IModel'

export interface IVehicle extends IModel {
    active: boolean
    type: IVehicleType
    cargos: [ICargoType]
    optionals: [IOptional]
}

export interface IVehicleType extends IModel {
    icon: string
    maxDimensions: string
    maxWeight: string
    active: boolean
}

export interface ICargoType extends IModel {
    maxDimensions: string
    maxWeight: string
    cost: number
    active: boolean
}

export interface IOptional extends IModel {
    cost: number
    active: boolean
}
