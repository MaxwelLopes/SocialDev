import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View'
import Document from 'App/Models/Document'
import { reporters } from 'tests/bootstrap'

export default class DocumentsController {
    public async welcome({view, auth}: HttpContextContract){
        await auth.use('web').authenticate()

        console.log(auth.user!)

        const documents = await Document.all()
        return view.render('documents/welcome', {documents: documents})
    }

    public async show({view, params}: HttpContextContract){
        const document = await Document.find(params.id)
        return view.render('documents/show', {document})
    }

    public store({request, response}: HttpContextContract){
        const text = request.input('text')
        const document = Document.create({ text })
        return response.json(document)
    }
}
