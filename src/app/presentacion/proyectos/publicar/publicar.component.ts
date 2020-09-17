import { TipoMonedaNegocio } from './../../../dominio/logica-negocio/moneda.negocio';
import { ProyectoNegocio } from './../../../dominio/logica-negocio/proyecto.negocio';
import { CodigosCatalogoTipoProyecto } from './../../../nucleo/servicios/remotos/codigos-catalogos/codigos-catalogo-tipo-proyecto.enum';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilModel } from 'src/app/dominio/modelo/entidades/perfil.model';
import { PerfilNegocio } from 'src/app/dominio/logica-negocio/perfil.negocio';
import { ProyectoModel } from 'src/app/dominio/modelo/proyecto.model';
import { CatalogoTipoMonedaModel } from 'src/app/dominio/modelo/catalogos/catalogo-tipo-moneda.model';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss']
})
export class PublicarComponent implements OnInit {


  // Utils

  // Parametros de la url
  public accionProyecto: AccionProyecto
  public codigoTipoProyecto: CodigosCatalogoTipoProyecto
  public idProyecto: string

  // Parametros internos
  public catalogoTipoMoneda: Array<CatalogoTipoMonedaModel>
  public perfilSeleccionado: PerfilModel
  public proyecto: ProyectoModel

  constructor(
    private rutaActual: ActivatedRoute,
    private _location: Location,
    private perfilNegocio: PerfilNegocio,
    private proyectoNegocio: ProyectoNegocio,
    private tipoMonedaNegocio: TipoMonedaNegocio
  ) {
    this.catalogoTipoMoneda = []
  }

  ngOnInit(): void {
    // Core
    this.configurarParametrosDeLaUrl()
    this.inicializarPerfilSeleccionado()
    this.inicializarDataDeLaEntidad()
    this.inicializarDataCatalogoMoneda()
    // Componentes hijos
  }

  // Parametros de url
  configurarParametrosDeLaUrl() {
    const { accionProyecto, codigoTipoProyecto, idProyecto } = this.rutaActual.snapshot.params
    if (
      accionProyecto && accionProyecto.indexOf(':') < 0 &&
      codigoTipoProyecto && codigoTipoProyecto.indexOf(':') < 0
    ) {
      this.accionProyecto = accionProyecto as AccionProyecto
      this.codigoTipoProyecto = codigoTipoProyecto as CodigosCatalogoTipoProyecto

      // Si la accion es actualizar o visitar
      if (this.accionProyecto !== AccionProyecto.CREAR && idProyecto) {
        this.idProyecto = idProyecto
      }
    } else {
      console.log('parametros faltantes')
      this._location.back()
    }
  }

  // Inicializar perfil seleccionado
  inicializarPerfilSeleccionado() {
    this.perfilSeleccionado = this.perfilNegocio.obtenerPerfilSeleccionado()
    if (!this.perfilSeleccionado) {
      console.error('No hay perfil seleccionado')
      this._location.back()
    }
  }

  // Inicializar data de la entidad
  inicializarDataDeLaEntidad() {
    switch (this.accionProyecto) {
      case AccionProyecto.CREAR:
        // Se crea el objeto
        console.log('aqui')
        this.proyecto = this.proyectoNegocio.validarProyectoActivoSegunAccionCrear(this.codigoTipoProyecto, this.perfilSeleccionado)
        console.warn('proyecto', this.proyecto)
        break
      case AccionProyecto.ACTUALIZAR: break;
      case AccionProyecto.VISITAR: break;
      default: break;
    }
  }

  // Inicializar data catalogo moneda
  inicializarDataCatalogoMoneda() {
    // this.tipoMonedaNegocio.obtenerCatalogoTipoMoneda().subscribe(data => {
    //   this.catalogoTipoMoneda = data
    //   this.tipoMonedaNegocio.guardarCatalogoTipoMonedaEnLocalStorage(data)

    //   console.warn(data)
    // }, error => {
    //   console.error(error)
    // })
  }

}

export enum AccionProyecto {
  CREAR = '0',
  ACTUALIZAR = '1',
  VISITAR = '2',
}
