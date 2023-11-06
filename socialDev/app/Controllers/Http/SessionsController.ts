import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePostValidator from 'App/Validators/LoginValidator';

export default class SessionsController {

    public async create({ view }: HttpContextContract){
        return view.render('sessions/login')
    }

    public async store({ request, response, auth, view }: HttpContextContract){

        const email = request.input('email')
        const password = request.input('password')

        // console.log(email)
        // console.log(password)

        try{

            await request.validate(CreatePostValidator);

            await auth.use('web').attempt(email, password)
            return response.redirect().toRoute('home.index');
        }
        catch(error){
            const errorMessages = error.messages;
            return view.render('sessions/login', { errorMessages, email});
        }
    }
    public async delete({ auth, response }: HttpContextContract){

        await auth.use('web').logout()
        return response.redirect().toRoute('/')
    }
}
