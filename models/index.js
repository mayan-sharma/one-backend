const db = require('../config/postgres')
const { initModels } = require('./init-models')

db.authenticate()
    .then(
        console.log(
            'Connection has been established successfully.',
        ),
    )
    .catch(err => {
        console.error(
            'Unable to connect to the database:',
            err,
        )
    })

db.sync({ force: true })
    .then(console.log('DB Synced!'))
    .catch(err => {
        console.log('Unable to sync database: ', err)
    })

models = { ...initModels(db) }

module.exports = db