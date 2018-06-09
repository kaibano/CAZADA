
<?php
    include '../class/conexiones.php';

    $usu = $_POST['usu'];
    $nombre = $_POST['nombre'];
    $mail = $_POST['email'];
    $tutoria = $_POST['tutoria'];
    $tutor = $_POST['tutor'];

    $sql = "";
    $bbdd = new  Conexion();
    $conexion = $bbdd->conectar();
    if($tutoria === '0'){
        $sql = "UPDATE profesores SET Nombre = '$nombre', Mail = '$mail', Tutoria = NULL WHERE Usuario = '$usu'";
        $conexion->query("UPDATE clases SET Tutor = NULL WHERE Clase = '$tutor'");
    }else{
        $sql = "UPDATE profesores SET Nombre = '$nombre', Mail = '$mail', Tutoria = '$tutoria' WHERE Usuario = '$usu'";
        $conexion->query("UPDATE clases SET Tutor = NULL WHERE Clase = '$tutor'");
        $conexion->query("UPDATE clases SET Tutor = '$usu' WHERE ID_Clase = '$tutoria'");
    }
    $resultado = $conexion->query($sql);
    if($resultado) {
        echo "true";
    }else{
        echo "false";
    }