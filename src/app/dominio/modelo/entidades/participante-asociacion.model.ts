import { CatalogoEstadoModel } from "../catalogos/catalogo-estado.model";
import { RolModel } from "./rol.model";
import { ConfiguracionModel } from "./configuracion.model";
import { PerfilModel } from "../perfil.model";

export interface ParticipanteAsociacionModel {
    id: string
    estado: CatalogoEstadoModel
    fechaCreacion: Date
    fechaActualizacion: Date
    roles: Array<RolModel> 
    invitadoPor:ParticipanteAsociacionModel
    configuraciones:Array<ConfiguracionModel>
    perfil:PerfilModel
    sobrenombre:string 
}