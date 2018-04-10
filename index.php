<?php
    session_start();

    if(isset($_SESSION['usuario'])){
        print_r($_SESSION['type']);
    } else{
        header ("Location: php/login.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>



</body>
</html>
