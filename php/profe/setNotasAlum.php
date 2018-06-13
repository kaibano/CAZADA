<?php
session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$lista = json_decode($_REQUEST['lista']);

foreach($lista as $asig){
   $con->setNotas($asig);
}

echo 'ok';
