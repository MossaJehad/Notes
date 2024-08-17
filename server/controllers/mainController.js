exports.homepage = async (req, res) => {
    const locals = {
        title: 'NodeJS Notes',
        description: 'Simple Notes App created with NodeJS, Express and MongoDB.'
    }
    res.render('index', {
        locals,
        layout: '../views/layouts/front-page'
    })
}

exports.about = async (req, res) => {
    const locals = {
        title: 'About NodeJS Notes',
        description: 'Simple Notes App created with NodeJS, Express and MongoDB.'
    }
    res.render('about', locals)
}