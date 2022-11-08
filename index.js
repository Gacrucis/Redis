#!/usr/bin/node

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
        console.log(a);
        return a;
    };

    let student = getClient(id);

    res.send({
        code: `Sirviendo`
    });
});

app.post('/addstudent/:id', (req, res) => {
    const { id } = req.body;
    const { code } = req.body;
    const { name } = req.body;
    const { program } = req.body;
    const { email } = req.body;
    const { level } = req.body;

    if (!code) {
        res.status(418).send({ message: 'Complete la información!'})
        return
    }

    client.hSet(toString(code), req.body)

    const printClient = async () => {
        const a = await client.hGetAll(toString(code));
        console.log(a);
    };

    printClient();

    res.send({
        newStudent: `Agregado el estudiante ${name} con código ${code} de nivel ${level} del programa de ${program}`
    })

});