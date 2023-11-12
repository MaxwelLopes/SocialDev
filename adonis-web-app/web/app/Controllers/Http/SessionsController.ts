import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
    public async index({ view }: HttpContextContract) {
        return view.render('sessions/index') 
    }
    
    public async create({view}: HttpContextContract){
       return view.render('sessions/create')
    }

    public async store({auth, request, response}: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        
        console.log(email)
        console.log(password)

        try{
            await auth.use('web').attempt(email, password)
            response.redirect().toRoute('welcome')
        } catch{
            response.redirect().toRoute('sessions.createInvalid')
        }
    }

    public async createInvalid({ view }: HttpContextContract) {
        return view.render('sessions/createInvalid') 
    }

    public async delete({auth, response}: HttpContextContract){
        await auth.use('web').logout()
        return response.redirect().toRoute('index')
    }
}
