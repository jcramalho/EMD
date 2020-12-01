$(()=>{
    var myTable = $('#listaEMD').DataTable(
        {
            "language": {
                "emptyTable": "Sem registos para apresentar...",
                "info": "Mostrando a página _PAGE_ de _PAGES_ páginas",
                "infoEmpty": "Não há registos para mostrar",
                "infoFiltered": "(filtrados dum total de _MAX_ registos)",
                "thousands": ".",
                "lengthMenu": "Mostrando _MENU_ registos por página",
                "search": "Procurar:",
                "zeroRecords": "Não foram encontrados registos",
                "paginate": {
                    "first":      "Primeira",
                    "last":       "Última",
                    "next":       "Próxima",
                    "previous":   "Anterior"
                },
                "aria": {
                    "sortAscending":  ": ordenar ascendentemente",
                    "sortDescending": ": ordenar descendentemente"
                }
            }
        }
    );
    myTable.column( '0:visible' ).order( 'desc' ).draw();
})

function showEMD(e){
    var dataExame = $('<div><label>Data do exame:</label><input type="text" value="' + e.dataExame + '"/></div>')
    var nome = $('<div><label>Nome:</label><input type="text" value="' + e.nome + '"/></div>')
    var genero = $('<div><label>Género:</label><input type="text" value="' + e.genero + '"/></div>')
    var dataNasc = $('<div><label>Data de nascimento:</label><input type="text" value="' + e.dataNasc + '"/></div>')
    var nif = $('<div><label>NIF:</label><input type="text" value="' + e.nif + '"/></div>')
    var morada = $('<div><label>Morada:</label><input type="text" value="' + e.morada + '"/></div>')
    var contacto = $('<div><label>Contacto:</label><input type="text" value="' + e.contacto + '"/></div>')
    var federado = $('<div><label>Federado:</label><input type="text" value="' + e.federado + '"/></div>')
    var modalidade = $('<div><label>Modalidade:</label><input type="text" value="' + e.modalidade + '"/></div>')
    var clube = $('<div><label>clube:</label><input type="text" value="' + e.clube + '"/>')
    var resultadoEMD = $('<div><label>Resultado:</label><input type="text" value="' + e.resultadoEMD + '"/></div>')
    var exameComplementar = $('<div><label>Exame complementar:</label><input type="text" value="' + e.exameComplementar + '"/></div>')
    var pagamento = $('<div><label>Pago:</label><input type="text" value="' + e.pagamento + '"/></div>')

    $("#displayEMD").empty()
    $("#displayEMD").append(dataExame, nome, genero, dataNasc, nif, morada, contacto, federado, modalidade, clube, resultadoEMD, exameComplementar, pagamento)
    $("#displayEMD").modal()
}