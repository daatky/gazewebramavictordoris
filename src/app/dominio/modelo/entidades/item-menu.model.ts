import { RutasLocales } from 'src/app/rutas-locales.enum';
import { TipoMenu } from 'src/app/compartido/componentes/item-menu/item-menu.component'

export interface ItemMenuModel {
    id: any,
    titulo: string[] | ItemAccion[],
    action?: Function,
    ruta?: RutasLocales,
    tipo?: TipoMenu
}

export interface ItemSubMenu {
    id: any,
    titulo: string,
    menusInternos?: ItemMenuModel[],
    mostrarDescripcion: boolean,
}


export interface ItemAccion {
    nombre: string,
    accion: Function,
    codigo: "g" | "m" | "p"
}

