export let rethinkdbconfig = {
    host: process.env.RETHINKDB_HOST || 'localhost',
    port: process.env.RETHINKDB_PORT || 28015,
    db: process.env.RETHINKDB_DB || 'getpressback'
}

export interface rethinkdbconfig {
    host: string
    port: number
    db: string
}