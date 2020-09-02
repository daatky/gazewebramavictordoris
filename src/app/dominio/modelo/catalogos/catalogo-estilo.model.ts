import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoEstiloModel {
    id?: string,
    codigo?: string,
    estado?: CatalogoEstadoModel,
    nombre?: string,
    descripcion?: string,
    fechaCreacion?: Date,
    fechaActualizacion?: Date
}