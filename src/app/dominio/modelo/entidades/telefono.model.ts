import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { CatalogoPaisModel } from "../catalogo-pais.model";

export interface TelefonoModel {
    id: string,
    estado: CatalogoEstadoModel, // CatogoEstado
    fechaCreacion: Date,
    fechaActualizacion: Date,
    numero: string,
    pais: CatalogoPaisModel, // CatalogoPais
}