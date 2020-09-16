import { CatalogoEstadoModel } from "./catalogos/catalogo-estado.model";
import { CatalogoLocalidadModel } from "./catalogo-localidad.model";
import { PerfilModel } from "./perfil.model";
import { VotoNoticiaModel } from "./entidades/voto-noticia.model";
import { Injectable } from "@angular/core";
import { MapedorService } from "../../nucleo/base/mapeador.interface";
import { ItemResultadoBusqueda } from "./item-resultado-busqueda";
import { CodigosCatalogoEntidad } from "../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum";

export interface NoticiaModel {
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    localidad?: CatalogoLocalidadModel
    autor?: string
    perfil?: PerfilModel
    votos?: Array<VotoNoticiaModel>
    totalVotos?: number
    tituloCorto?: string,
    titulo?: string,
    descripcion?: string,
    tags?: Array<string>,
}

@Injectable({ providedIn: 'root' })
export class NoticiaModelMapperResultadoBusqueda extends MapedorService<NoticiaModel, ItemResultadoBusqueda<NoticiaModel>> {
    protected map(model: NoticiaModel): ItemResultadoBusqueda<NoticiaModel> {
        return {
            titulo: model.tituloCorto,
            subtitulo: model.titulo,
            tipo: CodigosCatalogoEntidad.PROYECTO,
            item: model
        };
    }
}