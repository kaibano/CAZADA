window.addEventListener("load",function(){

    /***** FUNCION PARA OPTENER UN ARRAY CON LAS CLASES *****/
    function getArrayClasesForPrintNewProfesor(){
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

    function getArrayClasesForPrintNewAlumno(){
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
                        printNewAlumno(JSON.parse(connection.responseText));
                    }
                }
            };
            connection.open("POST", "../administrador/getArrayClasesSinTutor.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send();
        }
    }

    /***** FUNCTION PARA OBTENER UN ARRAY CON LAS CLASES QUE NO TIENEN TUTORIA *****/
    function getArrayClasesSinTutoriaForModificarProfesores(objeto){
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
                        for(var x = 0; x < JSON.parse(connection.responseText)[0].length ; x++){
                            var option = document.createElement('OPTION');
                            option.setAttribute('name','tutoria');
                            option.setAttribute('value',JSON.parse(connection.responseText)[0][x]['ID_Clase']);
                            option.innerHTML = JSON.parse(connection.responseText)[0][x]['Clase'];
                            objeto.appendChild(option);
                        }
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
        $('#freeContent').append('<div id="divNewAsignatura"><div>Nueva asignatura</div><div class="condiciones">*Introduzca un nombre de asignatura que no exista.</div><input type="text" id="newAsignaturaInput"><div id="addNewAsiganturaButton" class="btn btn-primary">Añadir</div></div>');
        document.getElementById('addNewAsiganturaButton').onclick = function(){
            addAsignatura(this.parentNode,document.getElementById('newAsignaturaInput').value);
        }
    }

    function printNewAlumno(arrayClases){
        console.log(arrayClases);
        $('#content #freeContent').empty();
        $('#freeContent').append('<div id="divNewAlumno">' +
            '<div>Nuevo/a Alumno/a</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Nombre*</div><input id="newNombreAlumno" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Apellidos*</div><input id="newApellidoAlumno" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Clase</div><select id="newAlumnoSelect" class="newAlumnoInput"><option name="clase" value="0"></option></select></div>'+
            '</div>');

        for(var x = 0 ; x < arrayClases[1].length ; x++){
            var option = document.createElement('OPTION');
            option.setAttribute('name','clase');
            option.setAttribute('value',arrayClases[1][x]['ID_Clase']);
            option.innerHTML = arrayClases[1][x]['Clase'];
            document.getElementById('newAlumnoSelect').appendChild(option);
        }

        $('#freeContent').append('<div id="divNewAlumno">' +
            '<div>Datos Padre/Madre/Tutor</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">DNI*</div><input id="newDNIPadre" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Nombre*</div><input id="newNombrePadre" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Apellidos*</div><input id="newApellidoPadre" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Email*</div><input id="newEmailPadre" class="newAlumnoInput" type="text" value=""></div>'+
            '<div id="addNewAlumnoButton" class="btn btn-primary">Añadir</div>' +
            '</div>');

        document.getElementById('addNewAlumnoButton').onclick = function(){
            addAlumno(
                this.parentNode,
                document.getElementById('newNombreAlumno').value,
                document.getElementById('newApellidoAlumno').value,
                document.getElementById('newAlumnoSelect').value,
                document.getElementById('newDNIPadre').value,
                document.getElementById('newNombrePadre').value,
                document.getElementById('newApellidoPadre').value,
                document.getElementById('newEmailPadre').value
            );
        }
    }

    function printNewProfesor(arrayClases){
        $('#content #freeContent').empty();
        $('#freeContent').append('<div id="divNewProfesor">' +
            '<div>Nuevo Profesor/Profesora</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewProfe"><div class="newProfeLabel">Nombre completo*</div><input id="newNombreProfe" class="newProfeInput" type="text" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">DNI*</div><input id="newDniProfe" class="newProfeInput" type="text" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">Email*</div><input id="newEmailProfe" class="newProfeInput" type="text" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">Contraseña*</div><input id="newPassProfe" class="newProfeInput" type="password" value=""></div>'+
            '<div class="divEachNewProfe"><div class="newProfeLabel">Tutor/a</div><select id="newProfeSelect" class="newProfeInput"><option name="tutor" value="0"></option></select></div>'+
            '<div id="addNewProfesorButton" class="btn btn-primary">Añadir</div>' +
            '</div>');

        for(var x = 0 ; x < arrayClases[0].length ; x++){
            var option = document.createElement('OPTION');
                option.setAttribute('name','tutor');
                option.setAttribute('value',arrayClases[0][x]['ID_Clase']);
                option.innerHTML = arrayClases[0][x]['Clase'];
            document.getElementById('newProfeSelect').appendChild(option);
        }

        document.getElementById('addNewProfesorButton').onclick = function(){
            addProfesor(
                this.parentNode,
                document.getElementById('newNombreProfe').value,
                document.getElementById('newDniProfe').value,
                document.getElementById('newEmailProfe').value,
                document.getElementById('newPassProfe').value,
                document.getElementById('newProfeSelect').value
            );
        }
    }

    function printNewClase(){
        $('#content #freeContent').empty();
        $('#freeContent').append('<div id="divNewClase" xmlns="http://www.w3.org/1999/html">' +
            '<div>Nueva Clase</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewClase"><div class="newClaseLabel">Año (1,2,3...)*</div><input id="newAnnoClase" class="newClaseInput" type="number" min="1" max="4" value=""></div>'+
            '<div class="divEachNewClase"><div class="newClaseLabel">Letra (A,B,C...)*</div><select id="newLetraClase" class="newClaseInput">' +
            '<option name="letraClase" value="0"></option><option name="letraClase" value="A">A</option><option name="letraClase" value="B">B</option><option name="letraClase" value="C">C</option><option name="letraClase" value="D">D</option></select></div>'+
            '<div class="divEachNewClase"><div class="newClaseLabel">Modalidad*</div><select id="newModalClase" class="newClaseInput"><option name="modal" value="-"></option><option name="modal" value="ESO">ESO</option><option name="modal" value="BACH">BACHILLERATO</option></select></div>'+
            '<div id="addNewClaseButton" class="btn btn-primary">Añadir</div>' +
            '</s>');

        document.getElementById('addNewClaseButton').onclick = function(){
            addClase(
                this.parentNode,
                document.getElementById('newAnnoClase').value,
                document.getElementById('newLetraClase').value,
                document.getElementById('newModalClase').value
            );
        }
    }

    /***** FUNCTIONES DE AÑADIR CLASES,PROFESORES,ALUMNOS Y ASIGNATURAS *****/
    function addAsignatura(objeto,asignatura) {
        var connection = null;
        var msg = null;
        if(objeto.childNodes[4]){
            objeto.childNodes[4].remove();
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
                        objeto.appendChild(divMsg);
                        if(connection.responseText === "true"){
                            divMsg.setAttribute('style','color:green;margin-top:20px');
                            msg = 'Asignatura insertada con éxito';
                            document.getElementById('newAsignaturaInput').value = "";
                        }else{
                            divMsg.setAttribute('style','color:red;margin-top:20px');
                            if(connection.responseText === 'vacio') {
                                msg = 'Error al insertar asignatura, el nombre no puede estar vacio';
                            }else{
                                msg = 'Error al insertar asignatura, ya existe una con este nombre';
                            }
                        }
                        divMsg.innerHTML = msg;
                    }
                }
            };
            connection.open("POST", "../administrador/addAsignaturas.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("asig=" + asignatura);
        }
    }

    function addAlumno(objeto,nombreAlumno,apellidosAlumno,clase,DNIpadre,nombrePadre,apellidosPadre,email){
        var connection = null;
        var msg = null;
        if(objeto.childNodes[7]) {
            objeto.childNodes[7].remove();
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
                        divMsg.setAttribute('class','msgAlumno');
                        objeto.appendChild(divMsg);
                        if(connection.responseText === "true") {
                            $('.newAlumnoInput').val('');
                            divMsg.setAttribute('style','color:green !important');
                            msg = 'Nuevo alumno/a insertado/a';
                        }else if(connection.responseText === 'existe'){
                            msg = 'El alumno/a ya existe en la base de datos';
                        }else if(connection.responseText === 'vacio'){
                            msg = 'Algún campo obligatorio está vacio, revíselo y vuelva a intentarlo';
                        }
                        divMsg.innerHTML = msg;
                    }
                }
            };
            connection.open("POST", "../administrador/addAlumno.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("nombreA="+nombreAlumno+'&apellidosA='+apellidosAlumno+'&clase='+clase+'&dni='+DNIpadre+'&nombreP='+nombrePadre+'&apellidosP='+apellidosPadre+'&email='+email);
        }
    }

    function addProfesor(objeto,nombre,dni,email,password,tutor) {
        var connection = null;
        var msg = null;
        if(objeto.childNodes[8]) {
            objeto.childNodes[8].remove();
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
                            msg = 'Algún campo obligatorio está vacio, revíselo y vuelva a intentarlo';
                        }
                        divMsg.innerHTML = msg;
                    }
                }
            };
            connection.open("POST", "../administrador/addProfesor.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("nombre=" + nombre + '&dni=' + dni + '&email=' + email + '&pass=' + password+'&tutor='+tutor);
        }
    }

    function addClase(objeto,numero,letra,modal){
        console.log(numero+letra+modal);
        var connection = null;
        var msg = null;
        if(objeto.childNodes[6]) {
            objeto.childNodes[6].remove();
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
                        divMsg.setAttribute('class','msgClase');
                        objeto.appendChild(divMsg);
                        if(connection.responseText === "true") {
                            $('.newProfeInput').val('');
                            divMsg.setAttribute('style','color:green !important');
                            msg = 'Nueva clase insertada';
                        }else if(connection.responseText === 'existe'){
                            msg = 'Este nombre de clase ya existe en la base de datos';
                        }else if(connection.responseText === 'vacio'){
                            msg = 'Algún campo obligatorio está vacio, revíselo y vuelva a intentarlo';
                        }
                        divMsg.innerHTML = msg;
                    }
                }
            };
            connection.open("POST", "../administrador/addClase.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("numero=" + numero + '&letra=' + letra + '&modal=' + modal);
        }
    }

    /***** FUNCION ONCLICK PARA LOS BOTONES DE AÑADIR *****/
    document.getElementById('addAsignatura').onclick = printNewAsignatura;
    document.getElementById('addAlumno').onclick = getArrayClasesForPrintNewAlumno;
    document.getElementById('addProfesor').onclick = getArrayClasesForPrintNewProfesor;
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
                '<div class="divTutorClase">'+arrayLista[x]['Tutor']['Nombre']+'</div>' +
                '<div class="divOpcionesClase"><span class="glyphicon glyphicon-pencil editClase" aria-hidden="true"></span><span class="glyphicon glyphicon-trash deleteClase" aria-hidden="true"></span></div>');
        }

        /*$('.editClase').click(function(){
            var usu = this.parentNode.parentNode.firstChild.innerHTML;
            var nombre = this.parentNode.parentNode.childNodes[1].innerHTML;
            var email = this.parentNode.parentNode.childNodes[2].innerHTML;
            var tutor = this.parentNode.parentNode.childNodes[3].innerHTML;
            $(this.parentNode.parentNode.childNodes[1]).replaceWith('<input type="text" class="divNombreProfe" value="' + nombre + '"></input>');
            $(this.parentNode.parentNode.childNodes[2]).replaceWith('<input type="text" class="divNombreProfe" value="' + email + '"></input>');
            $(this.parentNode.parentNode.childNodes[3]).replaceWith('<select id="selectModificarTutoriaProfesor" class="divNombreProfe"><option name="tutoria" value="0"></option></select>');
            getArrayClasesSinTutoriaForModificarProfesores(this.parentNode.parentNode.childNodes[3]);
            $(this).removeClass('glyphicon-pencil editProfesor').addClass('glyphicon-ok aceptarCambios').off().click(function () {
                var nombreAsignado = this.parentNode.parentNode.childNodes[1].value;
                var emailAsignado = this.parentNode.parentNode.childNodes[2].value;
                var tutorAsignado = this.parentNode.parentNode.childNodes[3].value;
                modificarProfesor(usu,nombreAsignado,emailAsignado,tutorAsignado,tutor,this.parentNode.parentNode);
            });
            $(this.nextSibling).removeClass('glyphicon-trash deleteProfesor').addClass('glyphicon-remove cancelEdit').off().click(function () {
                getArrayLista('profesores');
            });
        });*/

        $('.deleteClase').click(function(){
            var id = this.parentNode.parentNode.firstChild.innerHTML;
            if (window.confirm("Si elimina la clase, los datos como alumnos, profesores, horarios, faltas o notas en los que se hace referencia a la misma se verán afectados quedando así sin ninguna clase asociada ¿Está seguro de que desea continuar?")) {
                deleteClase(id);
            }
        });
    }

    function pintarListaProfesores(arrayLista) {
        $('#content #freeContent').empty().append('<table id="profesContent"><tr class="divProfe"><td class="divUsuProfe">Usuario</td><td class="divNombreProfe">Nombre</td><td class="divMailProfe">Email</td><td class="divTutoriaProfe">Tutoria</td><td class="divOpcionesProfe">Opciones</td></tr></table>');

        for (var x = 0; x < arrayLista.length; x++) {
            $('#content #freeContent #profesContent').append('<tr class="divProfe">' +
                '<td class="divUsuProfe">' + arrayLista[x]['Usuario'] + '</td>' +
                '<td class="divNombreProfe">' + arrayLista[x]['Nombre']+'</td>' +
                '<td class="divMailProfe">' + arrayLista[x]['Mail'] + '</td>' +
                '<td class="divTutoriaProfe">' + arrayLista[x]['Tutoria'] + '</td>' +
                '<td class="divOpcionesProfe"><span class="glyphicon glyphicon-pencil editProfesor" aria-hidden="true"></span><span class="glyphicon glyphicon-trash deleteProfesor" aria-hidden="true"></span></td></tr>');
        }

        $('.editProfesor').click(function(){
           var usu = this.parentNode.parentNode.firstChild.innerHTML;
           var nombre = this.parentNode.parentNode.childNodes[1].innerHTML;
           var email = this.parentNode.parentNode.childNodes[2].innerHTML;
           var tutor = this.parentNode.parentNode.childNodes[3].innerHTML;
            $(this.parentNode.parentNode.childNodes[1]).replaceWith('<input type="text" class="divNombreProfe" value="' + nombre + '"></input>');
            $(this.parentNode.parentNode.childNodes[2]).replaceWith('<input type="text" class="divNombreProfe" value="' + email + '"></input>');
            $(this.parentNode.parentNode.childNodes[3]).replaceWith('<select id="selectModificarTutoriaProfesor" class="divNombreProfe"><option name="tutoria" value="0"></option></select>');
            getArrayClasesSinTutoriaForModificarProfesores(this.parentNode.parentNode.childNodes[3]);
            $(this).removeClass('glyphicon-pencil editProfesor').addClass('glyphicon-ok aceptarCambios').off().click(function () {
                var nombreAsignado = this.parentNode.parentNode.childNodes[1].value;
                var emailAsignado = this.parentNode.parentNode.childNodes[2].value;
                var tutorAsignado = this.parentNode.parentNode.childNodes[3].value;
                modificarProfesor(usu,nombreAsignado,emailAsignado,tutorAsignado,tutor,this.parentNode.parentNode);
            });
            $(this.nextSibling).removeClass('glyphicon-trash deleteProfesor').addClass('glyphicon-remove cancelEdit').off().click(function () {
                getArrayLista('profesores');
            });
        });

        $('.deleteProfesor').click(function(){
            var tutor = this.parentNode.parentNode.childNodes[3].innerHTML;
            var id = this.parentNode.parentNode.firstChild.innerHTML;
            if(tutor !== "-") {
                if (window.confirm("Este profesor tiene asociada una tutoría así como podría tener asociadas clases en las que imparte, si lo elimina la clase se quedará sin tutor asociado ¿Desea continuar?")) {
                    deleteProfesor(id);
                }
            }else{
                if (window.confirm("Este profesor podría tener asociadas clases en las que imparte ¿Desea continuar?")) {
                    deleteProfesor(id);
                }
            }
        });
    }

    function pintarListaAsignaturas(arrayLista) {
        $('#content #freeContent').empty().append('<table id="asignaturasContent"><tr class="divAsignaturas"><td class="divIdAsignatura">ID</td><td class="divNombreAsignatura">Nombre</td><td class="divOpcionesAsignatura">Opciones</td></tr></table>');
        for (var x = 0; x < arrayLista.length; x++) {
            $('#content #freeContent #asignaturasContent').append('<tr class="divAsignaturas">' +
                '<td class="divIdAsignatura">'+arrayLista[x]['ID_Asig']+'</td>' +
                '<td class="divNombreAsignatura">'+arrayLista[x]['Nombre']+'</td>' +
                '<td class="divOpcionesAsignatura"><span class="glyphicon glyphicon-pencil editAsig" aria-hidden="true"></span><span class="glyphicon glyphicon-trash deleteAsig" aria-hidden="true"></span></td></tr>');
        }

        $('.editAsig').click(function () {
            var id = this.parentNode.parentNode.firstChild.innerHTML;
            var asigNombre = this.parentNode.parentNode.childNodes[1].innerHTML;
            $(this.parentNode.parentNode.childNodes[1]).replaceWith('<input type="text" class="divNombreAsignatura" value="' + asigNombre + '"></input>');
            $(this).removeClass('glyphicon-pencil editAsig').addClass('glyphicon-ok aceptarCambios').off().click(function () {
                var nombreAsignado = this.parentNode.parentNode.childNodes[1].value;
                modificarAsignatura(this.parentNode.parentNode,nombreAsignado,id);
            });
            $(this.nextSibling).removeClass('glyphicon-trash deleteAsig').addClass('glyphicon-remove cancelEdit').off().click(function () {
                getArrayLista('asignaturas');
            });
        });

        $('.deleteAsig').click(function(){
            if(window.confirm("Si la asignatura esta en conflicto con otras tablas no se podrá borrar ¿Desea continuar?")) {
                var id = this.parentNode.parentNode.firstChild.innerHTML;
                deleteAsignatura(this.parentNode.parentNode, id);
            }
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

    function deleteProfesor(id){
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
                            getArrayLista('profesores');
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/deleteProfesor.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+id);
        }
    }

    function deleteClase(id){
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
                            getArrayLista('clases');
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/deleteClase.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+id);
        }
    }

    /***** FUNCION PARA MODIFICAR ASIGNATURA, LLAMA AL PHP QUE LAS MODIFICA *****/
    function modificarAsignatura(objeto,nombre,id){
        var connection = null;
        var msg = null;
        if(objeto.childNodes[3]){
            objeto.childNodes[3].remove();
        }

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4 && connection.status === 200) {
                    var divMsg = document.createElement('DIV');
                    objeto.appendChild(divMsg);
                    if(connection.responseText === "false"){
                        divMsg.setAttribute('style','color:red;margin-top:20px');
                        msg = 'El nombre seleccionado ya existe para otra asignatura';
                        divMsg.innerHTML = msg;
                    }else{
                        getArrayLista('asignaturas');
                    }
                }
            };
            connection.open("POST", "../administrador/modificarAsignatura.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("asig="+nombre+"&id="+id);
        }
    }

    /***** FUNCION PARA MODIFICAR PROFESOR, LLAMA AL PHP QUE LO MODIFICA *****/
    function modificarProfesor(usu,nombre,email,tutoria,tutor,objeto){
        var connection = null;
        var msg = null;
        if(objeto.childNodes[6]){
            objeto.childNodes[6].remove();
        }

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4 && connection.status === 200) {
                    var divMsg = document.createElement('DIV');
                    objeto.appendChild(divMsg);
                    if(connection.responseText === "false"){
                        divMsg.setAttribute('style','color:red;margin-top:20px');
                        msg = 'El nombre seleccionado ya existe para otra asignatura';
                        divMsg.innerHTML = msg;
                    }else{
                        getArrayLista('profesores');
                    }
                }
            };
            connection.open("POST", "../administrador/modificarProfesor.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("usu="+usu+"&nombre="+nombre+"&email="+email+"&tutoria="+tutoria+"&tutor="+tutor);
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