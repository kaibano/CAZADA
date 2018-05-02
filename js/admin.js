window.addEventListener("load",function(){

    /***** FUNCIONES DE PINTAR LOS FORMULARIOS PARA AÑADIR CLASES,PROFESORES,ALUMNOS Y ASIGNATURAS *****/
    function printNewAsignatura(){
        $('#content #freeContent').empty();
        $('#freeContent').append('<div id="divNewAsignatura"><input type="text" id="newAsignaturaInput"><div id="addNewAsiganturaButton" class="botonAnnadir">Añadir</div></div>');
        document.getElementById('addNewAsiganturaButton').onclick = function(){
            addAsignatura(document.getElementById('newAsignaturaInput').value);
        }
    }

    function printNewAlumno(){

    }

    function printNewProfesor(){

    }

    function printNewClase(){

    }

    /***** FUNCTIONES DE AÑADIR CLASES,PROFESORES,ALUMNOS Y ASIGNATURAS *****/
    function addAsignatura(asignatura) {
        var connection = null;

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4) {
                    if (connection.status === 200) {
                        if(connection.responseText === "true"){
                            console.log('Asignatura insertada');
                            printNewAsignatura();
                        }else{
                            console.log('Error al insertar asignatura, es posible que ya exista una con este nombre');
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/addAsignaturas.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("asig=" + asignatura);
        }
    }

    function addAlumno(){

    }

    function addProfesor(){

    }

    function addClase(){

    }

    /***** FUNCION ONCLICK PARA LOS BOTONES DE AÑADIR *****/
    document.getElementById('addAsignatura').onclick = printNewAsignatura;
    document.getElementById('addAlumno').onclick = printNewAlumno;
    document.getElementById('addProfesor').onclick = printNewProfesor;
    document.getElementById('addClase').onclick = printNewClase;

    /***** FUNCION DE LISTAR CLASES,PROFESORES Y ASIGNATURAS *****/
    function getArrayLista(lista){
        var connection = null;

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4) {
                    if (connection.status === 200) {
                        var res = JSON.parse(connection.responseText);
                        if(lista === "clases"){
                            pintarListaClase(res);
                        }else if(lista === "profesores"){
                            pintarListaProfesores(res);
                        }else{
                            pintarListaAsignaturas(res);
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/listar.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("lista="+lista);
        }
    }

    /***** FUNCION PARA OBTENER EL NOMBRE DE UN PROFESOR A PARTIR DE SU ID *****/
    function getNombreProfesor(id){
        var connection = null;

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4) {
                    if (connection.status === 200) {
                        console.log(JSON.parse(connection.responseText));
                    }
                }
            };
            connection.open("POST", "../administrador/getNombreProfe.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+id);
        }
    }

    function pintarListaClase(arrayLista){
        $('#content #freeContent').empty().append('<div id="claseContent"><div class="divClase"><div class="divIdClase">ID</div><div class="divNombreClase">Nombre</div><div class="divTutorClase">Tutor</div><div class="divOpcionesClase">Opciones</div></div></div>');

        for(var x = 0 ; x < arrayLista.length ; x++){
            $('#content #freeContent #claseContent').append('<div class="divClase">' +
                '<div class="divIdClase">'+arrayLista[x]['ID_Clase']+'</div>' +
                '<div class="divNombreClase">'+arrayLista[x]['Clase']+'</div>' +
                '<div class="divTutorClase">'+arrayLista[x]['Tutor'][0]['Nombre']+' '+arrayLista[x]['Tutor'][0]['Apellidos']+'</div>' +
                '<div class="divOpcionesClase"><img src="../../img/modificar.png"><img src="../../img/eliminar.png"></div></div>');
        }
    }

    function pintarListaProfesores(arrayLista) {
        $('#content #freeContent').empty().append('<table id="profesContent"><tr class="divProfe"><td class="divUsuProfe">Usuario</td><td class="divNombreProfe">Nombre</td><td class="divMailProfe">Email</td><td class="divTutoriaProfe">Tutoria</td><td class="divClasesProfe">Clases</td><td class="divOpcionesProfe">Opciones</td></tr></table>');

        for (var x = 0; x < arrayLista.length; x++) {
            $('#content #freeContent #profesContent').append('<tr class="divProfe">' +
                '<td class="divUsuProfe">' + arrayLista[x]['Usuario'] + '</td>' +
                '<td class="divNombreProfe">' + arrayLista[x]['Nombre'] + ' ' + arrayLista[x]['Apellidos'] + '</td>' +
                '<td class="divMailProfe">' + arrayLista[x]['Mail'] + '</td>' +
                '<td class="divTutoriaProfe">' + arrayLista[x]['Tutoria'] + '</td>' +
                '<td class="divClasesProfe"></td>' +
                '<td class="divOpcionesProfe"><img src="../../img/modificar.png"><img src="../../img/eliminar.png"></td></tr>');
            for(var y = 0 ; y < arrayLista[x]['Clases'].length ; y++){
                 var divClase = document.createElement('DIV');
                    divClase.innerHTML = arrayLista[x]['Clases'][y];
                document.getElementById('profesContent').childNodes[0].childNodes[x+1].childNodes[4].appendChild(divClase);
            }
        }
    }

    function pintarListaAsignaturas(arrayLista) {
        $('#content #freeContent').empty().append('<table id="asignaturasContent"><tr class="divAsignaturas"><td class="divIdAsignatura">ID</td><td class="divNombreAsignatura">Nombre</td><td class="divOpcionesAsignatura">Opciones</td></tr></table>');
        for (var x = 0; x < arrayLista.length; x++) {
            $('#content #freeContent #asignaturasContent').append('<tr class="divAsignaturas">' +
                '<td class="divIdAsignatura">'+arrayLista[x]['ID_Asig']+'</td>' +
                '<td class="divNombreAsignatura">'+arrayLista[x]['Nombre']+'</td>' +
                '<td class="divOpcionesAsignatura"><img class="editAsig" src="../../img/modificar.png"><img class="deleteAsig" src="../../img/eliminar.png"></td></tr>');
        }

        $('.editAsig').click(function () {
            var id = this.parentNode.parentNode.firstChild.innerHTML;
            var asigNombre = this.parentNode.parentNode.childNodes[1].innerHTML;
            $(this.parentNode.parentNode.childNodes[1]).replaceWith('<input type="text" class="divNombreAsignatura" value="' + asigNombre + '"></input>').select();
            $(this).removeClass('editAsig').addClass('aceptarCambios').attr('src', '../../img/tick.png').off().click(function () {
                var nombreAsignado = this.parentNode.parentNode.childNodes[1].value;
                modificarAsignatura(nombreAsignado,id);
            });
            $(this.nextSibling).hide();
        });

        $('.deleteAsig').click(function(){
           var id = this.parentNode.parentNode.firstChild.innerHTML;
           deleteAsignatura(this.parentNode.parentNode,id);
        });
    }

    /***** FUNCIONES PARA ELIMINAR ELEMENTO *****/
    function deleteAsignatura(objeto,id){
        var connection = null;

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4) {
                    if (connection.status === 200) {
                        if(connection.responseText === '1') {
                            var divMsg = document.createElement('DIV');
                                divMsg.setAttribute('class','msg');
                                divMsg.innerHTML = 'Error. La asignatura no puede ser eliminada por entrar en conflicto con otras tablas.';
                            objeto.appendChild(divMsg);
                        }else{
                            console.log('Asignatura eliminada');
                            getArrayLista('asignaturas');
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/deleteAsignatura.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("asig="+id);
        }
    }

    /***** FUNCION PARA MODIFICAR ASIGNATURA *****/
    function modificarAsignatura(nombre,id){
        var connection = null;

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4 && connection.status === 200) {
                    getArrayLista('asignaturas');
                }
            };
            connection.open("POST", "../administrador/modificarAsignatura.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("asig="+nombre+"&id="+id);
        }
    }

    /***** FUNCTION ONLCICK PARA LOS BOTONES DE LISTAR *****/
    document.getElementById('listaClases').onclick = function(){
        getArrayLista("clases");
    };
    document.getElementById('listaProfesores').onclick = function(){
        getArrayLista("profesores");
    };
    document.getElementById('listaAsignaturas').onclick = function(){
        getArrayLista("asignaturas");
    };

    /***** FUNCTION QUE SE EJECUTA AL INICIO TRAS EL LOGIN *****/
    getArrayLista("clases");
});