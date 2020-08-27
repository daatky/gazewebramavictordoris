import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'

export interface CatalogoPaisModel {
    id?: string
    codigo?: string
    estado?: CatalogoEstadoEntity
    nombre?: string
    codigoTelefono?: string
    codigoNombre?: string
}