const mongoose = require('mongoose')

var emdSchema = new mongoose.Schema({
    dataExame: String,
    nome: String,
    genero: String,
    dataNasc: String,
    nif: String,
    morada: String,
    contacto: String,
    federado: Boolean,
    modalidade: String,
    clube: String,
    resultadoEMD: String,
    exameComplementar: String,
    pagamento: String
  });

module.exports = mongoose.model('emd', emdSchema)
