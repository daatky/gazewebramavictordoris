import { PerfilEntity, PerfilCrearCuentaEntity } from "./perfil.entity";
import { TransaccionEntity } from "./transaccion.entity";
import { SuscripcionEntity } from "./suscripcion.entity";
import { DispositivoEntity } from "./dispositivo.entity"
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { PagoFacturacion, CatalogoMetodoPagoEntity } from './catalogos/catalogo-metodo-pago.entity';

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
  responsableVerificado?: boolean,
  transacciones?: Array<TransaccionEntity>,
  suscripciones?: Array<SuscripcionEntity>,
  dispositivos?: Array<DispositivoEntity>
}

export class UsuarioEntityClass implements UsuarioEntity {
  email = '';
  contrasena = '';
  constructor() {

  }
}

export interface UsuarioCrearCuentaEntity {
  email?: string,
  fechaNacimiento?: Date,
  contrasena?: string,  
  aceptoTerminosCondiciones?: boolean,
  perfilGrupo?: boolean,
  menorEdad?: boolean,
  perfiles?: PerfilEntity[],
  emailResponsable?: string,
  metodoPago?: CatalogoMetodoPagoEntity,
  datosPago?: PagoFacturacion,
}

/*
{
  "email": "string",
  "password": "string",
  "fechaNacimiento": "2020-08-20T13:31:09.230Z",
  "aceptoTerminosCondiciones": true,
  "perfilGrupo": true,
  "menorEdad": true,
  "emailResponsable": "string",
  "catalogoIdioma": "IDI_1 español | IDI_2 ingles ",
  "perfil": [
    {
      "nombreContacto": "string",
      "nombre": "string",
      "tipoPerfil": "TIPERFIL_2 | TIPERFIL_1 ",
      "album": [
        {
          "nombre": "string",
          "tipoAlbum": "CATALB_1 | CATALB_2 ",
          "archivos": [
            {
              "idMedia": "string"
            }
          ],
          "portada": {
            "idMedia": "string"
          }
        }
      ],
      "telefono": [
        {
          "numero": "string"
        }
      ],
      "direccion": [
        {
          "latitud": 0,
          "longitud": 0,
          "descripcion": " | TIPERFIL_1 "
        }
      ],
      "codigoLocalidad": "LOC_745",
      "codigoPais": "PAI_31"
    }
  ],
  "metodoPago": "METPAG_1 | METPAG_2 "
}

*/