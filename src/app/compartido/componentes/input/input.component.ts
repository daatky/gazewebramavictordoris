import { EstiloDelTextoServicio } from './../../../nucleo/servicios/diseno/estilo-del-texto.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { InputCompartido } from '../../diseno/modelos/input.interface'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() inputCompartido: InputCompartido

  constructor(
    public estiloDelTextoServicio: EstiloDelTextoServicio
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
    if (controlName.touched && controlName.errors != null) {
      if (controlName.errors.required) {
        error = 'Este campo es requerido'
      } else {
        if (controlName.errors.email) {
          error = 'Correp electronico'
        } else {
          if (controlName.errors.minlength) {
            error = "Este campo debe tener un minimo de " + controlName.errors.minlength.requiredLength + " caracteres"
          } else {
            if (controlName.errors.maxlength) {
              error = "Este campo debe tener un maximo de " + controlName.errors.maxlength.requiredLength + " caracteres"
            } else {
              if (controlName.errors.pattern) {
                error = "Este campo es invalido"
              }
            }
          }
        }
      }
    } else {
      if (controlName.untouched) {
        if (this.inputCompartido.error) error = 'Existen campos incompletos'
      }
    }
    return error;
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
    let numeroCaracteres = '400'
    if (this.inputCompartido.contadorCaracteres) {
      numeroCaracteres = this.inputCompartido.contadorCaracteres.numeroMaximo.toString()
    }
    return numeroCaracteres
  }

  // Churon
  empezarEscribir() {
    if (this.inputCompartido.contadorCaracteres) {
      this.inputCompartido.contadorCaracteres.mostrar = true
    }

    if (this.inputCompartido.errorPersonalizado) {
      this.inputCompartido.errorPersonalizado = ''
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
