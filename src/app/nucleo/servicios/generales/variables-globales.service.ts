import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class VariablesGlobales {
  public mostrarMundo: boolean
  public semillaItemsId: number

  public paginacionPrivado: Paginacion
  public paginacionPublico: Paginacion

  constructor(){
    this.mostrarMundo = true
    this.semillaItemsId = 0
    this.paginacionPrivado = new PaginacionClass()
    this.paginacionPublico = new PaginacionClass()    
  }
}

export interface Paginacion{
  total?:number //Numero de paginas que tiene la paginacion
  actual:number //El numero de la pagina actualmente para realizar la paginacion
}

export class PaginacionClass implements Paginacion{
  actual=1
  constructor(){}
}