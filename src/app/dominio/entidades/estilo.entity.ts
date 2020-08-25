import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { MediaEntity } from "./media.entity";
import { CatalogoColorEntity } from "./catalogos/catalogo-color.entity";
import { CatalogoEstiloEntity } from "./catalogos/catalogo-estilo.entity";

export interface EstiloEntity {
    id: string
    estado: CatalogoEstadoEntity //CatalogoEstado
    fechaCreacion: Date
    fechaActualizacion: Date
    codigo: string
    media: MediaEntity
    color: CatalogoColorEntity 
    tipo: CatalogoEstiloEntity 

}

