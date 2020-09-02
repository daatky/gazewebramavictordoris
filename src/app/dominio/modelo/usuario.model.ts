import { CatalogoIdiomaEntity } from './../entidades/catalogos/catalogo-idioma.entity'
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'
import { PerfilModel } from './perfil.model'
import { DispositivoEntity } from './../entidades/dispositivo.entity'
import { SuscripcionEntity } from './../entidades/suscripcion.entity'
import { TransaccionEntity } from './../entidades/transaccion.entity'
import { RolSistemaEntity } from '../entidades/rol-sistema.entity'

export interface UsuarioModel {
    id?: string,
    email?: string,
    fechaNacimiento?: Date,
    contrasena?: string,
    idioma?: CatalogoIdiomaEntity,
    fechaCreacion?: Date,
    fechaActualizacion?: Date,
    emailVerificado?: boolean,
    aceptoTerminosCondiciones?: boolean,
    estado?: CatalogoEstadoEntity,
    perfilGrupo?: boolean,
    menorEdad?: boolean,
    perfiles?: Array<PerfilModel>,
    emailResponsable?: string,
    nombreResponsable?: string,
    responsableVerificado?: boolean,
    transacciones?: Array<TransaccionEntity>,
    suscripciones?: Array<SuscripcionEntity>,
    dispositivos?: Array<DispositivoEntity>,
    rolSistema?:Array<RolSistemaEntity>
}









