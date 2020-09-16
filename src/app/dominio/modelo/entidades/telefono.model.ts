import { CatalogoPaisModel } from '../catalogos/catalogo-pais.model'
import { CatalogoEstadoEntity } from '../../entidades/catalogos/catalogo-estado.entity'

export interface TelefonoModel {
    id?: string,
    estado?: CatalogoEstadoEntity,
    numero?: string,
    pais?: CatalogoPaisModel
}