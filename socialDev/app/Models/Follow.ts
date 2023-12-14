import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Followers extends BaseModel {
  @column()
  public follower_id : number

  @column()
  public user_id : number
  
}