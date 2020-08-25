import { ProyectoEntity } from "./proyecto.entity";
import { CatalogoTipoBeneficiarioEntity } from "./catalogos/catalogo-tipo-beneficiario.entity";
import { UsuarioEntity } from './usuario.entity'

export interface BeneficiarioEntity{
    id:string,
    fechaCreacion:Date,
    fechaActualizacion:Date,
    tipo:CatalogoTipoBeneficiarioEntity,
    usuario:UsuarioEntity,
    proyecto:ProyectoEntity 
}