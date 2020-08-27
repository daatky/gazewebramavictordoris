import { CatalogoLocalidadModel } from './catalogo-localidad.model'
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'

export interface DireccionModel {
    id?: string
    estado?: CatalogoEstadoEntity
    latitud?: number
    longitud?: number
    descripcion?: string
    localidad?: CatalogoLocalidadModel
}