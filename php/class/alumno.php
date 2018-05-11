<?php

class alumno
{
    private $dni;
    private $nombre;
    private $apellidos;
    private $id_clase;
    private $id_centro;
    private $dni_padre;
    private $asignaturas;
    private $notas;

    /**
     * alumno constructor.
     * @param $dni
     * @param $nombre
     * @param $apellidos
     * @param $id_clase
     * @param $dni_padre
     * @param $asignaturas
     * @param $notas
     */
    public function __construct($dni, $nombre, $apellidos, $id_clase, $id_centro, $dni_padre, $asignaturas, $notas)
    {
        $this->dni = $dni;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->id_clase = $id_clase;
        $this->dni_padre = $dni_padre;
        $this->asignaturas = $asignaturas;
        $this->notas = $notas;
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
    public function getIdClase()
    {
        return $this->id_clase;
    }

    /**
     * @return mixed
     */
    public function getIdCentro()
    {
        return $this->id_centro;
    }

    /**
     * @return mixed
     */
    public function getDniPadre()
    {
        return $this->dni_padre;
    }

    /**
     * @return mixed
     */
    public function getAsignaturas()
    {
        return $this->asignaturas;
    }

    /**
     * @return mixed
     */
    public function getNotas()
    {
        return $this->notas;
    }

    /**
     * @return mixed
     */
    public function getNota($id_asig)
    {
        $pos = array_search($id_asig,$this->asignaturas);
        return array($this->notas[0][$pos],$this->notas[1][$pos],$this->notas[2][$pos]);
    }

    /**
     * @param mixed $notas
     */
    public function setNotas($notas)
    {
        $this->notas = $notas;
    }
}