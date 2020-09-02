import { CatalogoEstadoModel } from "./catalogo-estado.model";
import { CatalogoTipoColorModel } from "./catalogo-tipo-color.model";

export interface CatalogoColorModel {
    id?: string,
    codigo?: string,
    estado?: CatalogoEstadoModel,
    tipo?: CatalogoTipoColorModel,
    fechaCreacion?: Date,
    fechaActualizacion?: Date
}