import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoEstiloModel } from "../catalogos/catalogo-estilo.model";
import { CatalogoColorModel } from "../catalogos/catalogo-color.model";

export interface EstiloModel {
    id: string
    estado: CatalogoEstadoModel //CatalogoEstado
    fechaCreacion: Date
    fechaActualizacion: Date
    codigo: string
    //media: MediaModel
    color: CatalogoColorModel
    tipo: CatalogoEstiloModel

}

