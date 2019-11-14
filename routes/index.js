var express = require('express');
var router = express.Router();
const EMD = require('../controllers/emd')

/* GET home page. */
router.get('/', function(req, res, next) {
  EMD.listar()
    .then(dados => res.render('index', {lista: dados}))
    .catch(e => res.render('error', {error: e}))
});

router.get('/novoRegisto', function(req, res){
  res.render('form-emd')
})

router.post('/emd', function(req, res){
  EMD.inserir(req.body)
    .then(dados => res.render('novoRegisto', {dados: JSON.stringify(dados)}))
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;
