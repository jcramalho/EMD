$(()=>{

})

function showEMD(e){
    var dataExame = $('<div><label>Data do exame:</label><input type="text" value="' + e.dataExame + '"/></div>')
    var nome = $('<div><label>Nome:</label><input type="text" value="' + e.nome + '"/></div>')
    var genero = $('<div><label>Género:</label><input type="text" value="' + e.genero + '"/></div>')
    var dataNasc = $('<div><label>Data de nascimento:</label><input type="text" value="' + e.dataNasc + '"/></div>')
    var localidade = $('<div><label>Localidade:</label><input type="text" value="' + e.localidade + '"/></div>')
    var federado = $('<div><label>Federado:</label><input type="text" value="' + e.federado + '"/></div>')
    var modalidade = $('<div><label>Modalidade:</label><input type="text" value="' + e.modalidade + '"/></div>')
    var clube = $('<div><label>clube:</label><input type="text" value="' + e.clube + '"/>')
    var resultadoEMD = $('<div><label>Resultado:</label><input type="text" value="' + e.resultadoEMD + '"/></div>')
    var exameComplementar = $('<div><label>Exame complementar:</label><input type="text" value="' + e.exameComplementar + '"/></div>')

    $("#displayEMD").empty()
    $("#displayEMD").append(dataExame, nome, genero, dataNasc, localidade, federado, modalidade, clube, resultadoEMD, exameComplementar)
    $("#displayEMD").modal()
}