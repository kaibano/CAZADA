<?php
session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$alum = $_REQUEST['alum'];
$asig = json_decode($_REQUEST['asig']);

$notas = $con->leerNotas($alum,$asig);

echo json_encode($notas);