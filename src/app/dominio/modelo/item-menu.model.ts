import { RutasLocales } from 'src/app/rutas-locales.enum';

export interface ItemMenuModel {
    id: any,
    titulo: string,
    subtitulo?: string
    action?: Function,
    ruta?: RutasLocales
}

export interface ItemSubMenu {
    id: any,
    titulo: string,
    subtitulo?: string,
    menus?: ItemMenuModel[],
    mostrarDescripcion: boolean,
    ruta?: RutasLocales
}

