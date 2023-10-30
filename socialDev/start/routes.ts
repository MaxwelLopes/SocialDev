import Route from '@ioc:Adonis/Core/Route'


Route.resource('users', 'UsersController')

Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.delete').as('sessions.delete')

Route.get('createUser', 'usersController.create').as('createUser.create')
Route.post('createUser', 'usersController.store').as('createUser.store')

// Pagina Home com Middleware de autenticação
Route.get('/', 'HomeController.index').as('home.index').middleware('auth')  

Route.post('/', 'PostsController.store').as('posts.store')