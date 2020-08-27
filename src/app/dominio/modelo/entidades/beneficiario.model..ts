import { UsuarioModel } from "../usuario.model";
import { CatalogoTipoBeneficiarioModel } from "../catalogos/catalogo-tipo-beneficiario.model";
import { ProyectoModel } from "./proyecto.model";

export interface BeneficiarioModel{
    id:string,
    fechaCreacion:Date,
    fechaActualizacion:Date,
    tipo:CatalogoTipoBeneficiarioModel,
    usuario:UsuarioModel,
    proyecto:ProyectoModel 
}