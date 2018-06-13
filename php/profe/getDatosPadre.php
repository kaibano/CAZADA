<?php

session_start();
require_once '../class/conexiones.php';
$con = new Conexion;

$alum = $_REQUEST['alum'];

$datosPadre= $con->getDatosPadre($alum);

echo json_encode($datosPadre);
