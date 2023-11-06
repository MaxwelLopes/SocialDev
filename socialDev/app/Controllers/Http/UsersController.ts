import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import User from 'App/Models/User'

//node ace make:controller User -r

export default class UsersController{

    //Get
    public async create({ view }: HttpContextContract){
        return view.render('sessions/createUser')
    }
    //Post
    public async store({ request, response, view }:HttpContextContract){

        const name = request.input('name')
        const email = request.input('email')
        const password = request.input('password')
        //const confirmpassword = request.input('confirmpassword')

        try{
            await request.validate(CreateUserValidator);
            
            await User.create({ name, email, password })

            return response.redirect().toRoute('sessions.create')
        }
        catch (error){
            const errorMessages = error.messages;
            return view.render('sessions/createUser', { errorMessages, name, email});
        }
    }

    public async destroy({ response, auth }: HttpContextContract) {
        const user = await User.findOrFail(auth.user.id)
        await user.delete()
        
        //const posts = await Post.all();
        return response.redirect().toRoute('home.index');
    }

}

