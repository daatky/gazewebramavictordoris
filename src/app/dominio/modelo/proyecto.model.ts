import { CatalogoEstadoModel } from "./catalogos/catalogo-estado.model";
import { ParticipanteProyectoModel } from "./entidades/participante-proyecto.model";
import { PerfilModel } from "./perfil.model";
import { ComentarioModel } from "./entidades/comentario.model";
import { CatalogoTipoProyectoModel } from "./catalogos/catalogo-tipo-proyecto.model";
import { CatalogoLocalidadModel } from "./catalogo-localidad.model";
import { VotoProyectoModel } from "./entidades/voto-proyecto.model";
import { CatalogoIdiomaModel } from "./catalogos/catalogo-idioma.model";
import { EstrategiaModel } from "./entidades/estrategia.model";
import { CatalogoTipoMonedaModel } from "./catalogos/catalogo-tipo-moneda.model";
import { AlbumModel } from "./album.model";
import { Injectable } from "@angular/core";
import { MapedorService } from "../../nucleo/base/mapeador.interface";
import { ItemResultadoBusqueda } from "./item-resultado-busqueda";
import { CodigosCatalogoEntidad } from "../../nucleo/servicios/remotos/codigos-catalogos/catalogo-entidad.enum";

export interface ProyectoModel {
    id?: string,
    estado?: CatalogoEstadoModel,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    totalVotos?: number,
    actualizado?: boolean,
    paticipantes?: Array<ParticipanteProyectoModel>,
    recomendadoAdmin?: boolean,
    valorEstimado?: number,
    tipo?: CatalogoTipoProyectoModel,
    perfil?: PerfilModel,
    adjuntos?: Array<AlbumModel>,
    localidad?: CatalogoLocalidadModel,
    votos?: Array<VotoProyectoModel>,
    estrategia?: EstrategiaModel,
    comentarios?: Array<ComentarioModel>,
    moneda?: CatalogoTipoMonedaModel
    titulo?: string
    tituloCorto?: string
    descripcion?: string
    tags?: Array<string>
}

@Injectable({ providedIn: 'root' })
export class ProyectoModelMapperResultadoBusqueda extends MapedorService<ProyectoModel, ItemResultadoBusqueda<ProyectoModel>> {
    protected map(model: ProyectoModel): ItemResultadoBusqueda<ProyectoModel> {
        return {
            titulo: model.tituloCorto,
            subtitulo: model.titulo,
            tipo: CodigosCatalogoEntidad.PROYECTO,
            item: model
        };
    }
}