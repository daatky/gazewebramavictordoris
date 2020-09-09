import { EstiloDelTextoServicio } from './../../nucleo/servicios/diseno/estilo-del-texto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public itemMenuActivo: MenuLanding
  public itemsMenu: Array<{
    texto: string,
    tipoItem: MenuLanding,
    clases: any,
  }>

  constructor(
    public estiloDelTextoServicio:EstiloDelTextoServicio
  ) {
    this.itemMenuActivo = MenuLanding.PAGINA_INICIO
    this.itemsMenu = []
  }

  ngOnInit(): void {
    this.inicializarItemsMenu()
  }
  // PÁGINA DE INICIO  -   ¿POR QUÉ GAZELOOK?   -   NUESTROS OBJETIVOS

  inicializarItemsMenu() {
    this.itemsMenu.push({
      texto: 'Página de Inicio',
      tipoItem: MenuLanding.PAGINA_INICIO,
      clases: {
        boton: true,
        activo: this.itemMenuActivo === MenuLanding.PAGINA_INICIO,
      }
    })

    this.itemsMenu.push({
      texto: '¿Por qué Gazelook?',
      tipoItem: MenuLanding.PORQUE_GAZELOOK,
      clases: {
        boton: true,
        activo: this.itemMenuActivo === MenuLanding.PORQUE_GAZELOOK,
      }
    })
    this.itemsMenu.push({
      texto: 'Nuestros Objetivos',
      tipoItem: MenuLanding.NUESTROS_OBJETIVOS,
      clases: {
        boton: true,
        activo: this.itemMenuActivo === MenuLanding.NUESTROS_OBJETIVOS,
      }
    })
  }

  cambiarMenuActivo(item: MenuLanding) {
    this.itemMenuActivo = item
    // Realizar demas cambios
  }
}

export enum MenuLanding {
  PAGINA_INICIO = '0',
  PORQUE_GAZELOOK = '1',
  NUESTROS_OBJETIVOS = '2'
}
