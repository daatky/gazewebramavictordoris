import { PerfilModel } from "../modelo/perfil.model";
export interface IniciarSesionModel {
    perfil: PerfilModel[],
    tokenAccess: string,
    tokenRefresh: string
}