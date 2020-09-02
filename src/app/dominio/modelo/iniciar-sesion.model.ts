import { PerfilModel } from "../modelo/perfil.model";
import { TokenModel } from './token.model';
import { CatalogoTipoPerfilModel } from './catalogo-tipo-perfil.model';
export interface IniciarSesionModel extends TokenModel {
    perfil?: CatalogoTipoPerfilModel[],
}