import { DateTime } from 'luxon';
import User from 'App/Models/User'
import { Post } from 'App/Models/Post'

export default class PostController {
  constructor() {}

  public formatPosts(posts: any[], users: any[]) {
    
    posts.forEach((post) => {    
        post.hour = DateTime.fromISO(post.createdAt).toLocaleString({ hour: '2-digit', minute: '2-digit' });   
        post.date = DateTime.fromISO(post.createdAt).toLocaleString({month: '2-digit', day: '2-digit', year: 'numeric'});
        if(post.content.length > 400){
          post.content = post.content.slice(0, 401) + '...';
          post.content.length
          
        }
        const user = users.find(user => user.id === post.user_id)
        post.user = user?.name;
    });
    return posts;
  }

  public async like(user: User, post: Post) {
    const liked = await post.liked(user)
    

    if (liked) {
      await user.related('likedPosts').detach([post.id])

      return false
    } else {
      await user.related('likedPosts').attach([post.id])

      return true
    }
  }
}