import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_like_posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').notNullable().references('id').inTable('users')
      table.integer('post_id').notNullable().references('id').inTable('posts')
      table.unique(['user_id', 'post_id'])
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
