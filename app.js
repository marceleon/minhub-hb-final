require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoDB = require('./keydb');

console.log(mongoDB.URL);

mongoose.connect(mongoDB.URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});

app.use('/api/v1', require('./src/routers/routers'));
