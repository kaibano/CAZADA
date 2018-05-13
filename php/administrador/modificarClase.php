
<?php
    include '../class/conexiones.php';

    $id = $_POST['id'];
    $clase = $_POST['clase'];
    $tutorAsig = $_POST['tutorAsig'];
    $tutorAnterior = $_POST['tutor'];

    $bbdd = new Conexion();
    $conexion = $bbdd->conectar();

    /***** CONSIGO EL DNI DEL TUTOR *****/
    $res = $bbdd->consulta("SELECT Usuario FROM profesores WHERE Nombre = '$tutorAnterior'");
    $tutor = 'prueba';
    if(empty($res)){
        $tutor = "- -";
    }else{
        $tutor = $res[0]['Usuario'];
    }

    /***** COMPRUEBO SI EL NOMBRE DE LA CLASE YA EXISTE *****/
    $claseExiste = false;


    if($clase === ""){
        echo "vacio";
    }else if($claseExiste){
        echo "existe";
    }else{
        if($tutor === "- -"){
            if ($tutorAsig === '0') {
                $sql = "UPDATE clases SET Clase = '$clase' WHERE ID_Clase = '$id'";
                $sql2 = "";
                $sql3 = "";
            } else {
                $sql = "UPDATE clases SET Tutor = '$tutorAsig', Clase = '$clase' WHERE ID_Clase = '$id'";
                $sql2 = "UPDATE profesores SET Tutoria = '$id' WHERE Usuario = '$tutorAsig'";
                $sql3 = "";
            }
        }else {
            if ($tutorAsig === '0') {
                $sql = "UPDATE clases SET Tutor = NULL, Clase = '$clase' WHERE ID_Clase = '$id'";
                $sql2 = "UPDATE profesores SET Tutoria = NULL WHERE Usuario = '$tutor'";
                $sql3 = "";
            } else {
                $sql = "UPDATE clases SET Tutor = '$tutorAsig', Clase = '$clase' WHERE ID_Clase = '$id'";
                $sql2 = "UPDATE profesores SET Tutoria = '$id' WHERE Usuario = '$tutorAsig'";
                $sql3 = "UPDATE profesores SET Tutoria = NULL WHERE Usuario = '$tutor'";
            }
        }
    }
    $resultado = $conexion->query($sql);
    if($sql2 !== "") {
        $resultado2 = $conexion->query($sql2);
    }
    if($sql3 !== ""){
        $conexion->query($sql3);
    }
    if($resultado) {
        echo "true";
    }else{
        echo "false";
    }