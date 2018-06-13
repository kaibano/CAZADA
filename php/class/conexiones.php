<?php

class Conexion {

    private $conexion;
    private $resultado;

    function conectar() {
        $this->conexion = new mysqli("localhost", "root", "", "cazada");
        if ($this->conexion->connect_error) {
            die("Error de Conexion(.$this->conexion->connect_errno.).$this->conexion->connect_error");
        }
        return $this->conexion;
    }

    function desconectar() {
        $this->conexion->close();
    }

    function consulta($sql) {
        $array = array();
        $this->conectar();
        $this->resultado = $this->conexion->query($sql);
        while ($fila = $this->resultado->fetch_assoc()) {
            array_push($array, $fila);
        }
        $this->desconectar();
        return $array;
    }

    function login($usu, $pass) {
        $this->conectar();
        $resul = null;
        $this->resultado = $this->conexion->query("SELECT * FROM administradores where Usuario = '$usu' AND Password = '$pass'");
        if ($this->resultado->num_rows > 0) {
            $fila = $this->resultado->fetch_assoc();
            $usuario = new stdClass();
            $usuario->usuario = $usu;
            $usuario->mail = $fila['Mail'];
            $_SESSION['usuario'] = $usuario;
            $resul = 'admin';
        } else {
            $this->resultado = $this->conexion->query("SELECT * FROM profesores where Usuario = '$usu' AND Password = '$pass'");
            if ($this->resultado->num_rows > 0) {
                $fila = $this->resultado->fetch_assoc();
                $usuario = new stdClass();
                $usuario->usuario = $usu;
                $usuario->mail = $fila['Mail'];
                $usuario->nombre = $fila['Nombre'];
                $usuario->apellidos = $fila['Apellidos'];
                $_SESSION['usuario'] = $usuario;
                $resul = 'profe';
            } else {
                $this->resultado = $this->conexion->query("SELECT * FROM padres where Usuario = '$usu' AND Password = '$pass'");
                if ($this->resultado->num_rows > 0) {
                    $fila = $this->resultado->fetch_assoc();
                    $usuario = new stdClass();
                    $usuario->usuario = $usu;
                    $usuario->mail = $fila['Mail'];
                    $usuario->nombre = $fila['Nombre'];
                    $usuario->apellidos = $fila['Apellidos'];
                    $_SESSION['usuario'] = $usuario;
                    $resul = 'padre';
                } else {
                    $resul = 'mal';
                }
            }
        }
        $this->desconectar();
        return $resul;
    }

    //PROFE//
    function getHora($hora) {
        $this->conectar();
        $hour = 0;
        $this->resultado = $this->conexion->query("SELECT Hora FROM horas where Start = '$hora' OR "
                . "End = '$hora' OR (Start < '$hora' AND End > '$hora')");
        if ($this->resultado->num_rows > 0) {
            $fila = $this->resultado->fetch_array();
            $hour = $fila[0];
        }
        $this->desconectar();
        return $hour;
    }

    function listaAhora($dia, $hora) {
        $hour = $this->getHora($hora);
        $this->conectar();
        $this->resultado = $this->conexion->query("SELECT * FROM horarios where Dia = $dia AND Hora = $hour "
                . "AND Profesor = '" . $_SESSION['usuario']->usuario . "'");
        if ($this->resultado->num_rows > 0) {
            $fila = $this->resultado->fetch_assoc();
        } else {
            $fila = 0;
        }
        $this->desconectar();
        return $fila;
    }

    function getClase($id) {
        $this->conectar();
        $alum = array();
        $this->resultado = $this->conexion->query("SELECT * FROM alumnos where ID_Clase = $id order by Apellidos");
        if ($this->resultado->num_rows > 0) {
            while ($fila = $this->resultado->fetch_assoc()) {
                array_push($alum, $fila);
            }
        }
        $this->desconectar();
        return $alum;
    }

    function getClaseNom($id) {
        $this->conectar();
        $this->resultado = $this->conexion->query("SELECT Clase FROM clases where ID_Clase = $id");
        if ($this->resultado->num_rows > 0) {
            $fila = $this->resultado->fetch_array();
            $clase = $fila[0];
        }
        $this->desconectar();
        return $clase;
    }

    function getAsigNom($id) {
        $this->conectar();
        $this->resultado = $this->conexion->query("SELECT Nombre FROM asignaturas where ID_Asig = $id");
        if ($this->resultado->num_rows > 0) {
            $fila = $this->resultado->fetch_array();
            $asig = $fila[0];
        }
        $this->desconectar();
        return $asig;
    }

    function getFaltas($asig, $dia, $hora) {
        $this->conectar();
        $alum = array();
        $this->resultado = $this->conexion->query("SELECT ID_Alumno FROM faltas where ID_Asig = $asig "
                . "AND Fecha = '$dia' AND Hora = $hora");
        if ($this->resultado->num_rows > 0) {
            while ($fila = $this->resultado->fetch_array()) {
                array_push($alum, $fila);
            }
        }
        $this->desconectar();
        return $alum;
    }

