import { PerfilModel } from "../modelo/perfil.model";
import { TokenModel } from './token.model';
import { CatalogoTipoPerfilModel } from './catalogo-tipo-perfil.model';
import { UsuarioModel } from './usuario.model';
export interface IniciarSesionModel extends TokenModel {
    usuario: UsuarioModel
    //perfiles?: PerfilModel[],
}