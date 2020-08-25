import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoPaisEntity } from "./catalogos/catalogo-pais.entity";

export interface TelefonoEntity {
    id: string,
    estado: CatalogoEstadoEntity, // CatogoEstado
    fechaCreacion: Date,
    fechaActualizacion: Date,
    numero: string,
    pais: CatalogoPaisEntity, // CatalogoPais
}