window.addEventListener("load",function(){

    /***** FUNCION PARA OBTENER LAS ASIGNATURAS *****/
    function getArrayAsignaturas(objeto,id) {
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
                        var array = JSON.parse(connection.responseText);
                        var divSelect = document.createElement('SELECT');
                        divSelect.setAttribute('id','selectAsigHorario');
                        objeto.parentNode.prepend(divSelect);
                        objeto.remove();
                        for(var x = 0 ; x < array.length ; x++){
                            var option = document.createElement('OPTION');
                            option.setAttribute('value',array[x]['ID_Asig']);
                            option.innerHTML = array[x]['Nombre'];
                            divSelect.appendChild(option);
                        }
                        divSelect.onblur = function(){
                            modificarAsignaturaHorario(id,this.value,this.parentNode.id.charAt(0),this.parentNode.id.charAt(1));
                            var divAsig = document.createElement('DIV');
                            divAsig.setAttribute('class','asig');
                            divAsig.setAttribute('id',this.value);
                            divAsig.innerHTML = this.options[this.selectedIndex].text;
                            divAsig.onclick = function(){
                                getArrayAsignaturas(this,id);
                            };
                            this.parentNode.prepend(divAsig);
                            this.remove();
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/getArrayAsignaturas.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send();
        }
    }

    /***** FUNCION PARA OBTENER LOS PROFESORES QUE ESTAN LIBRES EN UNA HORA DETERMINADA *****/
    function getArrayFreeTeachers(objeto,id,dia,hora){
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
                        var array = JSON.parse(connection.responseText);
                        var divSelect = document.createElement('SELECT');
                        divSelect.setAttribute('id','selectTeacherHorario');
                        objeto.parentNode.appendChild(divSelect);
                        objeto.parentNode.setAttribute('class','selectActive');
                        objeto.remove();
                        for(var x = 0 ; x < array.length ; x++){
                            var option = document.createElement('OPTION');
                            option.setAttribute('value',array[x]['Usuario']);
                            option.innerHTML = array[x]['Nombre'];
                            divSelect.appendChild(option);
                        }
                        divSelect.onblur = function(){
                            this.parentNode.classList.remove('selectActive');
                            modificarProfesorHorario(id,this.value,dia,hora);
                            var divAsig = document.createElement('DIV');
                            divAsig.setAttribute('class','profe');
                            divAsig.innerHTML = this.options[this.selectedIndex].text;
                            divAsig.onclick = function(){
                                getArrayFreeTeachers(this,id,dia,hora);
                            };
                            this.parentNode.appendChild(divAsig);
                            this.remove();
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/getArrayFreeTeachers.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("dia="+dia+'&hora='+hora);
        }
    }

    /***** FUNCION PARA OBTENER UN ARRAY CON EL HORARIO DE UNA CLASE *****/
    function getArrayHorario(id,nombre){
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
                        printHorarioclase(JSON.parse(connection.responseText),id,nombre);
                    }
                }
            };
            connection.open("POST", "../administrador/getArrayHorario.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+id);
        }
    }

    /***** FUNCION PARA OBTENER UN ARRAY DE LOS ALUMNOS DE UNA CLASE *****/
    function getArrayAlumnos(objetoId){
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
                        printAlumnosTable(JSON.parse(connection.responseText),objetoId);
                    }
                }
            };
            connection.open("POST", "../administrador/getArrayAlumnos.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+objetoId.innerHTML);
        }
    }

    function getArrayAlumnosSinClase(){
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
                        printAlumnosSinClase(JSON.parse(connection.responseText));
                    }
                }
            };
            connection.open("POST", "../administrador/getArrayAlumnosSinClase.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send();
        }
    }

    /***** FUNCION PARA OPTENER UN ARRAY CON LAS CLASES Y APLICARLAS *****/
    function getArrayClases(objeto){
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
                        var array = JSON.parse(connection.responseText);
                        for (var x = 0 ; x < array.length ; x++){
                            var option = document.createElement('OPTION');
                            option.setAttribute('value',array[x]['ID_Clase']);
                            option.innerHTML = array[x]['Clase'];
                            objeto.appendChild(option);
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/getClasesArray.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send();
        }
    }

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

    /***** FUNCTION PARA OBTENER UN ARRAY CON LOS PROFESORES QUE NO TIENEN TUTORIA *****/
    function getArrayProfesoresSinTutoriaForModificarClases(objeto){
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
                        for(var x = 0; x < JSON.parse(connection.responseText).length ; x++){
                            var option = document.createElement('OPTION');
                            option.setAttribute('name','tutoria');
                            option.setAttribute('value',JSON.parse(connection.responseText)[x]['Usuario']);
                            option.innerHTML = JSON.parse(connection.responseText)[x]['Nombre'];
                            objeto.appendChild(option);
                        }
                    }
                }
            };
            connection.open("POST", "../administrador/getArrayProfesoresSinTutoria.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send();
        }
    }

    /***** FUNCIONES DE PINTAR LOS FORMULARIOS PARA AÑADIR CLASES,PROFESORES,ALUMNOS Y ASIGNATURAS *****/
    function printNewAsignatura(){
        $('#freeContent').empty().append('<div id="divNewAsignatura"><div>Nueva asignatura</div><div class="condiciones">*Introduzca un nombre de asignatura que no exista.</div><input type="text" id="newAsignaturaInput"><div id="addNewAsiganturaButton" class="btn btn-primary">Añadir</div></div>');
        document.getElementById('addNewAsiganturaButton').onclick = function(){
            addAsignatura(this.parentNode,document.getElementById('newAsignaturaInput').value);
        }
    }

    function printNewAlumno(arrayClases){
        $('#freeContent').empty().append('<div id="divNewAlumno">' +
            '<div>Nuevo/a Alumno/a</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Nombre*</div><input id="newNombreAlumno" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Apellidos*</div><input id="newApellidoAlumno" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Clase</div><select id="newAlumnoSelect" class="newAlumnoInput"><option name="clase" value="0"></option></select></div>'+
            '</div>'+
            '<div id="divNewAlumno">' +
            '<div>Datos Padre/Madre/Tutor</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">DNI*</div><input id="newDNIPadre" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Nombre*</div><input id="newNombrePadre" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Apellidos*</div><input id="newApellidoPadre" class="newAlumnoInput" type="text" value=""></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Email*</div><input id="newEmailPadre" class="newAlumnoInput" type="text" value=""></div>'+
            '<div id="addNewAlumnoButton" class="btn btn-primary">Añadir</div>' +
            '</div>');

        for(var x = 0 ; x < arrayClases[1].length ; x++){
            var option = document.createElement('OPTION');
            option.setAttribute('name','clase');
            option.setAttribute('value',arrayClases[1][x]['ID_Clase']);
            option.innerHTML = arrayClases[1][x]['Clase'];
            document.getElementById('newAlumnoSelect').appendChild(option);
        }

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
        $('#freeContent').empty().append('<div id="divNewProfesor">' +
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
        $('#freeContent').empty().append('<div id="divNewClase" xmlns="http://www.w3.org/1999/html">' +
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

    function addAlumnosToClass(array,objeto){
        var connection = null;
        var msg = null;
        if(objeto.parentNode.lastChild.innerHTML !== 'Continuar'){
            objeto.parentNode.lastChild.remove();
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
                        objeto.parentNode.appendChild(divMsg);
                        if (connection.responseText !== "vacio") {
                            if (connection.responseText === "true") {
                                divMsg.setAttribute('style', 'color:green;margin-top:20px');
                                msg = 'Modificación realizada con éxito';
                            } else {
                                divMsg.setAttribute('style', 'color:red;margin-top:20px');
                                msg = 'Error al modificar los datos. Inténtelo de nuevo.';
                            }
                        }else{
                            divMsg.setAttribute('style', 'color:red;margin-top:20px');
                            msg = 'Ninguna modificación que realizar';
                        }
                        divMsg.innerHTML = msg;
                        reloadResolverErrores();
                        document.getElementsByClassName('numError')[0].click();
                    }
                }
            };
            connection.open("POST", "../administrador/addAlumnoToClass.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("alum=" + JSON.stringify(array));
        }
    }

    /***** FUNCION QUE RECARGAR EL NUMERO DE ERRORES *****/
    function reloadResolverErrores(){
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
                        document.getElementsByClassName('numError')[0].innerHTML = '('+JSON.parse(connection.responseText)[0]['num']+')';

                    }
                }
            };
            connection.open("POST", "../administrador/reloadResolverErrores.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send();
        }
    }

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

    /***** FUNCIONES PARA PINTAR LAS LISTAS DE CLASES, PROFESORES, ASIGNATURAS, ALUMNOS Y HORARIOS *****/
    function pintarListaClase(arrayLista){
        $('#content #freeContent').empty().append('<div id="claseContent"><div class="divClase"><div class="divIdClase">ID</div><div class="divNombreClase">Nombre</div><div class="divTutorClase">Tutor</div><div class="divOpcionesClase">Opciones</div></div></div>');

        for(var x = 0 ; x < arrayLista.length ; x++){
            $('#content #freeContent #claseContent').append('<div class="divClase">' +
                '<div class="divIdClase">'+arrayLista[x]['ID_Clase']+'</div>' +
                '<div class="divNombreClase">'+arrayLista[x]['Clase']+'</div>' +
                '<div class="divTutorClase">'+arrayLista[x]['Tutor']['Nombre']+'</div>' +
                '<div class="divOpcionesClase"><span class="glyphicon glyphicon-pencil editClase" aria-hidden="true"></span><span class="glyphicon glyphicon-trash deleteClase" aria-hidden="true"></span><a class="glyphicon glyphicon-calendar infoCalendar" aria-hidden="true"></a></div>' +
                '</div>');
            getArrayAlumnos(document.getElementsByClassName('divClase')[x+1].firstChild);
        }

        $('.divIdClase,.divNombreClase,.divTutorClase').click(function(){
            var open = this.parentNode.classList.contains('open');
            if(open) {
                $('.open').removeClass('open');
            }else{
                this.parentNode.classList.toggle('open');
            }
        });

        $('.infoCalendar').click(function () {
            getArrayHorario(this.parentNode.parentNode.firstChild.innerHTML,this.parentNode.parentNode.childNodes[1].innerHTML);
        });

        $('.editClase').click(function(){
            var id = this.parentNode.parentNode.firstChild.innerHTML;
            var clase = this.parentNode.parentNode.childNodes[1].innerHTML;
            var tutor = this.parentNode.parentNode.childNodes[2].innerHTML;
            $(this.parentNode.parentNode.childNodes[1]).replaceWith('<input type="text" class="divNombreClase" value="' + clase + '"></input>');
            $(this.parentNode.parentNode.childNodes[2]).replaceWith('<select id="selectModificarTutoriaClase" class="divTutorClase"><option name="tutoria" value="0"></option></select>');
            getArrayProfesoresSinTutoriaForModificarClases(this.parentNode.parentNode.childNodes[2]);
            $(this).removeClass('glyphicon-pencil editClase').addClass('glyphicon-ok aceptarCambios').off().click(function () {
                var claseAsignada = this.parentNode.parentNode.childNodes[1].value;
                var tutorAsignado = this.parentNode.parentNode.childNodes[2].value;
                modificarClase(id,claseAsignada,tutorAsignado,tutor,this.parentNode.parentNode);
            });
            $(this.nextSibling).removeClass('glyphicon-trash deleteClase').addClass('glyphicon-remove cancelEdit').off().click(function () {
                getArrayLista('clases');
            });
        });

        $('.deleteClase').click(function(){
            var id = this.parentNode.parentNode.firstChild.innerHTML;
            if (window.confirm("Si elimina la clase, los datos como alumnos, profesores, horarios, faltas o notas en los que se hace referencia a la misma se verán afectados quedando así sin ninguna clase asociada ¿Está seguro de que desea continuar?")) {
                deleteClase(id);
            }
        });

        reloadResolverErrores();
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

    function printAlumnosTable(arrayAlumnos,objeto){
        var divPadre = objeto.parentNode;
        var divMainNewAlumno = document.createElement('DIV');
        divMainNewAlumno.setAttribute('class','alumnoClase');
        var idMainAlumno = document.createElement('DIV');
        idMainAlumno.setAttribute('class','idAlumno');
        idMainAlumno.innerHTML = 'ID';
        divMainNewAlumno.appendChild(idMainAlumno);
        var nombreMainAlumno = document.createElement('DIV');
        nombreMainAlumno.setAttribute('class','nombreAlumno');
        nombreMainAlumno.innerHTML = 'NOMBRE';
        divMainNewAlumno.appendChild(nombreMainAlumno);
        var apellidosMainAlumno = document.createElement('DIV');
        apellidosMainAlumno.setAttribute('class','apellidosAlumno');
        apellidosMainAlumno.innerHTML = 'APELLIDOS';
        divMainNewAlumno.appendChild(apellidosMainAlumno);

        divPadre.appendChild(divMainNewAlumno);

        for (var x = 0 ; x < arrayAlumnos.length ; x++){
            var divNewAlumno = document.createElement('DIV');
            divNewAlumno.setAttribute('class','alumnoClase');
            var idAlumno = document.createElement('DIV');
            idAlumno.setAttribute('class','idAlumno');
            idAlumno.innerHTML = arrayAlumnos[x]['ID_Alumno'];
            divNewAlumno.appendChild(idAlumno);
            var nombreAlumno = document.createElement('DIV');
            nombreAlumno.setAttribute('class','nombreAlumno');
            nombreAlumno.innerHTML = arrayAlumnos[x]['Nombre'];
            divNewAlumno.appendChild(nombreAlumno);
            var apellidosAlumno = document.createElement('DIV');
            apellidosAlumno.setAttribute('class','apellidosAlumno');
            apellidosAlumno.innerHTML = arrayAlumnos[x]['Apellidos'];
            divNewAlumno.appendChild(apellidosAlumno);

            var divDeleteAlumno = document.createElement('SPAN');
            divDeleteAlumno.setAttribute('id','delAlumnoButton');
            divDeleteAlumno.setAttribute('class','glyphicon glyphicon-trash');
            divNewAlumno.appendChild(divDeleteAlumno);

            divDeleteAlumno.onclick = function(){
                var id = this.parentNode.firstChild.innerHTML;
                if (window.confirm("Va a eliminar un alumno de la base de datos, ¿Desea continuar?")) {
                    deleteAlumno(id);
                }
            };

            divPadre.appendChild(divNewAlumno);
            idAlumno.onclick = function () {
                getAlumnoCompleteData(this.parentNode.childNodes[0].innerHTML,this.parentNode.childNodes[1].innerHTML,this.parentNode.childNodes[2].innerHTML,objeto);
            };
            nombreAlumno.onclick = function () {
                getAlumnoCompleteData(this.parentNode.childNodes[0].innerHTML,this.parentNode.childNodes[1].innerHTML,this.parentNode.childNodes[2].innerHTML,objeto);
            };
            apellidosAlumno.onclick = function () {
                getAlumnoCompleteData(this.parentNode.childNodes[0].innerHTML,this.parentNode.childNodes[1].innerHTML,this.parentNode.childNodes[2].innerHTML,objeto);
            };
        }
    }

    function printAlumnoData(array,objeto){
        $('#freeContent').empty().append('<div id="divNewAlumno">' +
            '<div>Datos del alumno COD ' + array[2]['Alumnos'] + '</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Nombre*</div><input id="newNombreAlumno" class="newAlumnoInput" type="text" value="'+array[0]+'"></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Apellidos*</div><input id="newApellidoAlumno" class="newAlumnoInput" type="text" value="'+array[1]+'"></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Clase</div><select id="newClaseAlumno" class="newAlumnoInput"></select></div>'+
            '</div>' +
            '<div id="divNewAlumno">' +
            '<div>Datos del Padre/Madre/Tutor</div>' +
            '<div class="condiciones">Los campos con "*" son obligatorios</div>' +
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">DNI*</div><input id="newDNIPadre" class="newAlumnoInput" type="text" value="'+array[2]['Usuario']+'"></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Nombre*</div><input id="newNombrePadre" class="newAlumnoInput" type="text" value="'+array[2]['Nombre']+'"></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Apellidos*</div><input id="newApellidoPadre" class="newAlumnoInput" type="text" value="'+array[2]['Apellidos']+'"></div>'+
            '<div class="divEachNewAlumno"><div class="newAlumnoLabel">Email*</div><input id="newEmailPadre" class="newAlumnoInput" type="text" value="'+array[2]['Mail'].toLowerCase()+'"></div>'+
            '<div id="addNewAlumnoButton" class="btn btn-primary">Modificar</div>' +
            '</div>');

        getArrayClases(document.getElementById('newClaseAlumno'),objeto);

        document.getElementById('addNewAlumnoButton').onclick = function(){
            modificarDatosAlumno(
                this.parentNode,
                document.getElementById('newNombreAlumno').value,
                document.getElementById('newApellidoAlumno').value,
                document.getElementById('newDNIPadre').value,
                document.getElementById('newNombrePadre').value,
                document.getElementById('newApellidoPadre').value,
                document.getElementById('newEmailPadre').value,
                document.getElementById('newClaseAlumno').value,
                array[2]['Alumnos']
            );
        }
    }

    function printHorarioclase(array,id,nombre) {
        $('#content #freeContent').empty().append('<div id="horarioContent" style="font-family: "Roboto", sans-serif;">' +
            '<div class="claseName" style="font-size: 25px;font-weight: bold;text-align: center;width: 100%;">'+nombre+'</div>' +
            '    <div class="filas dias">' +
            '        <div class="dia">Horario</div>' +
            '        <div class="dia">Lunes</div>' +
            '        <div class="dia">Martes</div>' +
            '        <div class="dia">Miercoles</div>' +
            '        <div class="dia">Jueves</div>' +
            '        <div class="dia">Viernes</div>' +
            '    </div>' +
            '    <div class="filas">' +
            '        <div class="horario"><div>8:30</div><div>9:20</div></div>' +
            '        <div id="11"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="21"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="31"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="41"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="51"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '    </div>' +
            '    <div class="filas">' +
            '        <div class="horario"><div>9:25</div><div>10:15</div></div>' +
            '        <div id="12"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="22"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="32"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="42"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="52"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '    </div>' +
            '    <div class="filas">' +
            '        <div class="horario"><div>10:20</div><div>11:10</div></div>' +
            '        <div id="13"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="23"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="33"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="43"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="53"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '    </div>' +
            '    <div class="filas">' +
            '        <div class="horario"><div>11:35</div><div>12:25</div></div>' +
            '        <div id="14"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="24"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="34"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="44"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="54"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '    </div>' +
            '    <div class="filas">' +
            '        <div class="horario"><div>12:30</div><div>13:20</div></div>' +
            '        <div id="15"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="25"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="35"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="45"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="55"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '    </div>' +
            '    <div class="filas">' +
            '        <div class="horario"><div>13:25</div><div>14:15</div></div>' +
            '        <div id="16"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="26"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="36"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="46"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '        <div id="56"><div class="asig">Click para añadir</div><div class="profe"></div></div>' +
            '    </div>' +
            '</div>');

        for(var x = 0 ; x < array.length ; x++){
            if(array[x][3] !== null) {
                $('#' + array[x][0] + array[x][1] + ' .asig').html(array[x][3]['Nombre']).attr('id', array[x][3]['ID_Asig']);
            }
            if(array[x][2] !== null) {
                $('#' + array[x][0] + array[x][1] + ' .profe').html(array[x][2]['Nombre']);
            }
        }

        $('#horarioContent .filas .asig').click(function(){
            getArrayAsignaturas(this,id);
        });

        $('#horarioContent .filas .profe').click(function(){
            getArrayFreeTeachers(this,id,this.parentNode.id.charAt(0),this.parentNode.id.charAt(1));
        });
    }

    function printAlumnosSinClase(array){
        if(document.getElementsByClassName('numError')[0].innerHTML !== '(0)') {
            $('#content #freeContent').empty().append('<div id="alumnosContent"><div class="divAlumno"><div class="divIdAlumno">ID</div><div class="divNombreAlumno">Nombre</div><div class="divApellidosAlumno">Apellidos</div><div class="divClasesAlumno">Clases</div></div></div>');
            for (var x = 0; x < array.length; x++) {
                $('#content #freeContent #alumnosContent').append('<div class="divAlumno">' +
                    '<div class="divIdAlumno">' + array[x]['ID_Alumno'] + '</div>' +
                    '<div class="divNombreAlumno">' + array[x]['Nombre'] + '</div>' +
                    '<div class="divApellidosAlumno">' + array[x]['Apellidos'] + '</div>' +
                    '<select id="divClasesAlumno" class="divClasesAlumno"><option value=""></option></select>' +
                    '</div>');
                getArrayClases(document.getElementsByClassName('divClasesAlumno')[x + 1]);
            }
            $('#content #freeContent #alumnosContent').append('<div id="changeClaseAlumnosSinClase" class="btn btn-primary">Continuar</div>');

            document.getElementById('changeClaseAlumnosSinClase').onclick = function () {
                var arraySelec = [];
                var arrayData = document.getElementsByClassName('divClasesAlumno');
                var arrayIdAlumnos = document.getElementsByClassName('divIdAlumno');
                for (var y = 1; y < arrayData.length; y++) {
                    if (arrayData[y].value !== "") {
                        var miniArray = [arrayIdAlumnos[y].innerHTML, arrayData[y].value];
                        arraySelec.push(miniArray);
                    }
                }
                addAlumnosToClass(arraySelec, this);
            }
        }else{
            $('#content #freeContent').empty().append('<div id="alumnosContent">NINGUN ERROR</div>');
        }
    }

    /***** FUNCION PARA PINTAR UN ALUMNOS CON SUS DATOS COMPLETOS *****/
    function getAlumnoCompleteData(id,nombre,apellidos,objeto){
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
                        printAlumnoData(JSON.parse(connection.responseText),objeto);
                    }
                }
            };
            connection.open("POST", "../administrador/getAlumnoCompleteData.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+id+"&nombre="+nombre+"&apellidos="+apellidos+"&clase="+objeto.innerHTML);
        }
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

    function deleteAlumno(id){
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
                        getArrayLista('clases');
                    }
                }
            };
            connection.open("POST", "../administrador/deleteAlumno.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+id);
        }
    }

    /***** FUNCION PARA MODIFICAR PROFESOR, LLAMA AL PHP QUE LO MODIFICA *****/
    function modificarClase(id,clase,tutorAsig,tutor,objeto){
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
                    getArrayLista('clases');
                }
            };
            connection.open("POST", "../administrador/modificarClase.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("id="+id+"&clase="+clase+"&tutorAsig="+tutorAsig+'&tutor='+tutor);
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

    function modificarAsignaturaHorario(idClase,id,dia,horario){
        var connection = null;

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4 && connection.status === 200) {
                }
            };
            connection.open("POST", "../administrador/modificarAsignaturaHorario.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("idClase="+idClase+"&id="+id+"&dia="+dia+"&hora="+horario);
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
                    getArrayLista('profesores');
                }
            };
            connection.open("POST", "../administrador/modificarProfesor.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("usu="+usu+"&nombre="+nombre+"&email="+email+"&tutoria="+tutoria+"&tutor="+tutor);
        }
    }

    function modificarProfesorHorario(idClase,dni,dia,hora){
        var connection = null;

        if (window.XMLHttpRequest) {
            connection = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            connection = ActiveXObject("Microsoft.XMLHTTP");
        }

        if (connection) {
            connection.onreadystatechange = function () {
                if (connection.readyState === 4 && connection.status === 200) {
                }
            };
            connection.open("POST", "../administrador/modificarProfesorHorario.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("idClase="+idClase+"&dni="+dni+"&dia="+dia+"&hora="+hora);
        }
    }

    /***** FUNCION PARA MODIFICAR DATOS DE ALUMNO-PADRE, LLAMA AL PHP QUE LO MODIFICA *****/
    function modificarDatosAlumno(objeto,nombreAlumno,apellidosAlumno,dniPadre,nombrePadre,apellidosPadre,emailPadre,id_clase,id_alumno){
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
                            divMsg.setAttribute('style','color:green !important');
                            msg = 'Modificación realizada con éxito';
                        }else if(connection.responseText === 'vacio'){
                            msg = 'Algún campo obligatorio está vacio, revíselo y vuelva a intentarlo';
                        }
                        divMsg.innerHTML = msg;
                    }
                }
            };
            connection.open("POST", "../administrador/modificarDatosAlumno.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("nombreA="+nombreAlumno+'&apellidosA='+apellidosAlumno+'&dni='+dniPadre+'&nombreP='+nombrePadre+'&apellidosP='+apellidosPadre+'&email='+emailPadre+'&id='+id_alumno+'&id_clase='+id_clase);
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
    document.getElementById('listaConflictos').onclick = function(){
        getArrayAlumnosSinClase();
    };

    /***** FUNCION ONCLICK PARA LOS BOTONES DE AÑADIR *****/
    document.getElementById('addAsignatura').onclick = printNewAsignatura;
    document.getElementById('addAlumno').onclick = getArrayClasesForPrintNewAlumno;
    document.getElementById('addProfesor').onclick = getArrayClasesForPrintNewProfesor;
    document.getElementById('addClase').onclick = printNewClase;

    /***** FUNCTION QUE SE EJECUTA AL INICIO TRAS EL LOGIN PARA QUE EN EL ADMINISTRADOR LO PRIMEROS QUE SE VEAN SON LAS CLASES PINTADAS *****/
    getArrayLista("clases");
});