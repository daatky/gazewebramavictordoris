import { CatalogoIdiomaEntity } from './../entidades/catalogos/catalogo-idioma.entity'
import { CatalogoEstadoEntity } from './../entidades/catalogos/catalogo-estado.entity'
import { PerfilModel, PerfilModelMapperService } from './perfil.model'
import { DispositivoEntity } from './../entidades/dispositivo.entity'
import { SuscripcionEntity } from './../entidades/suscripcion.entity'
import { TransaccionEntity } from './../entidades/transaccion.entity'
import { RolSistemaEntity } from '../entidades/rol-sistema.entity'
import { Injectable } from '@angular/core'
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface'
import { PerfilEntity, PerfilEntityMapperServicePerfil } from '../entidades/perfil.entity'
import { EstadoModelMapperService } from './catalogos/catalogo-estado.model'
import { UsuarioEntity } from '../entidades/usuario.entity'
import { CatalogoMetodoPagoModel, PagoFacturacionModel, CatalogoMetodoPagoModelMapperService, PagoFacturacionModelMapperService } from './catalogo-metodo-pago.model'
import { PagoFacturacionEntity } from '../entidades/catalogos/catalogo-metodo-pago.entity'
import { CatalogoIdiomaModel, IdiomaMapperService } from "../modelo/catalogos/catalogo-idioma.model"

export interface UsuarioModel {
    id?: string,
    email?: string,
    fechaNacimiento?: Date,
    contrasena?: string,
    idioma?: CatalogoIdiomaModel,
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
    rolSistema?: Array<RolSistemaEntity>,
    metodoPago?: CatalogoMetodoPagoModel,
    datosFacturacion?: PagoFacturacionModel,
}


@Injectable({ providedIn: 'root' })
export class UsuarioModelMapperService extends MapedorService<UsuarioModel, UsuarioEntity> {

    constructor
        (
            private perfilMapper: PerfilModelMapperService,
            private metodoPagoMapper: CatalogoMetodoPagoModelMapperService,
            private pagoMapper: PagoFacturacionModelMapperService,
            private idiomaMapper: IdiomaMapperService
        ) {
        super()
    }
    protected map(model: UsuarioModel): UsuarioEntity {
        if (model) {
            return {
                email: model.email,
                contrasena: model.contrasena,
                aceptoTerminosCondiciones: model.aceptoTerminosCondiciones,
                menorEdad: model.menorEdad,
                idioma: this.idiomaMapper.transform(model.idioma),
                perfilGrupo: model.perfilGrupo,
                emailResponsable: model.emailResponsable,
                nombreResponsable: model.nombreResponsable,
                perfiles: this.perfilMapper.transform(model.perfiles),
                metodoPago: this.metodoPagoMapper.transform(model.metodoPago),
                datosFacturacion: this.pagoMapper.transform(model.datosFacturacion),
            };
        }
        return null;
    }
}














