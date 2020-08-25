import { AnchoLineaItem } from "../enums/ancho-linea-item.enum"
import { EspesorLineaItem } from "../enums/espesor-linea-item.enum"
import { ColorFondoLinea } from "../enums/color-fondo-linea.enum"

// Configuracion de la linea
export interface LineaCompartida {
    ancho:AnchoLineaItem,
    espesor:EspesorLineaItem,
    colorFondo:ColorFondoLinea,
    forzarAlFinal?:boolean, // Ubica la linea con posicion absoluta al final del elemento padre, tomar en cuenta que el padre debe tener position relative
}