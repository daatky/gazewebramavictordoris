import { PerfilModel } from '../../../dominio/modelo/perfil.model';
import { Perfiles } from './../remotos/rutas/perfiles.enum';
import { CatalogoTipoPerfilModel } from '../../../dominio/modelo/catalogos/catalogo-tipo-perfil.model';
import { UsuarioModel } from '../../../dominio/modelo/entidades/usuario.model';
import { Injectable } from '@angular/core'
import { Router } from '@angular/router';
import { RutasLocales } from 'src/app/rutas-locales.enum';

@Injectable({ providedIn: 'root' })
export class VariablesGlobales {
  // Generales
  public mostrarMundo: boolean // Para ocultar o mostrar el mundo
  public semillaItemsId: number // Semilla para genera el id de los items

  constructor(
    private router: Router,
  ) {
    // Generales
    this.mostrarMundo = true
    this.semillaItemsId = 0
  }
}

export interface Paginacion {
  total?: number //Numero de paginas que tiene la paginacion
  actual: number //El numero de la pagina actualmente para realizar la paginacion
}

export class PaginacionClass implements Paginacion {
  actual = 1
  constructor() { }
}