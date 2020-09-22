import { ItemCircularCompartido, ItemRectangularCompartido } from './../../../compartido/diseno/modelos/item-cir-rec.interface';
import { ColorCapaOpacidadItem } from './../../../compartido/diseno/enums/item-cir-rec-capa-opacidad.enum';
import { Injectable } from '@angular/core'
import { EventoTapPersonalizado } from '../generales/detector-gestos.service'
import { UsoItemCircular, UsoItemRectangular } from './../../../compartido/diseno/enums/uso-item-cir-rec.enum'
import { ItemMetodosCompartidosInterface } from '../../../compartido/diseno/modelos/item-cir-rec-metodos.interface'
import { CapaOpacidad } from 'src/app/compartido/diseno/modelos/item-cir-rec.interface';

// Implementa los metodos comunes entre los items para ser usados en el componente como tal
@Injectable({ providedIn: 'root' })
export class ItemCircularRectangularMetodosCompartidos implements ItemMetodosCompartidosInterface {

    private gestorEventosTap:EventoTapPersonalizado

    constructor() {
        this.gestorEventosTap = new EventoTapPersonalizado()
    }

    // Inicializar los eventos de tap perzonalizados para el item
    inicializarEventosDeTapPersonalizados(elemento:HTMLElement) {
        return this.gestorEventosTap.construirEventosTap(elemento)
    }

    // Devuelve las clases que definen el estilo del item rectangular
    obtenerClasesParaItemRectangular(configuracion: ItemRectangularCompartido) {
        const clases = {
            'itemRectangulo': true, // Clase por defecto
            'perfil': (configuracion.usoDelItem === UsoItemRectangular.RECPERFIL), // Indica que el item va ser usado con las dimensiones de la clase perfil
            'albumMini': (configuracion.usoDelItem === UsoItemRectangular.RECALBUMMINI), // Indica que el item va a ser usado con las dimenciones de la clase albumMini
            'albumPreview': (configuracion.usoDelItem === UsoItemRectangular.RECALBUMPREVIEW), // Indica que el item va a ser usado con las dimensiones de la clase albumPreview
            'cursorBoton': (configuracion.activarClick || configuracion.activarDobleClick || configuracion.activarLongPress)
        }

        clases[configuracion.colorBorde.toString()] = true
        clases[configuracion.colorDeFondo.toString()] = true

        return clases
    }

    // Devuelve las clases que definen el estilo del item circular
    obtenerClasesParaItemCircular(configuracion: ItemCircularCompartido) {
        const clases = {
            'itemCirculo': true, // Clase por defecto
            'perfil': (configuracion.usoDelItem === UsoItemCircular.CIRPERFIL), // Indica que el item va ser usado con las dimensiones de la clase perfil
            'album': (configuracion.usoDelItem === UsoItemCircular.CIRALBUM), // Indica que el item va a ser usado con las dimenciones de la clase album
            'contacto': (configuracion.usoDelItem === UsoItemCircular.CIRCONTACTO), // Indica que el item va a ser usado con las dimensiones de la clase contacto
            'cursorBoton': (configuracion.activarClick || configuracion.activarDobleClick || configuracion.activarLongPress)
        }

        clases[configuracion.colorBorde.toString()] = true
        clases[configuracion.colorDeFondo.toString()] = true

        return clases
    }

    // Valida si existe una imagen para mostrar en el item como background
    obtenerEstiloImagenFondo(urlMedia:string) {
        if (urlMedia && urlMedia.length > 0) {
            return {
              'background': 'url(' + urlMedia + ')',
              'background-size': '100% 100%',
              'background-repeat': 'no-repeat',
              'background-position': 'center',
            }
        } else {
            return {}
        }
    }

    // Oculta o muestra el texto del boton segun sea el caso (Hay o no hay foto de fondo)
    obtenerClasesTextoBoton(mostrarBoton:boolean) {
        return {
            'textoBoton': true,
            'hide': (!mostrarBoton)
        }
    }

    // Define las clases para los bordes (esquinas) sobre la foto - Uso UsoItemCirRec.RECPERFIL
    obtenerClasesBordesEnLasEsquinas(index:number, usoDelItem: UsoItemRectangular) {
        return {
            'esquina': true,
            'a': (index === 0),
            'b': (index === 1),
            'c': (index === 2),
            'd': (index === 3),
            'mostrar': (usoDelItem === UsoItemRectangular.RECPERFIL)
        }
    }
    //ESCONDE LAS ESQUINAS DEL RECTANGULO
    esconderBoderEsquinas(index:number, usoDelItem: UsoItemRectangular){
        return {
            'esquina': false,
            'a': (index === 0),
            'b': (index === 1),
            'c': (index === 2),
            'd': (index === 3),
            'mostrar': (usoDelItem === UsoItemRectangular.RECPERFIL)
        }
    }

    // Define las clases para la descripcion del item - Uso UsoItemCirRec.RECALBUMPREVIEW
    obtenerClasesItemDescripcion(usoDelItem: UsoItemRectangular) {
        return {
            'itemDescripcion': true,
            'mostrar': (usoDelItem === UsoItemRectangular.RECALBUMPREVIEW)
        }
    }

    // Define las clases para el borde rojo que indica que se esta editando la descripcion del item - Uso UsoItemCirRec.RECALBUMPREVIEW
    obtenerClasesCapaConBordeRojo(mostrarCapaImagenSeleccionadaConBorde:boolean) {
        return {
            'capa': true,
            'dos': true,
            'mostrar': (mostrarCapaImagenSeleccionadaConBorde)
        }
    }

    // Define las clases para el marco que contiene el icono de expandir foto a pantalla completa
    obtenerClasesCapaConIconoExpandir(usoDelItem: UsoItemRectangular, mostrarIconoExpandirFoto:boolean) {
        return {
            'capa': true,
            'tres': true,
            'mostrar': (usoDelItem === UsoItemRectangular.RECALBUMPREVIEW && mostrarIconoExpandirFoto)
        }
    }

    // Devuelve las clases para la capa con color de opacidad encima de la foto por defecto
    obtenerClasesCapaOpacidad(capaOpacidad: CapaOpacidad) {
        const clases = {}
        clases['capa'] = true
        clases['opacidad'] = true
        clases['mostrar'] = capaOpacidad.mostrar
        if (capaOpacidad.colorOpacidad) {
            clases[capaOpacidad.colorOpacidad.toString()] = true
        }
        return clases
    }

}