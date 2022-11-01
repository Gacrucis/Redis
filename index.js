const express = require('express');
const redis = require('redis');

const redis_host = '127.0.0.1'
const redis_port = 7000

const client = redis.createClient({
    socket: {
        host: redis_host,
        port: redis_port
    }
});

client.on('error', err => {
    console.log('Redis error: ' + err);
});

console.log(`Conectado a redis en ${redis_host}:${redis_port}`)

const app = express();
const PORT = 8080;

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Sirviendo en http://localhost:${PORT}`)
);

app.get('/students', (req, res) => {
    res.status(200).send({
        code: 2183074,
        name: 'Gianfranco',
        program: 'Sistemas',
        level: 9
    })
});

app.post('/addstudent/:codigo', (req, res) => {
    const { codigo } = req.params;
    const { name } = req.body;
    const { program } = req.body;
    const { email } = req.body;
    const { level } = req.body;


    if (!codigo) {
        res.status(418).send({ message: 'Complete la información!'})
    }



    res.send({
        newStudent: `Agregado el estudiante ${name} con código ${code} de nivel ${level} del programa de ${program}`
    })

});