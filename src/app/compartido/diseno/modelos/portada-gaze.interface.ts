import { TamanoPortadaGaze } from "../enums/tamano-portada-gaze.enum"

export interface PortadaGazeCompartido {
    tamano:TamanoPortadaGaze,
    espacioDerecha?:boolean
}