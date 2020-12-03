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

function showEMD2(e){
    var pagModal = $(`<div class="w3-card-4">
        <header class="w3-container w3-teal">
            <h3>Registo de: ${e.nome}</h3>
        </header>
        <form class="w3-container w3-margin">
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Data de realização do EMD</label>
                </div>
                <div class="w3-col s9 w3-border">
                    <input class="w3-input" type="text" value="${e.dataExame}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Nome</label>
                </div>
                <div class="w3-col s9 w3-border">
                    <input class="w3-input" type="text" value="${e.nome}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Género</label>
                </div>
                <div class="w3-col s9">
                    <input class="w3-input" type="text" value="${e.genero}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Data de nascimento</label>
                </div>
                <div class="w3-col s9 w3-border">
                    <input class="w3-input" type="text" value="${e.dataNasc}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">    
                    <label class="w3-text-teal">NIF</label>
                </div>
                <div class="w3-col s9 w3-border">
                    <input class="w3-input" type="text" value="${e.nif}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">    
                    <label class="w3-text-teal">Morada</label>
                </div>
                <div class="w3-col s9 w3-border">
                    <input class="w3-input" type="text" value="${e.localidade ? e.localidade : ''}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">     
                    <label class="w3-text-teal">Contacto/email</label>
                </div>
                <div class="w3-col s9 w3-border">
                    <input class="w3-input" type="text" value="${e.contacto}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3"> 
                    <label class="w3-text-teal">Federado</label>
                </div>
                <div class="w3-col s9"> 
                    <input class="w3-input" type="text" value="${e.federado}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Modalidade</label>
                </div>
                <div class="w3-col s9 w3-border"> 
                    <input class="w3-input" type="text" value="${e.modalidade}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Clube</label>
                </div>
                <div class="w3-col s9 w3-border"> 
                    <input class="w3-input" type="text" value="${e.clube}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Resultado do EMD</label>
                </div>
                <div class="w3-col s9 w3-border">
                    <input class="w3-input" type="text" value="${e.resultadoEMD}" readonly>
                </div>
            </div>
            
            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Exame complementar</label>
                </div>
                <div class="w3-col s9 w3-border">
                    <input class="w3-input" type="text" name="exameComplementar" value="${e.exameComplementar}" readonly>
                </div>
            </div>

            <div class="w3-row w3-margin-bottom">
                <div class="w3-col s3">
                    <label class="w3-text-teal">Pagamento</label>
                </div><div class="w3-col s9">
                    <input class="w3-input" type="text" value="${e.pagamento}" readonly>
                </div>
            </div>
            
        </form>
        
        <footer class="w3-container w3-teal">
            <address>Gerado por EMD :: 2020-Dezembro, jcr</address>
        </footer>
    </div>`)

    $("#displayEMD").empty()
    $("#displayEMD").append( pagModal )
    $("#displayEMD").modal()
}