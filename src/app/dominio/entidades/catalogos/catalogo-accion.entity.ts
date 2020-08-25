import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoAccionEntity {
    id: string,
    codigo: string,
    estado: CatalogoEstadoEntity, // CatalogoEstado
    nombre: string,
    fechaCreacion: Date,
    fechaActualizacion: Date
}