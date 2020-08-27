import { ArchivoModel } from './archivo.model'
import { CatalogoMediaEntity } from './../entidades/catalogos/catalogo-media.entity'
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'

export interface MediaModel {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    tipo?: CatalogoMediaEntity,
    principal?: ArchivoModel,
    miniatura?: ArchivoModel,
    enlace?: string,
    descripcion?: string,
}