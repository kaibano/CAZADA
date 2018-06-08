window.addEventListener("load", function () {
    idAsig = 0;
    /***** FUNCION PARA EL RELOJ *****/
    function ActualizarHora() {
        var fecha = new Date();
        var segundos = fecha.getSeconds();
        var minutos = fecha.getMinutes();
        var horas = fecha.getHours();

        if (horas.toString().length === 1) {
            horas = "0" + horas.toString();
        }
        if (minutos.toString().length === 1) {
            minutos = "0" + minutos.toString();
        }
        if (segundos.toString().length === 1) {
            segundos = "0" + segundos.toString();
        }
        $('#pHoras').html(horas);
        $('#pMinutos').html(minutos);
        $('#pSegundos').html(segundos);
        if ($('.puntos').html() === '') {
            $('.puntos').html(':');
        }

    }

    /***** FUNCIONES DE LISTAR CLASES,PROFESORES Y ASIGNATURAS *****/
    function listaAhora() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                if (req.responseText == "NO") {
                    $('#freeContent').empty().append("<h3>Según el sistema, no consta que imparta ninguna clase en esta hora...</h3>");
                } else {
                    if ($('#listaAhora').length) {
                        $('#listaAhora').toggle();
                    } else {
                        var resul = JSON.parse(req.responseText);
                        var lista = resul[0];
                        var asig = resul[1];
                        var clase = resul[2];
                        idAsig = resul[3];
                        var faltas = resul[4];
                        $('#freeContent').empty().append("<div id='listaAhora'><h3>" + clase + " / " + asig + "</h3><br><table id='pasarListaTabla'><tr><th>Apellidos</th><th>Nombre</th><th>Falta</th></tr></table></div>");
                        for (var i = 0; i < lista.length; i++) {
                            var ausente = false;
                            for (var j = 0; j < faltas.length; j++) {
                                if (lista[i]['ID_Alumno'] == faltas[j][0]) {
                                    ausente = true;
                                }
                            }
                            if (ausente) {
                                $('#pasarListaTabla').append("<tr class='alumnos falta' data-alumno='" + lista[i]['ID_Alumno'] + "'><td>" + lista[i]['Apellidos'] + "</td><td>" + lista[i]['Nombre'] + "</td><td><input type='checkbox'  checked name='" + lista[i]['ID_Alumno'] + "'/></td></tr>");
                            } else {
                                $('#pasarListaTabla').append("<tr class='alumnos' data-alumno='" + lista[i]['ID_Alumno'] + "'><td>" + lista[i]['Apellidos'] + "</td><td>" + lista[i]['Nombre'] + "</td><td><input type='checkbox' name='" + lista[i]['ID_Alumno'] + "'/></td></tr>");
                            }

                        }
                        $("<div id='botonLista' class='btn btn-primary'>Confirmar</div>").click(procesarFaltas).appendTo('#listaAhora');

                        /***** FUNCTION ONCHANGE PARA LOS CHECKBOX DE LAS FALTAS *****/
                        $("input[type='checkbox']").change(ponerRojo);
                    }
                }
            }
        };
        req.open("GET", "../profe/listaAhora.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send();
    }

    function listarHorario() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                if ($('#miHorario').length) {
                    $('#miHorario').toggle();
                } else {
                    var clasesHoras = JSON.parse(req.responseText);
                    var clases = clasesHoras[0];
                    var horas = clasesHoras[1];
                    $('#freeContent').empty().append("<div id='miHorario'><h3>HORARIO</h3><table id='tablaHorario'><tr><td class='noBorde'></td>"
                            + "<th>LUNES</th><th>MARTES</th><th>MIERCOLES</th><th>JUEVES</th>"
                            + "<th>VIERNES</th></tr></table></div>");
                    for (var i = 0; i < horas.length; i++) {
                        $('#tablaHorario').append("<tr id='fila_" + i + "'><th class='thHora'>" + horas[i]['Start'] + " - " + horas[i]['End'] + "</th></tr>");
                        for (var j = 1; j <= 5; j++) {
                            $("#fila_" + i).append("<td id='" + j + "_" + i + "'></td>");
                        }
                    }
                    for (var i = 0; i < clases.length; i++) {
                        $("#" + clases[i]['Dia'] + "_" + clases[i]['Hora']).html("<span>" + clases[i]['Clase'] + "<span>")
                    }
                }
            }
        };
        req.open("GET", "../profe/horarioProfe.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send();
    }

    function listarNotas() {

    }

    function listarClases() {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                if ($('#misClases').length) {
                    $('#misClases').toggle();
                } else {
                    var clases = JSON.parse(req.responseText);
                    $('#freeContent').empty().append("<div id='misClases'><h3>MIS CLASES</h3></div>");
                    for (var i = 0; i < clases.length; i++) {
                        var datos = clases[i].split('##');
                        var classNum = datos[0];
                        var clase = datos[1];
                        $("<div id='" + classNum + "' data-classNom='" + clase + "' class='clasesProfe btn-primary'>" + clase + "</div>").click(claseConcreta).appendTo($('#misClases'));
                    }
                }
            }
        };
        req.open("GET", "../profe/listarClases.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send();
    }

    /***** FUNCIONES FALTAS *****/
    function ponerRojo() {
        $(this).parents('tr').toggleClass('falta');
    }

    function procesarFaltas() {
        var ausentes = [];
        var asistentes = [];
        $('tr.alumnos').each(function () {
            if ($(this).hasClass('falta')) {
                ausentes.push($(this).attr('data-alumno'));
            } else {
                asistentes.push($(this).attr('data-alumno'));
            }

        });
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                if (req.responseText) {
                    $('#listaAhora').remove();
                    $("<div id='faltasAc'>FALTAS ACTUALIZADAS</div>").hide().fadeIn(2000).fadeOut(3000).appendTo($('#freeContent'));
                    $(".listButton").addClass('cancel');
                    setTimeout(function () {
                        $(".listButton").removeClass('cancel');
                        $("#faltasAc").remove();
                    }, 5000);
                }
            }
        };
        req.open("POST", "../profe/ponerFalta.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send("asig=" + idAsig + "&ausentes=" + JSON.stringify(ausentes) + "&asistentes=" + JSON.stringify(asistentes));
    }


    /***** FUNCIONES CLASE *****/
    function gestionNotas() {
        var alumno = $(this).attr('data-alumno');
        var clase = $(this).attr('data-clase');

        $('#freeContent #listaClase').hide();
        $('#freeContent').append('<div id="aux"></div>');
        var ventana_ancho = $(window).width();
        var h3Pos = $('#freeContent h3').position()
        var reference = h3Pos.top + 100;
        $('#freeContent').append("<div id='cajaNotas' style='top:" + reference + "px;left:"
                + ventana_ancho / 3 + "px'><span id='close' class='glyphicon glyphicon-remove-sign'></span>"
                + "<table id='tablaNotas'><tr><th>Asignatura</th><th>1ª Evaluación</th>"
                + "<th>2ª Evaluación</th><th>3ª Evaluación</th></tr></table></div>");
        $('#close').click(function () {
            $('#cajaNotas').remove()
            $('#aux').remove()
            $('#freeContent #listaClase').show();
        })
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var lista = JSON.parse(req.responseText);
                var req2 = new XMLHttpRequest();
                req2.onreadystatechange = function () {
                    if (req2.readyState == 4 && req2.status == 200) {
                        var lista2 = JSON.parse(req2.responseText);
                        console.log(lista2)
                        for (var i = 0; i < lista.length; i++) {
                            $('<tr data-alumno="' + alumno + '" data-asig="' + lista[i][0] + '"><td><b>' + lista[i][1] + '</b></td>'
                                    + '<td><input type="text" size="3" value="' + lista2[i][0]['Nota'] + '"/></td>'
                                    + '<td><input type="text" size="3" value="' + lista2[i][1]['Nota'] + '"/>'
                                    + '</td><td><input type="text" size="3" value="' + lista2[i][2]['Nota'] + '"/></td></tr>')
                                    .appendTo('#tablaNotas');
                        }
                        $("<div id='botonGuardar' class='btn btn-primary'>Guardar</div>").appendTo('#cajaNotas')
                        /*.click(function(){
                         
                         })*/
                    }
                }
                req2.open("POST", "../profe/getNotasAlum.php");
                req2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                req2.send("alum=" + alumno + "&asig="+JSON.stringify(lista));
            }
        }
        req.open("POST", "../profe/getAsignaturasProfeClase.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send("clase=" + clase);
    }

    function gestionFaltas() {

    }

    function claseConcreta() {
        var claseNum = $(this).attr('id');
        var claseNom = $(this).attr('data-classNom');
        $('#freeContent').empty().append("<h3>" + claseNom + "</h3><br><table id='listaClase'><tr><th>Apellidos</th><th>Nombre</th><th>Notas</th><th>Faltas</th></tr></table></div>");

        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var lista = JSON.parse(req.responseText);
                console.log(lista)
                for (var i = 0; i < lista.length; i++) {
                    $('#listaClase').append("<tr class='alumnos' data-alumno='" + lista[i]['ID_Alumno'] + "'><td>"
                            + lista[i]['Apellidos'] + "</td><td>" + lista[i]['Nombre']
                            + "</td><td><img class='btnNotas' data-clase='" + claseNum + "' data-alumno='" + lista[i]['ID_Alumno'] + "' src='../../img/grade.png'/></td>"
                            + "<td><img class='btnFaltas' data-clase='" + claseNum + " data-alumno='" + lista[i]['ID_Alumno'] + " src='../../img/falta.png'/></td></tr>");
                }
                $(".btnNotas").click(gestionNotas);
                $(".btnFaltas").click(gestionFaltas);
            }
        }
        req.open("POST", "../profe/getClase.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send("clase=" + claseNum);
    }

    /***** FUNCTION ONLCICK PARA LOS BOTONES *****/
    $('#pasarLista').click(listaAhora);
    $('#listaNotas').click(listarNotas);
    $('#listaClases').click(listarClases);
    $('#horario').click(listarHorario);

    /***** FUNCTION PARA ACTUALIZAR LA HORA *****/
    setInterval(ActualizarHora, 1000);

});