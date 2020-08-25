import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoEstiloEntity {
    id: string,
    codigo: string,
    estado: CatalogoEstadoEntity,
    nombre: string,
    descripcion: string,
    fechaCreacion: Date,
    fechaActualizacion: Date
}