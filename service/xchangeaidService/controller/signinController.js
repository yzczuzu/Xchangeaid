const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/Register', (req, res) => {
  
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        birthday: req.body.birthday
    }

    User.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash
                User.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registered'})
                })
                .catch(err => {
                    res.send('error: ' + err)
                })
            })
        }else{
            res.json({error: "User already exists"});
        }
    })
    .catch(err => {
        res.send('error: ' + err)
    })
})

users.post('/Login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })

                res.send(token)
                console.log(token);
            }
        }else{
            res.status(400).json({error: 'User does not exist'})
        }
    })
    .catch(err => {
        res.status(400).json({ error: err })
    })
})

users.get('/getOneUser/:userId', (req, res) => {
    User.findAll({
        where: {
            userId: req.params.userId
        }
    }).then(function (list) {
        res.status(200).json(list);
    })
})
module.exports = users