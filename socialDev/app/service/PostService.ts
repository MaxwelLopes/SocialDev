import { DateTime } from 'luxon';

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
}