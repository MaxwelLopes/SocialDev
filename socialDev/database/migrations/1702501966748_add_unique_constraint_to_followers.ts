import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddUniqueConstraintToFollowers extends BaseSchema {
  protected tableName = 'followers'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['user_id', 'follower_id'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['user_id', 'follower_id'])
    })
  }
}
