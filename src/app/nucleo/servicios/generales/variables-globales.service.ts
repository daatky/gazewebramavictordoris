import { PerfilModel } from './../../../dominio/modelo/perfil.model';
import { Perfiles } from './../remotos/rutas/perfiles.enum';
import { CatalogoTipoPerfilModel } from 'src/app/dominio/modelo/catalogo-tipo-perfil.model';
import { UsuarioModel } from './../../../dominio/modelo/usuario.model';
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class VariablesGlobales {
  // Generales
  public mostrarMundo: boolean // Para ocultar o mostrar el mundo
  public semillaItemsId: number // Semilla para genera el id de los items
  // Paginacion
  public paginacionPrivado: Paginacion // Comentar ! xD
  public paginacionPublico: Paginacion // Comentar ! xD
  
  constructor(){
    // Generales
    this.mostrarMundo = true
    this.semillaItemsId = 0
    // Paginacion
    this.paginacionPrivado = new PaginacionClass()
    this.paginacionPublico = new PaginacionClass()
  }
}

export interface Paginacion{
  total?: number //Numero de paginas que tiene la paginacion
  actual: number //El numero de la pagina actualmente para realizar la paginacion
}

export class PaginacionClass implements Paginacion{
  actual = 1
  constructor(){}
}