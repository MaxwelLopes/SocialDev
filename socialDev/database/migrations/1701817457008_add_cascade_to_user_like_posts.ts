import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddCascadeToUserLikePosts extends BaseSchema {
  protected tableName = 'user_like_posts'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign(['user_id'])
      table.dropForeign(['post_id'])

      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('post_id').references('id').inTable('posts').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.dropForeign(['user_id'])
      table.dropForeign(['post_id'])

      table.foreign('user_id').references('id').inTable('users')
      table.foreign('post_id').references('id').inTable('posts')
    })
  }
}
