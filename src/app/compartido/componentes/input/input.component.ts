import { EstiloDelTextoServicio } from './../../../nucleo/servicios/diseno/estilo-del-texto.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { InputCompartido } from '../../diseno/modelos/input.interface'
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() inputCompartido: InputCompartido

  constructor(
    public estiloDelTextoServicio: EstiloDelTextoServicio,
    private internacionalizacionNegocio: InternacionalizacionNegocio,
  ) {
  }
  /*   
    El InputCompartido
    placeholder:string, //Texto del placeholder del input
    estilo:EstiloInput, //Estilo que tiene se le va a dar un boton
    tipo:string, //Typo text, password, email etc
    data:string //Lo que se le ingresa al input
   
   */
  ngOnInit(): void {

  }

  obtenerError(controlName: any): string {
    let error = '';
    if (controlName.touched && controlName.errors != null && !this.inputCompartido.soloLectura) {
      if (controlName.errors.required) {
        error = this.internacionalizacionNegocio.obtenerTextoSincrono('campoRequerido')
      } else {
        if (controlName.errors.email) { 
          error = this.internacionalizacionNegocio.obtenerTextoSincrono('tipoEmail')
        } else {
          if (controlName.errors.minlength) {
            error = this.internacionalizacionNegocio.obtenerTextoSincrono('minimoCaracteres', { numero: controlName.errors.minlength.requiredLength })
          } else {
            if (controlName.errors.maxlength) {
              error = this.internacionalizacionNegocio.obtenerTextoSincrono('maximoCaracteres', { numero: controlName.errors.maxlength.requiredLength })
            } else {
              if (controlName.errors.pattern) {
                error = this.internacionalizacionNegocio.obtenerTextoSincrono('campoInvalido')
              }
            }
          }
        }
      }
    } else {
      if (controlName.untouched) {
        if (this.inputCompartido.error) {
          error = this.internacionalizacionNegocio.obtenerTextoSincrono('camposIncompletos')
        }
      }
    }
    return error
    //this.obtenerLlave(error).toString();
  }

  // Churon
  obtenerTextoContador(): string {
    let contador = ''

    if (this.inputCompartido.data.value.length > 0) {
      this.inputCompartido.contadorCaracteres.contador = this.inputCompartido.data.value.length
    }

    if (this.inputCompartido.contadorCaracteres.contador > 9) {
      contador = '' + this.inputCompartido.contadorCaracteres.contador
    } else {
      contador = '0' + this.inputCompartido.contadorCaracteres.contador
    }

    return contador + '/' + this.inputCompartido.contadorCaracteres.numeroMaximo
  }

  // Churon
  determinarCadenaMaxima(): string {
    let numeroCaracteres = '800'
    if (this.inputCompartido.contadorCaracteres) {
      numeroCaracteres = this.inputCompartido.contadorCaracteres.numeroMaximo.toString()
    }
    return numeroCaracteres
  }

  // Churon
  empezarEscribir() {
    if (!this.inputCompartido.soloLectura) {
      if (this.inputCompartido.contadorCaracteres) {
        this.inputCompartido.contadorCaracteres.mostrar = true
      }

      if (this.inputCompartido.errorPersonalizado) {
        this.inputCompartido.errorPersonalizado = ''
      }
    }
  }

  // Churon
  escribiendoEnInput() {
    if (this.inputCompartido.contadorCaracteres) {
      if (this.inputCompartido.contadorCaracteres.contador <= this.inputCompartido.contadorCaracteres.numeroMaximo) {
        this.inputCompartido.contadorCaracteres.contador = this.inputCompartido.data.value.length
      }
    }
  }

  // Churon
  dejarDeEscribir() {
    if (!this.inputCompartido.soloLectura) {
      if (this.inputCompartido.contadorCaracteres) {
        this.inputCompartido.contadorCaracteres.mostrar = false
      }
      if (this.inputCompartido.id && this.inputCompartido.validarCampo && this.inputCompartido.validarCampo.validar) {
        this.inputCompartido.validarCampo.validador({
          id: this.inputCompartido.id,
          texto: this.inputCompartido.data.value
        })
      }
    }
  }
}
