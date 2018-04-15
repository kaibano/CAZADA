<?php
    require_once '../class/conexiones.php';
    
    $con  = new conexion;
    
    $tabla= $_REQUEST['lista'];
    
    $lista = $con->consultaLista($tabla);
    
    return json_encode($lista);
