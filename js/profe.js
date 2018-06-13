window.addEventListener("load", function () {
    idAsig = 0;
    
    //al inicio mostrará el horario
    listarHorario();
    
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
        var nombreAlum = $(this).attr('data-nombre');

        $('#freeContent #listaClase').hide();
        $('#freeContent').append('<div id="aux"></div>');
        var ventana_ancho = $(window).width();
        var h3Pos = $('#freeContent h3').position()
        var reference = h3Pos.top + 100;
        $('#freeContent').append("<div id='cajaNotas' style='top:" + reference + "px;left:"
                + ventana_ancho / 3 + "px'><span id='close' class='glyphicon glyphicon-remove-sign'></span><h4>" + nombreAlum + "</h4>"
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
                notasAlumno = [];
                var req2 = new XMLHttpRequest();
                req2.onreadystatechange = function () {
                    if (req2.readyState == 4 && req2.status == 200) {
                        var lista2 = JSON.parse(req2.responseText);
                        for (var i = 0; i < lista.length; i++) {
                            var nota1 = '-';
                            var nota2 = '-';
                            var nota3 = '-';
                            if (lista2[i][0]) {
                                nota1 = lista2[i][0]['Nota'];
                            }
                            if (lista2[i][1]) {
                                nota2 = lista2[i][1]['Nota'];
                            }
                            if (lista2[i][2]) {
                                nota3 = lista2[i][2]['Nota'];
                            }
                            $('<tr data-alumno="' + alumno + '" data-asig="' + lista[i][0] + '"><td><b>' + lista[i][1] + '</b></td>'
                                    + '<td><input class="' + i + '_nota1" type="text" maxlength="3" size="3" value="' + nota1 + '"/></td>'
                                    + '<td><input class="' + i + '_nota2" type="text" maxlength="3" size="3" value="' + nota2 + '"/></td>'
                                    + '<td><input class="' + i + '_nota3" type="text" maxlength="3" size="3" value="' + nota3 + '"/></td></tr>')
                                    .appendTo('#tablaNotas');
                            notasAlumno.push([alumno, clase, lista[i][0], nota1, nota2, nota3])
                        }
                        $("<div id='botonGuardar' class='btn btn-primary'>Guardar</div>").appendTo('#cajaNotas')
                                .click(function () {
                                    for (var i = 0; i < lista.length; i++) {
                                        notasAlumno[i][3] = $('.' + i + '_nota1').val();
                                        notasAlumno[i][4] = $('.' + i + '_nota2').val();
                                        notasAlumno[i][5] = $('.' + i + '_nota3').val();
                                    }
                                    var req3 = new XMLHttpRequest();
                                    req3.onreadystatechange = function () {
                                        if (req3.readyState == 4 && req3.status == 200) {
                                            if (req3.responseText) {
                                                $('#cajaNotas').remove()
                                                $('#aux').remove()
                                                $('#freeContent #listaClase').show();
                                            }
                                        }
                                    }
                                    req3.open("POST", "../profe/setNotasAlum.php");
                                    req3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                    req3.send("lista=" + JSON.stringify(notasAlumno));
                                })
                        var alturaCaja = $("#cajaNotas").height();
                        $("#aux").css('height', alturaCaja);
                    }
                }
                req2.open("POST", "../profe/getNotasAlum.php");
                req2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                req2.send("alum=" + alumno + "&asig=" + JSON.stringify(lista));
            }
        }
        req.open("POST", "../profe/getAsignaturasProfeClase.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send("clase=" + clase);
    }

    function gestionFaltas() {
        var alumno = $(this).attr('data-alumno');
        var clase = $(this).attr('data-clase');
        var nombreAlum = $(this).attr('data-nombre');

        $('#freeContent #listaClase').hide();
        $('#freeContent').append('<div id="aux"></div>');
        var ventana_ancho = $(window).width();
        var h3Pos = $('#freeContent h3').position()
        var reference = h3Pos.top + 100;
        $('#freeContent').append("<div id='cajaFaltas' style='top:" + reference + "px;left:"
                + ventana_ancho / 3 + "px'><span id='close' class='glyphicon glyphicon-remove-sign'></span><h4>" + nombreAlum + "</h4>"
                + "<div id='divFaltas'></div></div>");
        $('#close').click(function () {
            $('#cajaFaltas').remove()
            $('#aux').remove()
            $('#freeContent #listaClase').show();
        })
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var lista = JSON.parse(req.responseText);
                console.log(lista)
                var req2 = new XMLHttpRequest();
                req2.onreadystatechange = function () {
                    if (req2.readyState == 4 && req2.status == 200) {
                        var lista2 = JSON.parse(req2.responseText);
                        console.log(lista2);
                        var meses = [[], [], [], [], [], [], [], [], [], []];
                        var mes = ["SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
                            "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO"];
                        for (var i = 0; i < lista2.length; i++) {
                            var f = lista2[i]['Fecha'].split('-');
                            if (f[1] == '09') {
                                meses[0].push(lista2[i]);
                            } else if (f[1] == '10') {
                                meses[1].push(lista2[i]);
                            } else if (f[1] == '11') {
                                meses[2].push(lista2[i]);
                            } else if (f[1] == '12') {
                                meses[3].push(lista2[i]);
                            } else if (f[1] == '01') {
                                meses[4].push(lista2[i]);
                            } else if (f[1] == '02') {
                                meses[5].push(lista2[i]);
                            } else if (f[1] == '03') {
                                meses[6].push(lista2[i]);
                            } else if (f[1] == '04') {
                                meses[7].push(lista2[i]);
                            } else if (f[1] == '05') {
                                meses[8].push(lista2[i]);
                            } else if (f[1] == '06') {
                                meses[9].push(lista2[i]);
                            }
                        }
                        var tieneFaltas = false;
                        for (var i = 0; i < meses.length; i++) {
                            if (meses[i].length) {
                                tieneFaltas = true;
                                $('<div id="mes_' + i + '"></div>').appendTo($('#divFaltas'))
                                $('<div data-mes="' + i + '" class="meses">' + mes[i] + '</div>').appendTo($("#mes_" + i)).click(function () {
                                    verOculFaltas($(this).attr('data-mes'));
                                })
                                $("<table id='tablaFaltas_" + i + "' class='tablaFaltas'>"
                                        + "<tr><th>Asignatura</th><th>Hora</th>"
                                        + "<th>Fecha</th><td class='none'></td></tr>").appendTo($("#mes_" + i))
                                for (var x = 0; x < meses[i].length; x++) {
                                    for (var j = 0; j < lista.length; j++) {
                                        if (lista[j].indexOf(meses[i][x]['ID_Asig']) > -1) {
                                            var nomAsig = lista[j][1];
                                        }
                                    }
                                    var f = meses[i][x]['Fecha'].split('-');
                                    var fOr = f[2] + '/' + f[1] + '/' + f[0];
                                    var datosFalta = alumno + '_' + meses[i][x]['ID_Asig'] + '_' + meses[i][x]['Fecha'] + '_' + meses[i][x]['Hora'];
                                    $('<tr id="'+ datosFalta +'" class="faltaAlum"><td>' + nomAsig + '</td><td>' + meses[i][x]['Hora'] + 'ª hora</td>'
                                            + '<td>' + fOr + '</td><td><span data-falta="' + datosFalta + '" data-tabla="tablaFaltas_' + i +'" class="trash glyphicon glyphicon-trash"></span></td></tr>')
                                            .appendTo($("#tablaFaltas_" + i))
                                }
                                $('.trash').click(borrarFalta);
                            }
                        }
                        if (!tieneFaltas) {
                            $('<h2>Este/a alumno/a no cuenta con ninguna falta este curso</h2>').appendTo($('#divFaltas'))
                        }
                        var alturaCaja = $("#cajaFaltas").height();
                        $("#aux").css('height', alturaCaja);
                    }
                }
                req2.open("POST", "../profe/getFaltas.php");
                req2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                req2.send("alum=" + alumno + "&asig=" + JSON.stringify(lista));
            }
        }
        req.open("POST", "../profe/getAsignaturasProfeClase.php");
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send("clase=" + clase);

        function verOculFaltas(id) {
            var estado;
            if ($("#tablaFaltas_" + id).css('display') == 'none') {
                estado = 0;
            } else {
                estado = 1;
            }
            $(".tablaFaltas").hide();
            if (estado == 0) {
                $("#tablaFaltas_" + id).show()
            } else {
                $("#tablaFaltas_" + id).hide()
            }
            var alturaCaja = $("#cajaFaltas").height();
            $("#aux").css('height', alturaCaja);
        }

        function borrarFalta() {
            var data = $(this).attr('data-falta');
            var datosFalta = data.split('_');
            var alum = datosFalta[0];
            var asig = datosFalta[1];
            var fecha = datosFalta[2];
            var hora = datosFalta[3]
            
            var tabla = $(this).attr('data-tabla');
            
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    if (req.responseText){
                        $('#'+data).remove();
                        if (!$('#'+tabla).has('tr.faltaAlum').length){
                           $('#'+tabla).remove()                     
                        } 
                    }                   
                }
            }
            req.open("POST", "../profe/borrarFalta.php");
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send("alum=" + alum + "&asig=" + asig + "&fecha=" +fecha + "&hora=" + hora);
        }
    }

    function claseConcreta() {
        var claseNum = $(this).attr('id');
        var claseNom = $(this).attr('data-classNom');
        $('#freeContent').empty().append("<h3>" + claseNom + "</h3><br><table id='listaClase'><tr><th>Apellidos</th><th>Nombre</th><th>Notas</th><th>Faltas</th></tr></table></div>");

        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var lista = JSON.parse(req.responseText);
                for (var i = 0; i < lista.length; i++) {
                    $('#listaClase').append("<tr class='alumnos' data-alumno='" + lista[i]['ID_Alumno'] + "'><td>"
                            + lista[i]['Apellidos'] + "</td><td>" + lista[i]['Nombre']
                            + "</td><td><img class='btnNotas' data-clase='" + claseNum + "' data-alumno='" + lista[i]['ID_Alumno'] + "' data-nombre='" + lista[i]['Nombre'] + " " + lista[i]['Apellidos'] + "' src='../../img/grade.png'/></td>"
                            + "<td><img class='btnFaltas' data-clase='" + claseNum + "' data-alumno='" + lista[i]['ID_Alumno'] + "' data-nombre='" + lista[i]['Nombre'] + " " + lista[i]['Apellidos'] + "' src='../../img/falta.png'/></td></tr>");
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