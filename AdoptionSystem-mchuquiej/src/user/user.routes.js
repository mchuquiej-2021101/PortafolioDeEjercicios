'use strict'
//Rutas del usuario

import express from 'express'
import { 
    validateJwt,
    isAdmin
} from '../middlewares/validate-jwt.js'
import {
    test,
    register, 
    login, 
    update, 
    deleteU
} from './user.controller.js'

const api = express.Router()

//Middleware
//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test) //<- Solo si está logeado

//ROLE CLIENT/ADMIN
api.put('/update/:id', [validateJwt], update)
api.delete('/delete/:id', [validateJwt], deleteU)

//PUBLIC
api.post('/register', register)
api.post('/login', login) //JWT

export default api

//export const api <- tengo si o si el nombre que está en este archivo Ej: api
//export default api <- importar con otro nombre Ej: userRoutes