<?php
    session_start();

    if(!isset($_SESSION{'usuario'})){
        header("Location: ../../index.php");
    }
    print_r($_SESSION['usuario']);

    echo $_SESSION['usuario']->mail;

    

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="../../css/header-index.css">
    <link rel="stylesheet" type="text/css" href="../../css/padre.css">
    <script type="application/javascript" src="../../js/padre.js"></script>
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
            <p><span>Panel</span><span>MADRE/PADRE/TUTOR</span></p>
        </div>
        <a class="cerrarSesion" href="cerrarSesion.php">Cerrar sesión</a>
    </div>
    <div id="content">
        <div id="addButtonsBar">
            <div>
                <div id="listaFaltas" class="listButton"><img src="../../img/lista.png">Faltas</div>
                <div id="listaNotas" class="listButton"><img src="../../img/lista.png">Notas</div>
                <div id="contacto" class="listButton"><img src="../../img/lista.png">Contacto</div>
            </div>
        </div>
        <div id="freeContent">
            

        </div>
        <div id="footer">

        </div>
</div>
</body>
</html>