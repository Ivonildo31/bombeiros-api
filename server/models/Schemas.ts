import { PaginaModel } from "../models/PaginaModel";
import { rethinkdbconfig } from "../config/rethinkdb";

const _ = require('lodash')
const thinky = require("thinky")
const shortid = require('shortid')
const bluebird = require("bluebird")

export class ClassSchemas {
    T: any
    allModels: any = {}
    Models: any = {}

    constructor(config: rethinkdbconfig) {
        this.T = thinky(config)
        this.geraAllModels()
        this.geraModels()
    }

    private geraAllModels() {
        this.allModels.Pagina = this.T.createModel("Pagina", {
            id: this.T.type.string().default(() => shortid.generate()),
            nome: this.T.type.string().required(),
            descricao: this.T.type.string().required(),
            lastUpdate: this.T.type.object().schema({
                userId: this.T.type.string().required(),
                updatedAt: this.T.type.date().default(new Date(Date.now())),
                nome: this.T.type.string().required(),
                descricao: this.T.type.string().required()
            }),
            insertedAt: this.T.type.date().default(new Date(Date.now()))
        })
    }
    
    private geraModels() {
        this.Models.Pagina = new PaginaModel(this.GetAllModels()).Pagina
    }

    private GetAllModels() {
        return this.allModels
    }

    public GetModels() {
        return this.Models
    }
}
