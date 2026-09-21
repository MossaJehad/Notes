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
        title: 'About - NodeJS Notes',
        description: 'Learn more about the Notes application.'
    }
    res.render('about', { locals })
}

exports.features = async (req, res) => {
    const locals = {
        title: 'Features - NodeJS Notes',
        description: 'Explore key features of Notes app.'
    }
    res.render('features', { locals })
}

exports.faq = async (req, res) => {
    const locals = {
        title: 'FAQs - NodeJS Notes',
        description: 'Frequently Asked Questions about Notes app.'
    }
    res.render('faq', { locals })
}