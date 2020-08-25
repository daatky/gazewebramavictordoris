import { ConfiguracionEntity } from "./configuracion.entity";
import { RolEntity } from "./rol.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { PerfilEntity } from "./perfil.entity";

export interface ParticipanteAsociacionEntity {
    id: string
    estado: CatalogoEstadoEntity
    fechaCreacion: Date
    fechaActualizacion: Date
    roles: Array<RolEntity> 
    invitadoPor:ParticipanteAsociacionEntity
    configuraciones:Array<ConfiguracionEntity>
    perfil:PerfilEntity
    sobrenombre:string 
}