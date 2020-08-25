import { CatalogoEstadoEntity } from "./catalogo-estado.entity";

export interface CatalogoTipoAsociacionEntity {
    id: string
    estado: CatalogoEstadoEntity //CatalogoEstado
    fechaCreacion: Date
    fechaActualizacion: Date
    codigo: string
}