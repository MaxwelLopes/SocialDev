import { DateTime } from 'luxon';
import User from 'App/Models/User'
import UserLikePost from 'App/Models/UserLikePost'

export default class PostController {

  public async formatPosts(posts: any[], users: any[], user: User) { 
    let postsLike = await user
        .related('likedPosts')
        .query();

    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]; 
      post.hour = DateTime.fromISO(post.createdAt).toLocaleString({ hour: '2-digit', minute: '2-digit' });   
      post.date = DateTime.fromISO(post.createdAt).toLocaleString({month: '2-digit', day: '2-digit', year: 'numeric'});
      if(post.content.length > 400){
        post.content = post.content.slice(0, 401) + '...';
        post.content.length
      }
      const user = users.find(user => user.id === post.user_id)
      post.user = user?.name;

      // Adicione a propriedade 'photo' ao post
      const postUser = users.find((user) => user.id === post.user_id);
      post.userPhoto = postUser?.photo;

      let countLike =  await UserLikePost.query().where('post_id', post.id);
      post.countLike = countLike.length;
      post.liked = postsLike.some(likedPost => likedPost.id === post.id);

      const userIdsLiked = countLike.map(like => like.$attributes.user_id);
      post.listUserLiked = await User.query().whereIn('id', userIdsLiked)       
  }
    return posts;
  }
}