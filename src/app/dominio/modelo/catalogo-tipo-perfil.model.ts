import { PerfilModel } from "./perfil.model"

export interface CatalogoTipoPerfilModel {
    codigo: string,
    nombre: string,
    descripcion?: string
    mostrarDescripcion?: boolean
    perfil?: PerfilModel
}


