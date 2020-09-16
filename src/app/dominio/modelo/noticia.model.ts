import { CatalogoEstadoModel } from "./catalogos/catalogo-estado.model";
import { CatalogoLocalidadModel } from "./catalogos/catalogo-localidad.model";
import { PerfilModel } from "./entidades/perfil.model";
import { VotoNoticiaModel } from "./entidades/voto-noticia.model";
import { CatalogoIdiomaModel } from "./catalogos/catalogo-idioma.model";
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
export class NoticiaModelMapperResultadoBusqueda extends MapedorService<NoticiaModel, ItemResultadoBusqueda> {
    protected map(entity: NoticiaModel): ItemResultadoBusqueda {
        return {
            titulo: entity.tituloCorto,
            subtitulo: entity.titulo,
            tipo: CodigosCatalogoEntidad.PROYECTO
        };
    }
}