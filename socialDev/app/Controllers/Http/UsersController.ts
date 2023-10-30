import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

//node ace make:controller User -r

export default class UsersController{

    //Get
    public async create({ view }: HttpContextContract){
        return view.render('sessions/createUser')
    }
    //Post
    public async store({ request, response }:HttpContextContract){

        const email = request.input('email')
        const password = request.input('password')
        const confirmpassword = request.input('confirmpassword')

        console.log(email)
        console.log(password)
        console.log(confirmpassword) 

        if(password != confirmpassword){
            return response.redirect().toRoute('users.create')
        }

        const user = await User.create({ email, password })

        //...Validar se usuario ja existe...

        return response.redirect().toRoute('sessions.create')
    }

}
