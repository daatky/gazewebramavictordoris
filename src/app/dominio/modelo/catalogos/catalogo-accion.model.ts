import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoAccionModel {
    id: string,
    codigo: string,
    estado: CatalogoEstadoModel, // CatalogoEstado
    nombre: string,
    fechaCreacion: Date,
    fechaActualizacion: Date
}