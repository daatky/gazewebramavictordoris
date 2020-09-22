import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { MediaModel, MediaModelMapperServicePerfil } from './entidades/media.model'
export interface PaginacionModel<T> {
    totalDatos?: number
    totalPaginas?: number
    proximaPagina?: boolean
    anteriorPagina?: boolean
    lista?: T[]
}

@Injectable({ providedIn: 'root' })
export class PaginacionMapper extends MapedorService<HttpResponse<any>, PaginacionModel<any>> {
    protected map(data: HttpResponse<any>): PaginacionModel<any> {
        return {
            proximaPagina: data.headers.get("proximaPagina") == "true",
            anteriorPagina: data.headers.get("anteriorPagina") == "true",
            totalDatos: +data.headers.get("totalDatos"),
            totalPaginas: +data.headers.get("totalPaginas"),
        };
    }
}