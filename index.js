#!/usr/bin/node

const express = require('express');
const redis = require('redis');

// const redis_host = '127.0.0.1'
const redis_host = 'redis'
// const redis_port = 7000
const redis_port = 6379

const client = redis.createClient({
    socket: {
        host: redis_host,
        port: redis_port
    }
});

client.on('error', err => {
    console.log('Redis error: ' + err);
});

client.connect();

console.log(`Conectado a redis en ${redis_host}:${redis_port}`)

const app = express();
const PORT = 8080;

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Sirviendo en http://localhost:${PORT}`)
);

app.get('/students/:id', (req, res) => {

    let id = req.params.id

    const getClient = async (student_id) => {
        const a = await client.hGetAll(toString(student_id));
        return a;
    };

    getClient(id)
        .then(value => res.send(value))
        .catch(err => res.send({msg: 'I did an oppsie', error: err}))

});

app.post('/addstudent/:id', (req, res) => {
    const { id } = req.body;
    const { code } = req.body;
    const { name } = req.body;
    const { program } = req.body;
    const { email } = req.body;
    const { level } = req.body;

    console.log('POST RECIBIDO')

    if (!code) {
        res.status(418).send({ message: 'Complete la información!'})
        return
    }

    client.hSet(toString(code), req.body)

    const printClient = async () => {
        const a = await client.hGetAll(toString(code));
    };

    printClient();

    res.send({
        newStudent: `Agregado el estudiante ${name} con código ${code} de nivel ${level} del programa de ${program}`
    })

});