export class PaginaModel {
    Pagina: any

    constructor(models: any) {
        this.Pagina = models.Pagina
    }

    /**
     * Busca todas as páginas
     * 
     * @returns
     */
    public findAll() {
        return this.Pagina.run()
    }

    /**
     * Busca a página com o nome
     * 
     * @param {string} nome
     * @returns
     */
    public findById(paginaId: string) {
        return this.Pagina.get(paginaId)
    }

    /**
     * Cria uma nova página
     * 
     * @param {any} params
     * @returns
     */
    public create(params: any) {
        return (new this.Pagina(params)).save()
    }

    /**
     * Atualiza a página com o id
     * 
     * @param {string} paginaId
     * @param {any} newParams
     * @param {string} userId
     * @returns
     */
    public update(paginaId: string, newParams: any, userId: string) {
        return this.findById(paginaId).then((pagina: any) => {
            if (pagina.nome !== newParams.nome || pagina.descricao !== newParams.descricao) {
                let { nome, descricao } = newParams
                let lastUpdate = {
                    userId,
                    nome: pagina.nome,
                    descricao: pagina.descricao,
                    updatedAt: new Date(Date.now())
                }

                return this.findById(paginaId).update({ nome, descricao, lastUpdate })
            } else {
                return this.findById(paginaId)
            }
        })
    }

    /**
     * Apaga a página com o id
     * 
     * @param {string} paginaId
     * @returns
     */
    public delete(paginaId: string) {
        return this.findById(paginaId)
        .then((c: any) => c.delete())
    }
}
