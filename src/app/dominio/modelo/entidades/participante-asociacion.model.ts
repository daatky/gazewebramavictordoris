import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { PerfilModel } from "../perfil.model";
import { ConfiguracionEstiloModel } from "./configuracion-estilo.model";
import { RolEntidadModel } from "./rol-entidad.model";

export interface ParticipanteAsociacionModel {
    id?: string
    estado?: CatalogoEstadoModel
    fechaCreacion?: Date
    fechaActualizacion?: Date
    roles?: Array<RolEntidadModel> 
    invitadoPor?:ParticipanteAsociacionModel
    configuraciones?:Array<ConfiguracionEstiloModel>
    perfil?:PerfilModel
    sobrenombre?:string  
}