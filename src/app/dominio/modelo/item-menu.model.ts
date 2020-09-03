import { RutasLocales } from 'src/app/rutas-locales.enum';
import { TipoMenu } from 'src/app/compartido/componentes/item-menu/item-menu.component'

export interface ItemMenuModel {
    id: any,
    titulo: string,
    subtitulo?: string
    action?: Function,
    ruta?: RutasLocales,
    tipo?: TipoMenu
}

export interface ItemSubMenu {
    id: any,
    titulo: string,
    subtitulo?: string,
    menus?: ItemMenuModel[],
    mostrarDescripcion: boolean,
    ruta?: RutasLocales
}

