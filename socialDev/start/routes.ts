import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


Route.resource('users', 'UsersController')

Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.delete').as('sessions.delete')

Route.get('createUser', 'UsersController.create').as('createUser.create')
Route.post('updateUser', 'UsersController.update').as('updateUser.update')
Route.get('deleteUser', 'UsersController.destroy').as('createUser.destroy')
Route.post('createUser', 'UsersController.store').as('createUser.store')
Route.get('profileUser/:id', 'UsersController.show').as('profileUser.show').middleware('auth')
Route.get('/follow/:id', 'UsersController.follow').as('user.follow').middleware('auth')

// Pagina Home com Middleware de autenticação
Route.get('/', 'HomeController.index').as('home.index').middleware('auth')  

Route.post('/', 'PostsController.store').as('posts.store').middleware('auth')
Route.get('/post/:id', 'PostsController.show').as('posts.show').middleware('auth')
Route.get('/deletePost/:id', 'PostsController.destroy').as('posts.destroy').middleware('auth')
Route.get('/like/:id', 'PostsController.like').as('posts.like').middleware('auth')
Route.get('/liked/:id', 'PostsController.listUserLiked').as('posts.listUserLiked').middleware('auth')

Route.get('/settings', async ({ view }: HttpContextContract) => {
    return view.render('settings')
  }).as('settings').middleware('auth')

Route.get('/editProfile', async ({ view }: HttpContextContract) => {
return view.render('editProfile')
}).as('editProfile').middleware('auth')

Route.any('*', async ({ view }) => {
  return view.render('errors/not-found');
}).as('not-found')


// Route.get('/profile', async ({ view }: HttpContextContract) => {
// return view.render('profile')
// }).as('profile')