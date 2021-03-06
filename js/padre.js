window.addEventListener("load",function(){

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
                        if(lista === "faltas"){
                            pintarListaFalta(res);
                        }else{
                            pintarListaNota(res);
                        }
                    }
                }
            };
            connection.open("POST", "../padre/listar.php");
            connection.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            connection.send("lista="+lista);
        }
    }

    /***** FUNCIONES PARA PINTAR LAS LISTAS DE CLASES, PROFESORES Y ASIGNATURAS *****/
    function pintarListaFalta(arrayLista){
        $('#content #freeContent').empty().append('<div id="claseContent"><div class="divClase"><div class="divId">ID</div><div class="divAsignatura">Asignatura</div><div class="divFecha">Fecha</div><div class="divHora">Hora</div></div></div>');

        for(var x = 0 ; x < arrayLista.length ; x++){
            $('#content #freeContent #claseContent').append('<div class="divClase">' +
                '<div class="divId">'+arrayLista[x][0]+'</div>' +
                '<div class="divAsignatura">'+arrayLista[x][1]+'</div>' +
                '<div class="divFecha">'+arrayLista[x][2]+'</div>' +
                '<div class="divHora">'+arrayLista[x][3]+'</div>');
        }
    }

    function pintarListaNota(arrayLista) {
        $('#content #freeContent').empty().append('<table id="tablaNotas"><tr><th>Asignaturas</th><th>Primer Trimestre</th><th>Segundo Trimestre</th><th>Tercer Trimestre</th></tr></table>');

        for(var x = 0 ; x < arrayLista.length ; x++){
            $('#tablaNotas').append(
                '<tr><td>'+arrayLista[x][0]+'</td>' +
                '<td>'+arrayLista[x][1]+'</td>' +
                '<td>'+arrayLista[x][2]+'</td>' +
                '<td>'+arrayLista[x][3]+'</td></tr>');
        }
        
        
    }


    /*****FUNCION PARA MANDAR EMAIL *****/

    function getFormularioContacto() {
        $('#content #freeContent').empty().append('<form id="formContacto" method="POST" action="../padre/sendMail.php">' +
        ' <input type="text" id ="asunto" name="asunto" placeholder="Asunto"/><br>' +
        ' <textarea name="mensaje" cols="40" rows="5" placeholder="Mensaje"></textarea><br>' +
        ' <input type="submit" value="Enviar"/>' +
        ' </form>');
    }

    /***** FUNCTION ONLCICK PARA LOS BOTONES DE LISTAR *****/
    document.getElementById('listaFaltas').onclick = function(){
        getArrayLista("faltas");
    };
    document.getElementById('listaNotas').onclick = function(){
        getArrayLista("notas");
    };
    document.getElementById('contacto').onclick = function(){
        getFormularioContacto();
    };

    /***** FUNCTION QUE SE EJECUTA AL INICIO TRAS EL LOGIN PARA QUE EN EL ADMINISTRADOR LO PRIMEROS QUE SE VEAN SON LAS CLASES PINTADAS *****/
    getArrayLista("faltas");
});
