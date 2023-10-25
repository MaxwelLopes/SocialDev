import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {

    public async create({ view }: HttpContextContract){
        return view.render('sessions/login')
    }

    public async store({ request, response, auth }: HttpContextContract){

        const email = request.input('email')
        const password = request.input('password')

        console.log(email)
        console.log(password)

        try{
            await auth.use('web').attempt(email, password)
            response.redirect().toRoute('/')
        }catch(err){
            console.log(err)
            response.redirect().toRoute('sessions.create')
        }
    }
    public async delete({ auth, response }: HttpContextContract){

        await auth.use('web').logout()
        return response.redirect().toRoute('/')
    }
}
