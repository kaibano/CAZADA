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

    /***** FUNCIONES DE LISTAR CLASES,PROFESORES Y ASIGNATURAS *****/
    function listar(lista){
        var req;
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        } else if (window.ActiceXObject) {
            req = ActiveXObject("Microsoft.XMLHTTP");
        }
        req.onreadystatechange = function(){
            if (req.readyState == 4 && req.status == 200) {
                var listado = JSON.parse(req.responseText);
                eliminarDom(document.getElementById('freeContent').childNodes[1]);
                if (lista == 'clases'){
                    for (var i = 0; i < listado.length; i++){
                    $('#freeContent').append("<div data-id='"+listado['ID_Clase']+">"+listado['Clase']+"</div>")
                }
                }
                
            }
        }
        req.open("POST", "../administrador/listar.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send("lista=" + lista);
        
        
    }


    /***** FUNCTION ONLCICK PARA LOS BOTONES DE LISTAR *****/
    document.getElementById('listaClases').onclick = function(){
        listar('clases');
    }
    document.getElementById('listaProfesores').onclick = function(){
        listar('profesores');
    }
    document.getElementById('listaAsignaturas').onclick = function(){
        listar('asignaturas');
    }
});