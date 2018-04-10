<?php
    session_start();

    if(isset($_SESSION['usuario'])){
        header("Location: ../index.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" type="text/css" href="../css/login.css">
    <script type="javascript" src="../js/login.js"></script>
</head>
<body>
    <div class="login-page">
        <div class="form">
            <form class="login-form" method="post" action="checkUser.php">
                <input type="text" placeholder="username" name="user"/>
                <input type="password" placeholder="password" name="pass"/>
                <button>login</button>
            </form>
        </div>
    </div>
</body>
</html>
