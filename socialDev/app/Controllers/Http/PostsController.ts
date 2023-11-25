import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreatePostValidator from 'App/Validators/CreatePostValidator';
import { Post } from 'App/Models/Post'
import User from 'App/Models/User'

import { DateTime } from 'luxon';
import PostService from 'App/service/PostService'



export default class PostsController {
  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({request, response, auth, view}: HttpContextContract) {
    try {

      await request.validate(CreatePostValidator);

      const title = request.input('title')
      const content = request.input('content')
      const user = await auth.authenticate();
      const user_id = user.id;
      
      await Post.create({
        title,
        content, 
        user_id,
      })
      return response.redirect().toRoute('home.index')
    }
    catch (error){
      const post = await Post.all();
      const user = await User.all();
    
      const postService = new PostService();
      const posts = postService.formatPosts(post, user);

      const value = {}
      value.title =  request.input('title')
      value.content = request.input('content')

      const errorMessages = error.messages;
      return view.render('home', { posts, value, errorMessages });
    }
  }

  public async show({ params, view, auth }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    let del = false;
    if(post.user_id == auth.user.id){
      del = true;
    }
    
    const users = await User.all();
    const user = users.find(user => user.id === post.user_id)
    post.user = user?.name;

    post.hour = DateTime.fromISO(post.createdAt).toLocaleString({ hour: '2-digit', minute: '2-digit' });   
    post.date = DateTime.fromISO(post.createdAt).toLocaleString({month: '2-digit', day: '2-digit', year: 'numeric'});

    return view.render('post', { post, del});
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({response, auth, params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    
    if(post.user_id == auth.user.id){
      await post.delete()
    }
    
    return response.redirect().toRoute('home.index');

  }

  public async like({ params, auth }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const user = await User.findOrFail(auth.user.id)
    
    //const service = new PostService()
    //const liked = service.like(user, post)
    
    const liked = await post.liked(user)
    
    if (liked) {
      await user.related('likedPosts').detach([post.id])
      console.log("deslike")
    } else {
      await user.related('likedPosts').attach([post.id])
      console.log("like")
    }
    
    return { id: post.id, liked: liked }
  }
}
