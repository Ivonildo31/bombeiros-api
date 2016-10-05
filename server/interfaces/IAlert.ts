import {IModel} from './IModel'


export interface IAlert extends IModel {
  level: TypeLevel,
  title: string,
  message: string,
  beginDate: Date,
  endDate: Date,
  region: {
    type: TypeRender,
    center: {lat: number, lon: number},
    polygon: [{lat: number, lon: number}],
    radius: number
 }
}

export enum TypeLevel {
    alto = 2,
    medio = 1,
    baixo = 0,
}

export enum TypeRender {
    circle = 0,
    polygon = 1
}
