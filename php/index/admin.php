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
    <script type="application/javascript" src="../../js/admin.js"></script>
    <script type="application/javascript" src="../../js/jquery-min.js"></script>
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
            <a class="cerrarSesion" href="cerrarSesion.php">Cerrar sesión</a>
        </div>
        <div id="content">
            <div id="addButtonsBar">
                <div>
                    <div id="listaClases" class="listButton"><img src="../../img/lista.png">Clases</div>
                    <div id="listaProfesores" class="listButton"><img src="../../img/lista.png">Profesores</div>
                    <div id="listaAsignaturas" class="listButton"><img src="../../img/lista.png">Asignaturas</div>
                </div>
                <div>
                    <div id="addClase" class="addButton"><img src="../../img/plus.png">Clase</div>
                    <div id="addProfesor" class="addButton"><img src="../../img/plus.png">Profesor</div>
                    <div id="addAlumno" class="addButton"><img src="../../img/plus.png">Alumno</div>
                    <div id="addAsignatura" class="addButton"><img src="../../img/plus.png">Asignatura</div>
                </div>
            </div>
            <div id="freeContent">
                <div id="clasescargadas"><br><br>Aqui estarian las clases cargadas<br><br>
                    Este mensaje es un div manual que cargara las clases cuando la funcion listar clases este programada<br><br>
                    La idea es que cada uno de los botones que veis arriba elimine este div con la funcion eliminarDom que encontrareis en admin.js<br><br>
                    Tras eso, pintara o hara lo que tenga que hacer. En el caso de listar pues listara lo que se pida y en el caso de añadir<br>
                    pintara unos inputs para añadir lo que sea (vease el ejemplo ya programado para añadir asigantura).

                </div>
            </div>
        </div>
        <div id="footer">

        </div>
    </div>
</body>
</html>