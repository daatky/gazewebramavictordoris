import { ItemCircularCompartido, ItemRectangularCompartido, CapaOpacidad } from "./item-cir-rec.interface"
import { UsoItemCircular, UsoItemRectangular } from "../enums/uso-item-cir-rec.enum"

// Define metodos comunes para los items de tipo circular y rectangular
export interface ItemMetodosCompartidosInterface {
    inicializarEventosDeTapPersonalizados(elemento:HTMLElement) : any
    obtenerEstiloImagenFondo(urlMedia:string) : any
    obtenerClasesTextoBoton(mostrarBoton:boolean) : any
    obtenerClasesBordesEnLasEsquinas(index:number, usoDelItem: UsoItemRectangular) : any
    obtenerClasesItemDescripcion(usoDelItem: UsoItemRectangular) : any
    obtenerClasesCapaOpacidad(opacidad: CapaOpacidad) : any
}