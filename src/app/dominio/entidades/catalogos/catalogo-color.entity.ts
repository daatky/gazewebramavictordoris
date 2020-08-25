import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoTipoColorEntity } from "./catalogo-tipo-color.entity"

export interface CatalogoColorEntity {
    id: string,
    codigo: string,
    estado: CatalogoEstadoEntity,
    tipo: CatalogoTipoColorEntity,
    fechaCreacion: Date,
    fechaActualizacion: Date
}