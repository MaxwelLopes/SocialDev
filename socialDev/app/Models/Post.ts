import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany, BelongsTo, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User' 


export class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string 

  @column()
  public content: string 

  @column()
  public user_id: number 

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'user_like_posts',
  })
  public likedUsers: ManyToMany<typeof User>

  public async liked(user: User) {
    const post: Post = this
    await post.load('likedUsers')

    for await (const likedUser of post.likedUsers) {
      if (user.id === likedUser.id) {
        return true
      }
    }
    return false
  }
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}