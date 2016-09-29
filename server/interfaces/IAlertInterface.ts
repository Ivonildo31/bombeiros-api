import {IModelInterface} from './IModelInterface'

export interface IAlert extends IModelInterface {
    active: boolean
    title: string
    message: string
    beginDate: Date
    endDate: Date
    level: ELevel
    region: IRegion
}

interface IRegion {
  type: Etype
  center: IPos
  polygon: [IPos]
  radius: number
}

interface IPos {
  lat: number
  lon: number
}

enum ELevel {
    alto = 1,
    medio = 2,
    baixo = 3
}

enum Etype {
    circle = 1,
    polygon = 2,
    baixo = 3
}
