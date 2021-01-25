var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var User = require('../controllers/user')

router.get('/login', function(req, res) {
  console.log('Na cb do GET login...')
  console.log(req.sessionID)
  res.render('login')
})
  

router.post('/registo', function(req, res) {
  console.log('Na cb do POST registo...')
  User.inserir(req.body)
    .then(dados => res.redirect('/'))
    .catch(erro => res.render('error', {error: erro}))
})

router.post('/login', function(req, res) {
  console.log('Na cb do POST login...')
  console.log(JSON.stringify(req.body))
  res.send('Login recebido e tratado...')
})
  

module.exports = router;
