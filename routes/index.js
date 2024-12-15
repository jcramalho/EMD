var express = require('express');
var router = express.Router();
const EMD = require('../controllers/emd')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var jwt = require('jsonwebtoken')

function verificaToken(req, res, next){
  if(req.cookies && req.cookies.token) 
    jwt.verify(req.cookies.token, 'EMD20210125', function(e, payload){
      if(e) res.render('error', {error: e, message: 'Não tem nível de acesso suficiente.'})
      else next()
    })
  else
    res.render('error', {error: {}, message: 'Tem de fazer login para aceder a esta página.'})
}

// New home page
router.get('/main', function(req, res, next) {
  res.render('main')
})

router.get('/novoRegisto', verificaToken, function(req, res){
  res.render('form-emd')
})

// Lista os EMD
router.get('/', verificaToken, function(req, res, next) {
  console.log('Cheguei à listagem...')
  EMD.listar()
    .then(dados => {
      var mylista = dados.map(e => {
        e.dataExame = e.dataExame.replace(" ","");
        e.dataExame = e.dataExame.substring(6) + '-' + e.dataExame.substring(3,5) + '-' + e.dataExame.substring(0,2);
        return e;
      })
      mylista.sort(function(a, b) {
        if (a.dataExame < b.dataExame) {
          return 1;
        }
        else
          return -1;
      });
      res.render('index', {lista: mylista})
    })
    .catch(e => res.render('error', {error: e}))
});

router.get('/editRegisto/:id', verificaToken, function(req,res){
  EMD.consultar(req.params.id)
    .then(dados => res.render('form-edit-emd', {emd: dados}))
    .catch(e => res.render('error', {error: e}))
})

router.post('/emd', verificaToken, function(req, res){
  EMD.inserir(req.body)
    .then(dados => res.render('novoRegisto', {dados: dados}))
    .catch(e => res.render('error', {error: e}))
})

router.post('/emdAlterado', verificaToken, function(req,res){
  EMD.alterar(req.body)
    .then(dados => res.render('registoAlterado', {dados: dados}))
    .catch(e => res.render('error', {error: e}))
})

router.get('/exportCSV', verificaToken, function(req, res){
  EMD.listar()
    .then(dados => {
      var mylista = dados.map(e => {
        e.dataExame = e.dataExame.replace(" ","");
        e.dataExame = e.dataExame.substring(6) + '-' + e.dataExame.substring(3,5) + '-' + e.dataExame.substring(0,2);
        return e;
      })
      mylista.sort(function(a, b) {
        if (a.dataExame < b.dataExame) {
          return 1;
        }
        else
          return -1;
      });

      const csvWriter = createCsvWriter({
        path: 'EMD-export.csv',
        header: ['id', 'dataExame', 'nome', 'genero', 'dataNasc', 'nif', 'morada', 'federado', 'modalidade', 
                'clube', 'resultadoEMD', 'exameComplementar', 'controlo', 'pagamento', 'contacto' ]
      });

      csvWriter.writeRecords(mylista)     
        .then(() => {
          res.download( 'EMD-export.csv', 'EMD-export.csv', e => {
            if(e) console.log('Erro no download: ' + e)
          });
          console.log('Exportação realizada...');
        })
        .catch(erro => res.render('error', {error: erro}))
    })
    .catch(e => res.render('error', {error: e}))
});


module.exports = router;
