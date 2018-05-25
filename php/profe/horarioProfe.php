<?php
session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$clases = $con->horarioProfe($_SESSION['usuario']->usuario);
$horas = $con->getHoras();

$cont = 0;
foreach ($clases as $c){
    $nomClass = $con->getClaseNom($c['Clase']);
    $clases[$cont]['Clase'] = $nomClass;
    $cont++;
}

echo json_encode(array($clases,$horas));