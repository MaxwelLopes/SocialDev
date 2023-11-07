import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


Route.resource('users', 'UsersController')

Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.delete').as('sessions.delete')

Route.get('createUser', 'usersController.create').as('createUser.create')
Route.post('updateUser', 'usersController.update').as('updateUser.update')
Route.get('deleteUser', 'usersController.destroy').as('createUser.destroy')
Route.post('createUser', 'usersController.store').as('createUser.store')
Route.get('profileUser', 'usersController.show').as('profileUser.show').middleware('auth')

// Pagina Home com Middleware de autenticação
Route.get('/', 'HomeController.index').as('home.index').middleware('auth')  

Route.post('/', 'PostsController.store').as('posts.store')

Route.get('/post/:id', 'PostsController.show').as('posts.show')

Route.get('/settings', async ({ view }: HttpContextContract) => {
    return view.render('settings')
  }).as('settings')

Route.get('/editProfile', async ({ view }: HttpContextContract) => {
return view.render('editProfile')
}).as('editProfile')

// Route.get('/profile', async ({ view }: HttpContextContract) => {
// return view.render('profile')
// }).as('profile')