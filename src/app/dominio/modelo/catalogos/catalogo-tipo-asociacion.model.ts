import { CatalogoEstadoModel } from "./catalogo-estado.model";

export interface CatalogoTipoAsociacionModel {
    id?: string
    estado?: CatalogoEstadoModel //CatalogoEstado
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo?: string
}