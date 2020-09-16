import { MediaModel, MediaModelMapperServicePerfil } from './entidades/media.model'
export interface PaginacionModel<T> {
    totalDatos?:number
    totalPaginas?:number
    proximaPagina?:boolean
    anteriorPagina?:boolean
    lista?:T[]
}
