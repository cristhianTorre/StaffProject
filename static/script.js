import {getProyectos} from './appl.js';

//Mostrar informacion del proyecto 
function pintarProyecto(){
    console.log('Funciona');
    var texthtml = '<div class="containerProject row">';               
    const valores = getProyectos('CORE','Cross/Gestor documental y SSDD');
    for(var i=0; i<valores.length; i++){
        var proyecto = valores[i][1];
        var empleados = valores[i][0];
        texthtml += '<div class="cardProyecto col-sm-4"><h2 id="titleProject" class="titles">Proyecto: '+valores[i][1][0]+'</h2><ol id="listProject" class="list"><li>Descripción: '+valores[i][1][1]+'</li><li>Tipo: '+valores[i][1][2]+'</li><li>Scrum: '+valores[i][1][3]+'</li><li>Product Owner: '+valores[i][1][4]+'</li><li>Estado: '+valores[i][1][5]+'</li></ol></div><div class="othersProyecto col-sm-8">';
        for(var j=0; j<empleados.length; j++){
            var empleado = valores[i][0][j];
            texthtml += '<div class="persons row"><h2 class="titles">Personas: </h2><ol class="listPerson"><li class="itemListPerson"><div class="person"><h5  class="person personCode">'+valores[i][0][j][0]+'</h5><h6  class="person">'+valores[i][0][j][1]+'</h6><img class="imagePerson" src="https://img.freepik.com/vector-premium/icono-usuario-hombre-traje-negocios_454641-453.jpg?w=740" class="img-fluid rounded-start" alt="..."><p class=""><small class="text-muted">'+valores[i][0][j][2]+' / '+valores[i][0][j][3]+' / '+valores[i][0][j][4]+'</small></p></div></li></ol></div>';
        }
        texthtml += '<div class="containerSchedule row"><h2 class="titles">cronograma: </h2><ol class="listTrimestre"><li class="itemListTrimestre"><div class="person"><h5  class="person personCode">Primer Trimestre</h5><ol><li>'+valores[i][1][6]+'</li><li>'+valores[i][1][7]+'</li></ol></div></li></ol></div></div>';
    }
    texthtml += '</div>';
    console.log('Funciona2');
    document.getElementById('contenedorValores').innerHTML = texthtml;
}