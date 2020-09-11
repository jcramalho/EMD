var EMD = require('../models/emd')

// Devolve a lista de EMDs
module.exports.listar = () => {
    return EMD
        .find()
        .sort('-dataExame')
        .exec()
}

module.exports.consultar = id => {
    return EMD
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = emd => {
    var novo = new EMD(emd)
    return novo.save()
}

module.exports.remover = function(id){
    return EMD.deleteOne({_id: id})
}

module.exports.alterar = function(emd){
    return EMD.findByIdAndUpdate({_id: emd._id}, emd, {new: true})
}
