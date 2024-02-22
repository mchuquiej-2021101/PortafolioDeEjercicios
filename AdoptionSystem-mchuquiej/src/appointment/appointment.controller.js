'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'

export const save = async (req, res) => {

    try {
        //Capturar la data
        let data = req.body 
        data.user = req.user._id
        //Verificar que exista el animal 
        let animal = await Animal.findONe({_id: data.animal})
        if(!animal) return res.status(404).send({message: 'Animal no encontrado'})
        //Validadar que la moscota no tenga cita activa con la persona.
        //VAlidar si una aminal tiene cita o un user tiene cita
        
        //Ejercicio: El usuario solo puede tener una cita por dia
        let appointmentExist = await Appointment.findOne({
            $or: [
                {
                    animal: data.animal,
                    user: data.user
                },
                {
                    user: data.user
                },
                {
                    date: data.date,
                    user: data.user
                }
            ]
        })
        if(appointmentExist) return res.send({message: 'Appointment ya existe'})
        //Guardar 
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({message: `Appointment guardada con exito, formule la fecha ${appointment.data}`})
    
    } catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error al guardar appointment', err})
    }
}