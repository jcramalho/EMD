var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

var User = require('../controllers/user')

router.get('/login', function(req, res) {
  res.render('login')
})
  

router.post('/registo', function(req, res) {
  User.inserir(req.body)
    .then(dados => res.redirect('/main'))
    .catch(erro => res.render('error', {error: erro}))
})

router.post('/login', function(req, res) {
  jwt.sign({ email: req.body.email, sub: "EMD"}, "EMD20210125", {expiresIn: "1d"}, 
    function(e, token){
      if(e) res.render('error', {error: e})
      else {
        res.cookie('token', token, {
          expires: new Date(Date.now() + '1d'),
          secure: false,
          httpOnly: true
        })
        res.redirect('/')
      }
  })
})
  
module.exports = router;
