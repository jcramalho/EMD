var express = require('express');
var router = express.Router();
const EMD = require('../controllers/emd')

/* GET home page. */
router.get('/', function(req, res, next) {
  EMD.listar()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.post('/emd', function(req, res){
  EMD.inserir(req.body)
    .then(dados => res.jsonp(dados))
    .catch(e => res.jsonp(e))
})

module.exports = router;
