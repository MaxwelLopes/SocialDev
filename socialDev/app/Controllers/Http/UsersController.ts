import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator';

import Post from 'App/Models/Post'
import User from 'App/Models/User'

const { DateTime } = require('luxon');

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

    public async update({ auth, request, response }: HttpContextContract){

        const user = await auth.authenticate()

        const name = request.input('name')
        const email = request.input('email')
        const password = request.input('password')
        const confirmpassword = request.input('confirmpassword') 

        if(email!=null){
            user.email = email
        }

        if(name!=null){
            user.name = name
        }

        if(password != confirmpassword){
            return response.redirect().toRoute('sessions.update')
        }else{
            if(password!= null){
                user.password = password
            }
        }
        console.log(user.password)
        await user.save()

        return response.redirect().toRoute('home.index')
    }

    public async show({ params, view, auth }: HttpContextContract) {

        const id = params.id;
        const user = await User.findByOrFail('id', id);
        
        let edit = false;
        if (id == auth.user.id) {
            edit = true;
        }
        console.log(user);
        const posts = await Post.query().where('user_id', id).orderBy('createdAt', 'desc') 
        
        posts.forEach((post) => {    
            post.hour = DateTime.fromISO(post.createdAt).toLocaleString({ hour: '2-digit', minute: '2-digit' });   
            post.date = DateTime.fromISO(post.createdAt).toLocaleString({month: '2-digit', day: '2-digit', year: 'numeric'});
            post.user = user.name;
        });

        return view.render('profile', {posts, user, edit});

        
      }

}

