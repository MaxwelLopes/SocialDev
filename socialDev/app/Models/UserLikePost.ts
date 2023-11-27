import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserLikePost extends BaseModel {
  @column()
  public user_id : number

  @column()
  public post_id : number
  
}
