import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class HomeController {
    public async index({ view }: HttpContextContract){
        const posts = await Post.all()
        const users = await User.all()
        return view.render('home', { posts, users })
    }
}
