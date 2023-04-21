var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8080;

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/*app.get('/', function(req, res){
	res.status(200).send({
		message: 'GET Home route working fine!'
	});
});
*/
app.get("/", inicio);
function inicio (req, resp){
    resp.sendFile(__dirname + "/index.html");
}

/*
const XLSX = require('xlsx');
const libro = XLSX.readFile('staffingSystems.xlsx');
const libro_Sheets = libro.SheetNames;
const staffing = libro_Sheets[3];
const leerStaffing = XLSX.utils.sheet_to_json(libro.Sheets[staffing]);
const staff = libro_Sheets[2];
const leerStaff = XLSX.utils.sheet_to_json(libro.Sheets[staff]);
const proyectos = libro_Sheets[1];
const leerProyectos = XLSX.utils.sheet_to_json(libro.Sheets[proyectos]);
const parametros = libro_Sheets[0];
const leerParametros = XLSX.utils.sheet_to_json(libro.Sheets[parametros]);
//getInformacion('O003991');
//asignarPersona('C805187', 'SDATOOL-39246 $ Nuevo tipo de identificación para extranjeros', 0.5, 'Desarrollador', 'Distribuido','');
//consultaEmpleados('C341738');
//modifyDedicacion('C808683', 'SDATOOL-36358 $ Pagos por Terceros (Mandato y/o Administración) - Información exógena DIAN - Resolución 0098 DIAN', 0.5);

//Muestra todos los empleados de un proyecto
function consultaEmpleados(codigo){
    let informacion = [];
    for(const itemFila of leerStaff){
        if(itemFila['Código'] == codigo){
            informacion.push(itemFila['Código']);
            informacion.push(itemFila['Nombre']);
            informacion.push(itemFila['ROL']);
            informacion.push(itemFila['Empresa']);
            informacion.push(itemFila['Ubicación']);
            informacion.push(Math.round(itemFila['ASO']));
            informacion.push(Math.round(itemFila['APX']));
            informacion.push(Math.round(itemFila['CELLS']));
            informacion.push(Math.round(itemFila['HOST']));
            informacion.push(Math.round(itemFila['BLUESPRING']));
            informacion.push(Math.round(itemFila['PYTHON']));
            informacion.push(Math.round(itemFila['SCALA']));
            console.log(itemFila['Nombre']);
        }
    }

    informacion.push(consultaProyectos(informacion[0]));
    console.log(informacion);
    return informacion;
}

function getLength(documento){
    var i = 0;
    for(const item of documento){
        if(item['Nombre'] !== undefined){
            i += 1;
        }
    }
    console.log(i);
    return i;
}

function getProyectos(direccion, servicio){
    let proyectos = [];
    let informacion = [];
    for(const itemFila of leerStaffing){
        if(itemFila['Servicio'] == servicio && itemFila['Dirección'] == direccion && !(itemFila['Proyecto'] in proyectos)){
            informacion.push([getEmpleados(itemFila['Proyecto']), consultaInformacionProyecto(itemFila['Proyecto'])]);
            proyectos.push(itemFila['Proyecto']);
        }
    }
    console.log(informacion);
    return informacion;
}

function getEmpleados(proyecto){
    let empleados = [];
    for(const itemFila of leerStaffing){
        if(itemFila['Proyecto'] == proyecto){
            empleados.push([itemFila['Código'], itemFila['Nombre'], itemFila['Dedicación'], itemFila['TECNOLOGÌA'], itemFila['ROL']]);
        }
    }
    return empleados;
}

function consultaInformacionProyecto(proyecto){
    let informacion = [];
    for(const itemFila of leerProyectos){
        if(itemFila['Project ID $ Name'] == proyecto){
            informacion.push(itemFila['Project ID $ Name']);
            informacion.push(itemFila['Description (What & Where)']);
            informacion.push(itemFila['NORMATIVO']);
            informacion.push(itemFila['scrum']);
            informacion.push(itemFila['Project / Product Owner']);
            informacion.push(itemFila['Status']);
            informacion.push(itemFila['Start Date']);
            informacion.push(itemFila['End date']);
        }
    }
    return informacion;
}

//Consulta todos los proyectos asociados a una persona
function consultaProyectos(codigo){
    let proyectos = [];
    for(const itemFila of leerStaffing){
        if(itemFila['Código'] == codigo){
            proyectos.push([itemFila['Proyecto'], itemFila['Dedicación'], itemFila['ROL']]);
            //console.log(itemFila['Proyecto']);
        }
    }
    //console.log(proyectos);
    return proyectos;
}

//Obtener el jefe 
function getBoss(codigo) {
    for(const itemFila of leerStaff){
        if(itemFila['Código'] == codigo){
            return itemFila['SUPERIOR'];
        }
    }
    return 'No tiene jefe';
}

//Obtener el nombre del empleado
function getName(codigo){
    for(const itemFila of leerStaff){
        if(itemFila['Código'] == codigo){
            return itemFila['Nombre'];
        }
    }
    return 'No tiene nombre';
}

//Obtiene toda la informacion para asignarla en Staffing al agregar el empleado en un nuevo proyecto
function getInformacion(codigo){
    let informacion = [];
    for(const itemFila of leerStaff){
        if(itemFila['Código'] == codigo){
            informacion.push(itemFila['Código']);
            informacion.push(itemFila['Nombre']);
            informacion.push(itemFila['Dirección']);
            informacion.push(itemFila['Servicio']);
            informacion.push(itemFila['Empresa']);
        }
    }
    console.log(informacion[0]);
    return informacion;
}


//Modificar celda en Staffing
function modifyDedicacion(codigo, proyecto, dedicacion){
    // editar una celda específica en una hoja de Excel 
    var aspose = aspose || {};
    // crear un objeto de la clase Cells.
    aspose.cells = require("aspose.cells");
    // instancia la clase secundaria WorkBook con un archivo XLSX 
    var sampleFile = "staffingSystems - copia.xlsx";
    var workbook = new aspose.cells.Workbook(sampleFile);
    // Acceda al libro de trabajo, obtenga las celdas llamando al método getCells () y llame al método putValue (cadena) para actualizar una celda específica (B2) de la hoja de Excel 
    for(var i = 2; i<100; i++){
        //console.log(console.log(workbook.getWorksheets().get(i).getCells().get("A"+i).getValue()));
        if(workbook.getWorksheets().get(3).getCells().get("A"+i).getValue()==codigo && workbook.getWorksheets().get(3).getCells().get("G"+i).getValue() == proyecto){
            //console.log(workbook.getWorksheets().get(3).getCells().get("H"+ide).getValue());
            workbook.getWorksheets().get(3).getCells().get("H"+i).putValue(dedicacion);
            //console.log(workbook.getWorksheets().get(3).getCells().get("H"+ide).getValue());
        }
    }
    // guardar los datos en un nuevo archivo xlsx
    workbook.save("staffingSystems - copia.xlsx");
}

function estaOcupado(codigo){
    var suma = 0;
    for(const itemFila of leerStaffing){
        if(itemFila['Código'] == codigo){
            suma += itemFila['Dedicación'];
        }
    }
    return suma;
}


//Asignar persona a un proyecto
function asignarPersona(codigo, proyecto, dedicacion, rol, tecnologia, comentarios){
    //Agregar la validacion la dedicacion
    var ocupacion = estaOcupado(codigo);
    if(ocupacion < 0.9 && ocupacion + dedicacion <= 1){
        var aspose = aspose || {};
        aspose.cells = require("aspose.cells");
        var sampleFile = "staffingSystems - copia.xlsx";
        var workbook = new aspose.cells.Workbook(sampleFile);
        var lista = getInformacion(codigo);
        i = getLength(leerStaffing) + 2;
        workbook.getWorksheets().get(3).getCells().get("A"+i).putValue(lista[0]); 
        workbook.getWorksheets().get(3).getCells().get("B"+i).putValue(lista[1]);
        workbook.getWorksheets().get(3).getCells().get("C"+i).putValue(lista[2]);
        workbook.getWorksheets().get(3).getCells().get("D"+i).putValue(lista[3]);
        workbook.getWorksheets().get(3).getCells().get("E"+i).putValue(lista[4]);
        workbook.getWorksheets().get(3).getCells().get("G"+i).putValue(proyecto);
        workbook.getWorksheets().get(3).getCells().get("H"+i).putValue(dedicacion);
        workbook.getWorksheets().get(3).getCells().get("I"+i).putValue(rol);
        workbook.getWorksheets().get(3).getCells().get("J"+i).putValue(tecnologia);
        workbook.getWorksheets().get(3).getCells().get("K"+i).putValue(comentarios);
        workbook.save("staffingSystems - copia.xlsx");
    }else{
        console.log("Este empleado está ocupado");
    }
}

*/

app.use('/static',express.static("static"));
//app.use(express.static('static'));


app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('[GET] http://localhost:8080/');
});