const mongoose = require('mongoose')

var emdSchema = new mongoose.Schema({
    dataExame: String,
    nome: String,
    genero: String,
    dataNasc: String,
    localidade: String,
    federado: Boolean,
    modalidade: String,
    clube: String,
    resultadoEMD: String,
    exameComplementar: String
  });

module.exports = mongoose.model('emd', emdSchema)
