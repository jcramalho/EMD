var express = require('express');
var router = express.Router();
const EMD = require('../controllers/emd')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.get('/exportCSV', function(req, res){
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
          res.download('EMD-export.csv', 'EMD-export.csv');
          console.log('Exportação realizada...');
        })
        .catch(erro => res.render('error', {error: erro}))
    })
    .catch(e => res.render('error', {error: e}))
});

module.exports = router;
