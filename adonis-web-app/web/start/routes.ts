/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import DocumentsController from 'App/Controllers/Http/DocumentsController'

// Route.get('/documents', 'DocumentsController.index')
// Route.get('/documents/:id', 'DocumentsController.show')

Route.get('/', 'SessionsController.index').as('sessions.index')

Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/login/invalid', 'SessionsController.createInvalid').as('sessions.createInvalid');
Route.get('/logout', 'SessionsController.delete').as('sessions.delete')

Route.get('welcome', 'DocumentsController.welcome').as('welcome')

Route.group(() =>{
  Route.get('/:id', 'DocumentsController.show').as('show')
  Route.post('/', 'DocumentsController.store').as('store')
})
.prefix('/documents')
.middleware('auth')
.as('documents')

