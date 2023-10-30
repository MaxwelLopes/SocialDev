import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({view}: HttpContextContract) {
      const posts = await Post.all();
      return view.render('home', { posts })
  }


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

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
