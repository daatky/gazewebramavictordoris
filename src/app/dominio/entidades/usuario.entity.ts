import { PerfilEntity, PerfilCrearCuentaEntity } from "./perfil.entity";
import { TransaccionEntity } from "./transaccion.entity";
import { SuscripcionEntity } from "./suscripcion.entity";
import { DispositivoEntity } from "./dispositivo.entity"
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { PagoFacturacionEntity, CatalogoMetodoPagoEntity } from './catalogos/catalogo-metodo-pago.entity';
import { RolSistemaEntity } from "./rol-sistema.entity";

export interface UsuarioEntity {
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
