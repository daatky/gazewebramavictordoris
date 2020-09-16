import { PerfilEntity, PerfilCrearCuentaEntity, PerfilEntityMapperServicePerfil } from "./perfil.entity";
import { TransaccionEntity } from "./transaccion.entity";
import { SuscripcionEntity } from "./suscripcion.entity";
import { DispositivoEntity } from "./dispositivo.entity"
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { PagoFacturacionEntity, CatalogoMetodoPagoEntity } from './catalogos/catalogo-metodo-pago.entity';
import { RolSistemaEntity } from "./rol-sistema.entity";
import { Injectable } from '@angular/core';
import { MapedorService } from 'src/app/nucleo/base/mapeador.interface';
import { UsuarioModel } from '../modelo/entidades/usuario.model';
import { PerfilModelMapperService } from '../modelo/entidades/perfil.model';
import { CatalogoMetodoPagoModelMapperService, PagoFacturacionModelMapperService } from '../modelo/catalogos/catalogo-metodo-pago.model';
import { IdiomaMapperService } from '../modelo/catalogos/catalogo-idioma.model';

export interface UsuarioEntity {
  _id?: string,
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
  perfiles?: Array<PerfilEntity>,
  emailResponsable?: string,
  nombreResponsable?: string
  responsableVerificado?: boolean,
  transacciones?: Array<TransaccionEntity>,
  suscripciones?: Array<SuscripcionEntity>,
  dispositivos?: Array<DispositivoEntity>,
  rolSistema?: Array<RolSistemaEntity>
  metodoPago?: CatalogoMetodoPagoEntity,
  datosFacturacion?: PagoFacturacionEntity,
}

@Injectable({ providedIn: 'root' })
export class UsuarioEntityMapperService extends MapedorService<UsuarioEntity, UsuarioModel> {

  constructor
    (
      private perfilMapper: PerfilEntityMapperServicePerfil,
  ) {
    super()
  }
  protected map(entity: UsuarioEntity): UsuarioModel {
    if (entity) {
      return {
        id: entity._id,
        email: entity.email,
        perfilGrupo: entity.perfilGrupo,
        perfiles: this.perfilMapper.transform(entity.perfiles),
      };
    }
    return null;
  }
}

