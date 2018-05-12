<?php
    session_start();

    if(!isset($_SESSION{'usuario'})){
        header("Location: ../../index.php");
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="../../css/header-index.css">
    <link rel="stylesheet" type="text/css" href="../../css/admin.css">
    <link rel="stylesheet" type="text/css" href="../../bootstrap-3.3.7-dist/css/bootstrap.css">
    <script type="application/javascript" src="../../js/admin.js"></script>
    <script type="application/javascript" src="../../js/jquery-min.js"></script>
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
                <p><span>Panel</span><span>ADMINISTRADOR</span></p>
            </div>
            <a class="cerrarSesion" href="cerrarSesion.php">Cerrar sesión <span class="glyphicon glyphicon-off"></span></a>
        </div>
        <div id="content">
            <div id="addButtonsBar">
                <div>
                    <div id="listaClases" class="listButton"><span class="glyphicon glyphicon-th-list"></span>Clases</div>
                    <div id="listaProfesores" class="listButton"><span class="glyphicon glyphicon-th-list"></span>Profesores</div>
                    <div id="listaAsignaturas" class="listButton"><span class="glyphicon glyphicon-th-list"></span>Asignaturas</div>
                </div>
                <div>
                    <div id="addClase" class="addButton"><span class="glyphicon glyphicon-plus"></span>Clase</div>
                    <div id="addProfesor" class="addButton"><span class="glyphicon glyphicon-plus"></span>Profesor</div>
                    <div id="addAlumno" class="addButton"><span class="glyphicon glyphicon-plus"></span>Alumno</div>
                    <div id="addAsignatura" class="addButton"><span class="glyphicon glyphicon-plus"></span>Asignatura</div>
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