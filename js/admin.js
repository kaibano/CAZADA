window.addEventListener("load",function(){
    /***** FUNCIONES GENERALES PARA ADMIN.JS *****/
    function eliminarDom(object){
        if(object){
            object.remove();
        }
    }

    /***** FUNCIONES DE PINTAR LOS FORMULARIOS PARA AÑADIR CLASES,PROFESORES,ALUMNOS Y ASIGNATURAS *****/
    function printNewAsignatura(){
        eliminarDom(document.getElementById('freeContent').childNodes[1]);
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
    function addAsignatura(asignatura)
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

    /***** FUNCIONES DE LISTAR CLASES,PROFESORES Y ASIGNATURAS *****/
    function listarClases(){

    }

    function listarProfesores(){

    }

    function listarAsignaturas(){

    }

    /***** FUNCTION ONLCICK PARA LOS BOTONES DE LISTAR *****/
    document.getElementById('listaClases').onclick = listarClases;
    document.getElementById('listaProfesores').onclick = listarProfesores;
    document.getElementById('listaAsignaturas').onclick = listarAsignaturas;
});