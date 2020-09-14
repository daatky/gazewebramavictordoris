import { MediaModel, MediaModelMapperServicePerfil } from './media.model'
export interface PaginacionModel<T> {
    totalDatos?:number
    totalPaginas?:number
    proximaPagina?:boolean
    anteriorPagina?:boolean
    lista?:T[]
}
