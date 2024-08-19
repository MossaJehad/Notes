exports.dashboard = async (req, res) => {
    const locals = {
        title: 'Dashboard',
        description: 'Simple Notes App created with NodeJS, Express and MongoDB.'
    }
    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    })
}