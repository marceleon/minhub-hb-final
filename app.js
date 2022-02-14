require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch((err) => console.log(err));

const app = express();

/*
app.get('/clients', (req, res) => {
    res.send('Hello NEW World!');
});
*/

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});

app.use('/api/v1', require('./src/routers/routers'));
