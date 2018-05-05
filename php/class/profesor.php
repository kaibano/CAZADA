<?php

class profesor
{
    private $dni;
    private $nombre;
    private $apellidos;
    private $tutoria;
    private $clases;
    private $mail;

    /**
     * profesor constructor.
     * @param $dni
     * @param $nombre
     * @param $apellidos
     * @param $tutoria
     * @param $clases
     * @param $mail
     */
    public function __construct($dni, $nombre, $apellidos, $tutoria, $clases, $mail)
    {
        $this->dni = $dni;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->tutoria = $tutoria;
        $this->clases = $clases;
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
    public function getTutoria()
    {
        return $this->tutoria;
    }

    /**
     * @return mixed
     */
    public function getClases()
    {
        return $this->clases;
    }

    /**
     * @return mixed
     */
    public function getMail()
    {
        return $this->mail;
    }


}