    function ponerFaltas($ausentes, $asistentes, $asig, $hora) {
        $this->conectar();
        $ok = false;
        $ok2 = true;
        $hoy = getdate();
        $dia = "$hoy[year]-$hoy[mon]-$hoy[mday]";
        foreach ($ausentes as $a) {
            $this->resultado = $this->conexion->query("INSERT INTO faltas VALUES (" . (int) $a . ",$asig,now(),$hora)"
                    . "on duplicate key update ID_Alumno = " . (int) $a . ", ID_Asig = $asig, "
                    . "Fecha = now(), Hora = $hora");
            if ($this->resultado) {
                $ok = true;
            } else {
                $ok = false;
            }
        }
        foreach ($asistentes as $a) {
            $this->resultado = $this->conexion->query("DELETE FROM faltas "
                    . "WHERE ID_Alumno = " . (int) $a . " AND ID_Asig = $asig "
                    . " AND Fecha = '$dia' AND Hora = $hora");
            if (!$this->resultado) {
                $ok2 = false;
            }
        }
        $this->desconectar();
        if ($ok == $ok2) {
            $ok3 = true;
        } else {
            $ok3 = false;
        }
        return $ok3;
    }

    function horarioProfe($idProfe) {
        $this->conectar();
        $clases = array();
        $this->resultado = $this->conexion->query("SELECT * FROM horarios where Profesor= '$idProfe'");
        if ($this->resultado->num_rows > 0) {
            while ($fila = $this->resultado->fetch_assoc()) {
                array_push($clases, $fila);
            }
        }
        $this->desconectar();
        return $clases;
    }

    function getHoras() {
        $this->conectar();
        $horas = array();
        $this->resultado = $this->conexion->query("SELECT * FROM horas");
        if ($this->resultado->num_rows > 0) {
            while ($fila = $this->resultado->fetch_assoc()) {
                array_push($horas, $fila);
            }
        }
        $this->desconectar();
        return $horas;
    }

    function clasesProfe($idProfe) {
        $this->conectar();
        $clases = array();
        $this->resultado = $this->conexion->query("SELECT DISTINCT Clase FROM horarios where Profesor= '$idProfe'");
        if ($this->resultado->num_rows > 0) {
            while ($fila = $this->resultado->fetch_array()) {
                array_push($clases, $fila[0]);
            }
        }
        $this->desconectar();
        return $clases;
    }

    function getAsigProfeClase($clase) {
        $this->conectar();
        $asigs = array();
        $this->resultado = $this->conexion->query("SELECT DISTINCT Asignatura FROM horarios"
                . " where Profesor= '" . $_SESSION['usuario']->usuario . "'"
                . " AND Clase = $clase");
        if ($this->resultado->num_rows > 0) {
            while ($fila = $this->resultado->fetch_array()) {
                array_push($asigs, $fila[0]);
            }
        }
        $this->desconectar();
        return $asigs;
    }

    function leerNotas($alum, $asig) {
        $this->conectar();
        $notas = array();
        foreach ($asig as $a) {
            $not = array();
            $this->resultado = $this->conexion->query("SELECT * FROM notas"
                    . " where ID_Alumno = '$alum'"
                    . " AND ID_Asig = $a[0]");
            if ($this->resultado->num_rows > 0) {
                while ($fila = $this->resultado->fetch_assoc()) {
                    array_push($not, $fila);
                }
            }
            array_push($notas, $not);
        }
        $this->desconectar();
        return $notas;
    }

    function setNotas($lista) {
        $this->conectar();

        $this->resultado = $this->conexion->query("INSERT INTO notas VALUES ($lista[0],"
                . "$lista[1],$lista[2],1,'$lista[3]') on duplicate key update Nota = '$lista[3]'");
        $this->resultado = $this->conexion->query("INSERT INTO notas VALUES ($lista[0],"
                . "$lista[1],$lista[2],2,'$lista[4]') on duplicate key update Nota = '$lista[4]'");
        $this->resultado = $this->conexion->query("INSERT INTO notas VALUES ($lista[0],"
                . "$lista[1],$lista[2],3,'$lista[5]') on duplicate key update Nota = '$lista[5]'");
        $this->desconectar();
    }

    function getTotalFaltas($alum, $asig) {
        $this->conectar();
        $faltas = array();
        foreach ($asig as $a) {
            $this->resultado = $this->conexion->query("SELECT * FROM faltas"
                    . " where ID_Alumno = '$alum'"
                    . " AND ID_Asig = $a[0]");
            if ($this->resultado->num_rows > 0) {
                while ($fila = $this->resultado->fetch_assoc()) {
                    array_push($faltas, $fila);
                }
            }
        }
        $this->desconectar();
        return $faltas;
    }

    function borrarFalta($alum, $asig, $fecha, $hora) {
        $this->conectar();
        $this->resultado = $this->conexion->query("DELETE FROM faltas"
                . " where ID_Alumno = '$alum' AND ID_Asig = $asig AND Fecha = '$fecha' AND Hora = $hora");
        if ($this->resultado) {
            $ok = true;
        } else {
            $ok = false;
        }
        $this->desconectar();
        return $ok;
    }

    function getDatosPadre($alum) {
        $this->conectar();
        $datos = array();
        $this->resultado = $this->conexion->query("SELECT Padre FROM alumnos"
                . " where ID_Alumno = $alum");
        if ($this->resultado->num_rows > 0) {
            $fila = $this->resultado->fetch_array();
            $padre = $fila[0];
            $this->resultado = $this->conexion->query("SELECT * FROM padres"
                    . " where Usuario = '$padre'");
            if ($this->resultado->num_rows > 0) {
                $fila = $this->resultado->fetch_assoc();
                $datos = $fila;
            }
        }
        $this->desconectar();
        return $datos;
    }

}
