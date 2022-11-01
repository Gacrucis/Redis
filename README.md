# Redis Nov1

By: Edward Parada & Gianfranco Estevez

## How to run
node .

## Endpoints

### POST http://localhost:8080/addstudent

JSON Body example

```
{
    "code" : 1,
    "name" : "ed",
    "program" : "sis",
    "email" : "ed@ed.ed",
    "level" : 4
}
```

### GET http://localhost:8080/students/:code