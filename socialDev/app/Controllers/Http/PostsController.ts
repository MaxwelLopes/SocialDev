import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const { DateTime } = require('luxon');

import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class PostsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth}: HttpContextContract) {

    const title = request.input('title')
    const content = request.input('content')
    const user = await auth.authenticate();
    const user_id = user.id;

    
    const post = await Post.create({
      title,
      content,
      user_id,
    })
    return response.redirect().toRoute('home.index')
  }

  public async show({ params, view }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    
    const users = await User.all();
    const user = users.find(user => user.id === post.user_id)
    post.user = user?.email;

    post.hour = DateTime.fromISO(post.createdAt).toLocaleString({ hour: '2-digit', minute: '2-digit' });   
    post.date = DateTime.fromISO(post.createdAt).toLocaleString({month: '2-digit', day: '2-digit', year: 'numeric'});

    return view.render('post', { post });
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
