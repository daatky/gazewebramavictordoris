import { AccionesSelector } from './../enums/acciones-selector.enum'

// Data a enviar cuando se ejecute un evento en el item
// Indica la accion, y demas informacion - any
export interface InfoAccionSelector {
    accion:AccionesSelector, // Describe la accion a ejecutar en el padre
    informacion?:any // Contiene la informacion para ejecutar la accion en el padre
}