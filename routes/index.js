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

router.get('/editRegisto/:id', function(req,res){
  EMD.consultar(req.params.id)
    .then(dados => res.render('form-edit-emd', {emd: dados}))
    .catch(e => res.render('error', {error: e}))
})

router.post('/emd', function(req, res){
  EMD.inserir(req.body)
    .then(dados => res.render('novoRegisto', {dados: dados}))
    .catch(e => res.render('error', {error: e}))
})

router.post('/emdAlterado', function(req,res){
  EMD.alterar(req.body)
    .then(dados => res.render('registoAlterado', {dados: dados}))
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;
