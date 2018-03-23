<?php

class clase
{
    private $id_clase;
    private $turno;
    private $alumnos;
    private $profesores;
    private $id_tutor;

    /**
     * clase constructor.
     * @param $id_clase
     * @param $turno
     * @param $alumnos
     * @param $profesores
     * @param $id_tutor
     */
    public function __construct($id_clase, $turno, $alumnos, $profesores, $id_tutor)
    {
        $this->id_clase = $id_clase;
        $this->turno = $turno;
        $this->alumnos = $alumnos;
        $this->profesores = $profesores;
        $this->id_tutor = $id_tutor;
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
    public function getTurno()
    {
        return $this->turno;
    }

    /**
     * @return mixed
     */
    public function getAlumnos()
    {
        return $this->alumnos;
    }

    /**
     * @return mixed
     */
    public function getProfesores()
    {
        return $this->profesores;
    }

    /**
     * @return mixed
     */
    public function getIdTutor()
    {
        return $this->id_tutor;
    }
}