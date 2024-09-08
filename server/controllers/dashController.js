const Note = require('../models/Notes')
const mongoose = require('mongoose')

exports.dashboard = async (req, res) => {

    let perPage = 12
    let page = req.query.page || 1
    
    const locals = {
        title: 'Dashboard',
        description: 'Simple Notes App created with NodeJS, Express and MongoDB.'
    }

    try {
    
        const notes = await Note.aggregate([
            {
                $sort: {
                    createdAt: -1,
                }
            },
            {
                $match: {
                    user: mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                $project: {
                    title: {
                        $substr: ['$title', 0, 30]
                    },
                    body: {
                        $substr: ['$body', 0, 100]
                    }
                }
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(function (err, notes) {
            Note.count().exec(function (err, count) {
                if(err) return next(err)

                res.render('dashboard/index', {
                    userName: req.user.firstName,
                    locals,
                    notes,
                    layout: '../views/layouts/dashboard',
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })

    } catch (err) {
        console.log(err)
    }

}

exports.dashboardViewNote = async(req, res) => {
    const note = await Note.findById({ _id: req.params.id }).where({user: req.user.id}).lean()
    if(note){
        res.render('dashboard/view-note', {
            noteID: req.params.id,
            note,
            layout: '../views/layouts/dashboard',
        })
    } else {
        res.send("Opps >")
    }
}

exports.dashboardUpdateNote = async(req, res) => {
    try {
        await Note.findOneAndUpdate(
            { _id: req.params.id },
            { title: req.body.title,  body: req.body.body}
    ).where({user: req.user.id})
    res.redirect('/dasboard')
    } catch(err) {
        console.log(err)
    }
}