import { Component, OnInit, Input } from '@angular/core'
import { InputCompartido } from '../../diseno/modelos/input.interface'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  //<!--Type, placeholder, clase, error,validaciones,stylos-->
  @Input() inputCompartido:InputCompartido;  
  constructor() {    
   }
  /*   
    El InputCompartido
    placeholder:string, //Texto del placeholder del input
    estilo:EstiloInput, //Estilo que tiene se le va a dar un boton
    tipo:string, //Typo text, password, email etc
    data:string //Lo que se le ingresa al input
   
   */
  ngOnInit(): void {
    // console.log(this.inputCompartido)
  }
  obtenerError(controlName: any): string { 
    let error = '';
    if (controlName.touched && controlName.errors != null) {
      if(controlName.errors.required){
        error='Este campo es requerido'
      }else{
        if(controlName.errors.email){
          error='Correp electronico'          
        }else{
          if(controlName.errors.minlength){
            error="Este campo debe tener un minimo de "+controlName.errors.minlength.requiredLength+" caracteres"
          }else{
            if(controlName.errors.maxlength){
              error="Este campo debe tener un maximo de "+controlName.errors.maxlength.requiredLength + " caracteres"
            }else{
              if(controlName.errors.pattern){
                error="Este campo es invalido"
              }
            }
          }
        }
      }
    }else{
      if(controlName.untouched){
        if(this.inputCompartido.error) error='Existen campos incompletos'
      }
    }
    return error;
  }
}
