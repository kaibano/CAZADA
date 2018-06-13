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
    <link rel="stylesheet" type="text/css" href="../../css/padre.css">
    <script type="application/javascript" src="../../js/padre.js"></script>
    <script type="application/javascript" src="../../js/jquery-min.js"></script>
    <link rel="stylesheet" type="text/css" href="../../bootstrap-3.3.7-dist/css/bootstrap.css">
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
            <p><span>Panel</span><span>MADRE/PADRE/TUTOR</span></p>
        </div>
        <a class="cerrarSesion" href="cerrarSesion.php">Cerrar sesión <span class="glyphicon glyphicon-off"></span></a>
    </div>
    <div id="content">

    </div>
    <div id="footer">

    </div>
</div>
</body>
</html>