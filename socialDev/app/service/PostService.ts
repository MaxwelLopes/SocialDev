import { DateTime } from 'luxon';
import User from 'app/Models/User'

export default class PostController {

  public async formatPosts(posts: any[], users: any[], user: User) {
    let postsLike = await user
        .related('likedPosts')
        .query();
    
    posts.forEach((post) => {    
        post.hour = DateTime.fromISO(post.createdAt).toLocaleString({ hour: '2-digit', minute: '2-digit' });   
        post.date = DateTime.fromISO(post.createdAt).toLocaleString({month: '2-digit', day: '2-digit', year: 'numeric'});
        if(post.content.length > 400){
          post.content = post.content.slice(0, 401) + '...';
          post.content.length
        }
        const user = users.find(user => user.id === post.user_id)
        post.user = user?.name;
        post.liked = postsLike.some(likedPost => likedPost.id === post.id);
        console.log(post.liked)
    });
    return posts;
  }
}