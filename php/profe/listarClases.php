<?php
session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$clasesNum = $con->clasesProfe($_SESSION['usuario']->usuario);;
$clases = array();

foreach ($clasesNum as $pos=>$c){
    array_push($clases, "$c##".$con->getClaseNom($c));
}

echo json_encode($clases);