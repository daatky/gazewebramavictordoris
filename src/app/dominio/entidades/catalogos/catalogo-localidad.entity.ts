import { CatalogoEstadoEntity } from "./catalogo-estado.entity";
import { CatalogoPaisEntity } from "./catalogo-pais.entity";
import { CatalogoIdiomaEntity } from "./catalogo-idioma.entity";

export interface CatalogoLocalidadEntity {
    id?: string
    estado?: CatalogoEstadoEntity
    fechaCreacion?: Date
    fechaActualizacion?: Date
    codigo: string
    codigoPostal: string
    pais: CatalogoPaisEntity
    nombre: string
}