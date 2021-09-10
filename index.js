const express = require('express');
const cors = require('cors');

const config = require('./config/config');
const db = require('./config/postgres');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true}));

db.sync();
db.authenticate().then(() => console.log('Db connected...')).catch((err) => console.error(err));

app.use('/api', routes);

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});