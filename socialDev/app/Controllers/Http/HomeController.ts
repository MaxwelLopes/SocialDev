import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Post } from 'App/Models/Post'
import User from 'App/Models/User'
import PostService from 'App/service/PostService'

export default class HomeController {
    public async index({ view, auth }: HttpContextContract) {
        let post = await Post.all();
        let user = await User.all();
        
        const postService = new PostService();
        const posts = await postService.formatPosts(post, user, auth.user);
        
        return view.render('home', {posts});
    }
}
