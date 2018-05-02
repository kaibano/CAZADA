window.addEventListener("load",function(){

    /***** FUNCION PARA OPTENER UN ARRAY CON LAS CLASES *****/
    function getArrayClases(){
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
                        printNewProfesor(JSON.parse(connection.responseText));
                    }
                }
            };
            connection.open("POST", "../administrador/getArrayClasesSinTutor.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send();
        }
    }

    /***** FUNCIONES DE PINTAR LOS FORMULARIOS PARA AÑADIR CLASES,PROFESORES,ALUMNOS Y ASIGNATURAS *****/
    function printNewAsignatura(){
        $('#content #freeContent').empty();
        $('#freeContent').append('<div id="divNewAsignatura"><div>Nueva asignatura</div><div class="condiciones">*Introduzca un nombre de asignatura que no exista.</div><input type="text" id="newAsignaturaInput"><div id="addNewAsiganturaButton" class="botonAnnadir">Añadir</div></div>');
        document.getElementById('addNewAsiganturaButton').onclick = function(){
            addAsignatura(document.getElementById('newAsignaturaInput').value);
        }
    }

    function printNewAlumno(){

    }

    function printNewProfesor(arrayClases){
        console.log(arrayClases);
        $('#content #freeContent').empty();
        $('#freeContent').append('<div id="divNewProfesor">' +
            '<div>Nuevo Profesor/Profesora</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewProfe"><div class="newProfeLabel">Nombre*</div><input id="newNombreProfe" class="newProfeInput" type="text" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">Apellidos*</div><input id="newApellidosProfe" class="newProfeInput" type="text" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">DNI*</div><input id="newDniProfe" class="newProfeInput" type="text" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">Email*</div><input id="newEmailProfe" class="newProfeInput" type="text" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">Contraseña*</div><input id="newPassProfe" class="newProfeInput" type="password" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">Tutor/a</div><select id="newProfeSelect" class="newProfeInput"><option name="tutor" value="0"></option></select></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">Clases</div><div id="newProfeClases" class="newProfeInput"></div></div> '+
            '<div id="addNewProfesorButton" class="botonAnnadir">Añadir</div>' +
            '</div>');

        for(var x = 0 ; x < arrayClases[0].length ; x++){
            var option = document.createElement('OPTION');
                option.setAttribute('name','tutor');
                option.setAttribute('value',arrayClases[0][x]['ID_Clase']);
                option.innerHTML = arrayClases[0][x]['Clase'];
            document.getElementById('newProfeSelect').appendChild(option);
        }

        for(var y = 0 ; y < arrayClases[1].length ; y++){
            var divCheck = document.createElement('DIV');
            var check = document.createElement('INPUT');
                check.setAttribute('type','checkbox');
                check.setAttribute('name','check[]');
                check.setAttribute('value',arrayClases[1][y]['ID_Clase']);
            document.getElementById('newProfeClases').appendChild(divCheck);
            divCheck.appendChild(check);
            divCheck.append(arrayClases[1][y]['Clase']);
        }

        document.getElementById('addNewProfesorButton').onclick = function(){
            var clases = '';
            $('#newProfeClases div input[type=checkbox]:checked').each(function(){
                clases += $(this).val()+' ';
            });
            addProfesor(
                this.parentNode,
                document.getElementById('newNombreProfe').value,
                document.getElementById('newApellidosProfe').value,
                document.getElementById('newDniProfe').value,
                document.getElementById('newEmailProfe').value,
                document.getElementById('newPassProfe').value,
                document.getElementById('newProfeSelect').value,
                clases
            );
        }
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

    function addProfesor(objeto,nombre,apellidos,dni,email,password,tutor,clases) {
        var connection = null;
        var msg = null;
        if(objeto.childNodes[11]) {
            objeto.childNodes[11].remove();
        }

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4) {
                    if (connection.status === 200) {
                        var divMsg = document.createElement('DIV');
                        divMsg.setAttribute('class','msgProfe');
                        objeto.appendChild(divMsg);

                        if(connection.responseText === "true") {
                            $('.newProfeInput').val('');
                            divMsg.setAttribute('style','color:green !important');
                            msg = 'Nuevo profesor/profesora insertado/a';
                        }else if(connection.responseText === 'existe'){
                            msg = 'El usuario ya existe en la base de datos';
                        }else if(connection.responseText === 'vacio'){
                            msg = 'Algún campo obligatorio está vacio';
                        }
                        divMsg.innerHTML = msg;
                    }
                }
            };
            connection.open("POST", "../administrador/addProfesor.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("nombre=" + nombre + '&apellidos=' + apellidos + '&dni=' + dni + '&email=' + email + '&pass=' + password+'&tutor='+tutor+'&clases='+clases);
        }
    }

    function addClase(){

    }

    /***** FUNCION ONCLICK PARA LOS BOTONES DE AÑADIR *****/
    document.getElementById('addAsignatura').onclick = printNewAsignatura;
    document.getElementById('addAlumno').onclick = printNewAlumno;
    document.getElementById('addProfesor').onclick = getArrayClases;
    document.getElementById('addClase').onclick = printNewClase;

    /***** FUNCION QUE OBTIENE UN ARRAY DE CLASES,PROFESORES O ASIGNATURAS SEGUN EL STRING DE LISTA QUE SE LE PASA *****/
    /***** LLAMA A LA FUNCION PINTAR SEGUN LA LISTA PASANDO EL ARRAY OBTENIDO *****/
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

    /***** FUNCIONES PARA PINTAR LAS LISTAS DE CLASES, PROFESORES Y ASIGNATURAS *****/
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
                '<td class="divOpcionesProfe"><img src="../../img/modificar.png"><img class="deleteProfesor" src="../../img/eliminar.png"></td></tr>');
            for(var y = 0 ; y < arrayLista[x]['Clases'].length ; y++){
                 var divClase = document.createElement('DIV');
                    divClase.innerHTML = arrayLista[x]['Clases'][y];
                document.getElementById('profesContent').childNodes[0].childNodes[x+1].childNodes[4].appendChild(divClase);
            }
        }

        $('.deleteProfesor').click(function(){
            var id = this.parentNode.parentNode.firstChild.innerHTML;
            deleteProfesor(this.parentNode.parentNode,id);
        });
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
            if(this.parentNode.parentNode.childNodes[3]){
                this.parentNode.parentNode.childNodes[3].remove();
            }
            var id = this.parentNode.parentNode.firstChild.innerHTML;
            var asigNombre = this.parentNode.parentNode.childNodes[1].innerHTML;
            $(this.parentNode.parentNode.childNodes[1]).replaceWith('<input type="text" class="divNombreAsignatura" value="' + asigNombre + '"></input>').select();
            $(this).removeClass('editAsig').addClass('aceptarCambios').attr('src', '../../img/tick.png').off().click(function () {
                var nombreAsignado = this.parentNode.parentNode.childNodes[1].value;
                modificarAsignatura(nombreAsignado,id);
            });
            $(this.nextSibling).removeClass('deleteAsig').addClass('cancelEdit').attr('src', '../../img/cross.png').off().click(function () {
                getArrayLista('asignaturas');
            });
        });

        $('.deleteAsig').click(function(){
           var id = this.parentNode.parentNode.firstChild.innerHTML;
           deleteAsignatura(this.parentNode.parentNode,id);
        });
    }

    /***** FUNCIONES PARA ELIMINAR ELEMENTO, LLAMA AL PHP QUE LO ELIMINA DE LA BBDD*****/
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
                                if(!objeto.childNodes[3]) {
                                    objeto.appendChild(divMsg);
                                }
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

    function deleteProfesor(objeto,id){
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
                            console.log('Profesor eliminado');
                            getArrayLista('profesores');
                        }else{
                            console.log('Ha ocurrido un error');
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/deleteProfesor.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+id);
        }
    }

    /***** FUNCION PARA MODIFICAR ASIGNATURA, LLAMA AL PHP QUE LAS MODIFICA *****/
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

    /***** FUNCTION QUE SE EJECUTA AL INICIO TRAS EL LOGIN PARA QUE EN EL ADMINISTRADOR LO PRIMEROS QUE SE VEAN SON LAS CLASES PINTADAS *****/
    getArrayLista("clases");
});