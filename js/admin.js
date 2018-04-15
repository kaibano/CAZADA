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
    function addAsignatura(asignatura){
        //FUNCION POR RESOLVER ALGUN ERROR. INSERTA LA ASIGNATURA PERO NO DEVUELVE EL VALOR ESPERADO PARA CONTINUAR
        var parametros = {"asignatura" : asignatura};
        $.ajax({
            data:  parametros, //datos que se envian a traves de ajax
            url:   '../administrador/addAsignaturas.php', //archivo que recibe la peticion
            type:  'post', //método de envio
            beforeSend: function () {
                $('#freeContent').html("Procesando, espere por favor...");
            },
            success:  function (response) { //una vez que el archivo recibe el request lo procesa y lo devuelve
                $("#resultado").html(response);
            },error: function (error) {
                $("#resultado").html(error);
            }
        });
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

    function pintarListaClase(arrayLista){
        $('#content #freeContent').empty().append('<div id="claseContent"><div class="divClase"><div class="divIdClase">ID</div><div class="divNombreClase">Nombre</div><div class="divTutorClase">Tutor</div><div class="divOpcionesClase">Opciones</div></div></div>');

        for(var x = 0 ; x < arrayLista.length ; x++){
            $('#content #freeContent #claseContent').append('<div class="divClase">' +
                '<div class="divIdClase">'+arrayLista[x]['ID_Clase']+'</div>' +
                '<div class="divNombreClase">'+arrayLista[x]['Clase']+'</div>' +
                '<div class="divTutorClase">'+arrayLista[x]['Tutor']+'</div>' +
                '<div class="divOpcionesClase"><img src="../../img/modificar.png"><img src="../../img/eliminar.png"></div></div>');
        }
    }

    function pintarListaProfesores(arrayLista) {
        $('#content #freeContent').empty().append('<div id="profesContent"><div class="divProfe"><div class="divUsuProfe">Usuario</div><div class="divNombreProfe">Nombre</div><div class="divApellidosProfe">Apellidos</div><div class="divMailProfe">Email</div><div class="divTutoriaProfe">Tutoria</div><div class="divClasesProfe">Clases</div><div class="divOpcionesProfe">Opciones</div></div></div>');

        for (var x = 0; x < arrayLista.length; x++) {
            $('#content #freeContent #profesContent').append('<div class="divProfe">' +
                '<div class="divUsuProfe">' + arrayLista[x]['Usuario'] + '</div>' +
                '<div class="divNombreProfe">' + arrayLista[x]['Nombre'] + '</div>' +
                '<div class="divApellidosProfe">' + arrayLista[x]['Apellidos'] + '</div>' +
                '<div class="divMailProfe">' + arrayLista[x]['Mail'] + '</div>' +
                '<div class="divTutoriaProfe">' + arrayLista[x]['Tutoria'] + '</div>' +
                '<div class="divClasesProfe">' + arrayLista[x]['Clases'] + '</div>' +
                '<div class="divOpcionesProfe"><img src="../../img/modificar.png"><img src="../../img/eliminar.png"></div></div>');
        }
    }

    function pintarListaAsignaturas(arrayLista) {
        $('#content #freeContent').empty().append('<div id="asignaturasContent"><div class="divAsignaturas"><div class="divIdAsignatura">ID</div><div class="divNombreAsignatura">Nombre</div><div class="divOpcionesAsignatura">Opciones</div></div></div>');
        for (var x = 0; x < arrayLista.length; x++) {
            $('#content #freeContent #asignaturasContent').append('<div class="divAsignaturas">' +
                '<div class="divIdAsignatura">'+arrayLista[x]['ID_Asig']+'</div>' +
                '<div class="divNombreAsignatura">'+arrayLista[x]['Nombre']+'</div>' +
                '<div class="divOpcionesAsignatura"><img src="../../img/modificar.png"><img src="../../img/eliminar.png"></div></div>');
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
});