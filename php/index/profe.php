<?php
session_start();

if (!isset($_SESSION{'usuario'})) {
    header("Location: ../../index.php");
}
$dias = array('Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado');
$meses = array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
        
$hoy = getdate();
$diaSem = $hoy['wday'];
$diaSem = $dias[$diaSem];
$dia = $hoy['mday'];
$mes = $hoy['mon'];
$mes = $meses[$mes-1];
$anno = $hoy['year'];
$fecha = "$diaSem,<br> $dia de $mes de $anno";
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <link rel="stylesheet" type="text/css" href="../../css/header-index.css">
        <link rel="stylesheet" type="text/css" href="../../css/profe.css">
        <link rel="stylesheet" type="text/css" href="../../bootstrap-3.3.7-dist/css/bootstrap.css">
        <script type="application/javascript" src="../../js/jquery-min.js"></script>
        <script type="application/javascript" src="../../js/profe.js"></script>
        <script type="application/javascript" src="../../bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    </head>
    <body>
        <div id="main">
            <div id="header">
                <a href="../../index.php">
                    <div class="divlogo">
                        <img src="../../img/logo-cazada.png">
                    </div>
                    <div class="divlogoname">
                        <span>CAZADA</span><span>Gestor escolar</span>
                    </div>
                </a>
                <div class="typepanel">
                    <p><span>Panel profesor:</span><span><?php echo $_SESSION['usuario']->nombre; ?></span></p>
                </div>
                <a class="cerrarSesion" href="cerrarSesion.php">Cerrar sesión <span class="glyphicon glyphicon-off"></span></a>
            </div>
            <div id="ahora">
                <div id="hoy">
                    <?php echo $fecha?>
                </div>
                <div id="hora">
                    <span id="pHoras"></span>
                    <span class="puntos"></span>
                    <span id="pMinutos"></span>
                    <span class="puntos"></span>
                    <span id="pSegundos"></span>
                </div>
            </div>
            <div id="content">
                <div id="addButtonsBar">
                    <div>
                        <div id="pasarLista" class="listButton"><img src="../../img/check.png">Pasar lista</div>
                        <div id="listaClases" class="listButton"><img src="../../img/lista.png">Mis clases</div>
                        <div id="horario" class="listButton"><img src="../../img/calendar.png">Mi horario</div>                      
                    </div>
                </div>
                <div id="freeContent">

                </div>
            </div>
            <div id="footer">

            </div>
        </div>
    </body>
</html>