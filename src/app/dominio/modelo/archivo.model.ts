import { CatalogoTipoMediaEntity } from './../entidades/catalogos/catalogo-tipo-media.entity';
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'

export interface ArchivoModel {
    _id?: string,
    estado?: CatalogoEstadoEntity,
    url?: string,
    tipo?: CatalogoTipoMediaEntity,
    peso?: number,
    relacionAspecto?: number,
    path?: string,
    catalogoArchivoDefault?: string
}