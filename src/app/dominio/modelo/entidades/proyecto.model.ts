import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { ParticipanteProyectoModel } from "./participanteProyecto.model";
import { PerfilModel } from "../perfil.model";
import { ComentarioModel } from "./comentario.model";
import { CatalogoTipoProyectoModel } from "../catalogos/catalogo-tipo-proyecto.model";
import { CatalogoLocalidadModel } from "../catalogo-localidad.model";
import { VotoProyectoModel } from "./voto-proyecto.model";
import { CatalogoIdiomaModel } from "../catalogos/catalogo-idioma.model";
import { EstrategiaModel } from "./estrategia.model";
import { CatalogoTipoMonedaModel } from "../catalogos/catalogo-tipo-moneda.model";

export interface ProyectoModel {
    id: string,
    estado: CatalogoEstadoModel,
    fechaCreacion: Date,
    fechaActualizacion: Date,
    totalVotos: number,
    actualizado: boolean,
    paticipantes: Array<ParticipanteProyectoModel>,
    recomendadoAdmin: boolean,
    valorEstimado: number,
    tipo: CatalogoTipoProyectoModel,
    perfil: PerfilModel,
    //adjuntos: Array<AlbumModel>,
    localidad: CatalogoLocalidadModel,
    votos: Array<VotoProyectoModel>,
    estrategia: EstrategiaModel,
    comentarios: Array<ComentarioModel>,
    moneda: CatalogoTipoMonedaModel,
    titulo:string
    tituloCorto:string
    descripcion: string
    tags:Array<string>
}