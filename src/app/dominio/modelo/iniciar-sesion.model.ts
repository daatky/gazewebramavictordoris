import { PerfilModel } from "./entidades/perfil.model";
import { TokenModel } from './token.model';
import { CatalogoTipoPerfilModel } from './catalogos/catalogo-tipo-perfil.model';
import { UsuarioModel } from './entidades/usuario.model';
export interface IniciarSesionModel extends TokenModel {
    usuario: UsuarioModel
    //perfiles?: PerfilModel[],
}