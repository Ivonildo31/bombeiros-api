"use strict"

import { PaginaModel } from '../models/PaginaModel'
import { Request, Response } from 'express'

export class PaginaController {
    Pagina: PaginaModel

    constructor(models: any) {
        this.Pagina = new PaginaModel(models)
    }

    public find(req: Request, res: Response, next?: Function) {
        return this.Pagina.findById(req.params.id)
            .then(pagina => {
                return res.status(200).json(pagina)
            })
            .catch(error => res.status(400).json(error))
    }

    public findAll(req: Request, res: Response, next?: Function) {
        return this.Pagina.findAll()
            .then(pagina => {
                return res.status(200).json(pagina)
            })
            .catch(error => {
                return res.status(400).json({ error })
            })
    }

    public create(req: Request, res: Response, next?: Function) {
        return this.Pagina.create(req.body)
            .then(pagina => {
                return res.status(201).json(pagina)
            })
            .catch(error => res.status(400).json(error))
    }

    public update(req: Request, res: Response, next?: Function) {
        // TOdo Alterar parâmetro 'id' para req.user.id
        return this.Pagina.update(req.body.id, req.body, 'idTemporario')
            .then(pagina => {
                return res.status(200).json(pagina)
            })
            .catch(error => res.status(400).json(error))
    }

    public delete(req: Request, res: Response, next?: Function) {
        return this.Pagina.delete(req.params.id)
            .then((pagina) => {
                return res.status(200).json({ success: true })
            })
            .catch(error => res.status(400).json(error))
    }
}
