<?php

class padre
{
    private $dni;
    private $nombre;
    private $apellidos;
    private $dni_alumno;
    private $mail;

    /**
     * padre constructor.
     * @param $dni
     * @param $nombre
     * @param $apellidos
     * @param $dni_alumno
     * @param $mail
     */
    public function __construct($dni, $nombre, $apellidos, $dni_alumno, $mail)
    {
        $this->dni = $dni;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->dni_alumno = $dni_alumno;
        $this->mail = $mail;
    }

    /**
     * @return mixed
     */
    public function getDni()
    {
        return $this->dni;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @return mixed
     */
    public function getApellidos()
    {
        return $this->apellidos;
    }

    /**
     * @return mixed
     */
    public function getDniAlumno()
    {
        return $this->dni_alumno;
    }

    /**
     * @return mixed
     */
    public function getMail()
    {
        return $this->mail;
    }
}