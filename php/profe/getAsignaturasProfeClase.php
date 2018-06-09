<?php
session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$clase = $_REQUEST['clase'];

$asignaturas = $con->getAsigProfeClase($clase);
$cont = 0;
foreach ($asignaturas as $a){
    $asigNom = $con->getAsigNom($a);
    $asignaturas[$cont] = array ($a, $asigNom);
    $cont++;    
}

echo json_encode($asignaturas);


