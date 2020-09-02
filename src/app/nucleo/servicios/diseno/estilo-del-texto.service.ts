import { Injectable } from '@angular/core'
import { ConfiguracionTexto } from "src/app/compartido/diseno/modelos/texto.interface"
import { EstilosDelTexto } from 'src/app/compartido/diseno/enums/estilo-del-texto.enum'
import { TamanoDeTexto } from 'src/app/compartido/diseno/enums/tamano-letra.enum'
import { TamanoDeTextoConInterlineado } from 'src/app/compartido/diseno/enums/tamano-letra-con-interlineado.enum'
import { ColorDelTexto } from 'src/app/compartido/diseno/enums/color-del-texto.enum'
import { PaddingIzqDerDelTexto } from 'src/app/compartido/diseno/enums/padding-del-texto.enum'

/*
    Especificaiones generales,

    - Permite obtener la combinacion de estilos para un elemento de texto en base a la interfaz ConfiguracionTexto
    - El metodo obtenerEstilos, devuelve un json en base a los parametros de configuracion deseados
*/

@Injectable({ providedIn: 'root' })
export class EstiloDelTextoServicio {

    public colorDelTexto = ColorDelTexto
    public estilosDelTexto = EstilosDelTexto
    public tamanoDeTexto = TamanoDeTexto
    public tamanoDeTextoConInterlineado = TamanoDeTextoConInterlineado
    public paddingIzqDerDelTexto = PaddingIzqDerDelTexto

    constructor() {
    }

    // Devuelve un JSON de clases en base a la configuracion deseada
    obtenerEstilosTexto(configuracion:ConfiguracionTexto) {
        const clases = {}
        clases[configuracion.color.toString()] = true
        clases[configuracion.estiloTexto.toString()] = true
        clases['enMayusculas'] = configuracion.enMayusculas
        if (configuracion.tamano) {
            clases[configuracion.tamano.toString()] =  true
        }
        if (configuracion.tamanoConInterlineado) {
            clases[configuracion.tamanoConInterlineado.toString()] =  true
        }
        if (configuracion.paddingIzqDerDelTexto) {
            clases[configuracion.paddingIzqDerDelTexto.toString()] =  true
        }
        if (configuracion.enCapitalize) {
            clases['enCapitalize'] =  true
        }
        return clases
    }
}