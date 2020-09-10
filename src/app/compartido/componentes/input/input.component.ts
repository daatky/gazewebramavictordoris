import { Component, OnInit, Input } from '@angular/core'
import { InputCompartido } from '../../diseno/modelos/input.interface'
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  //<!--Type, placeholder, clase, error,validaciones,stylos-->
  error:string  
  @Input() inputCompartido:InputCompartido;  
  constructor(
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
    // console.log(this.inputCompartido)
  }

 obtenerError(controlName: any):string { 
    let error = '';
    if (controlName.touched && controlName.errors != null) {
      if(controlName.errors.required){               
        //error="campo requerido"   
        error=this.internacionalizacionNegocio.obtenerTextoSincrono('campoRequerido')
      }else{
        if(controlName.errors.email){
          //error='Correp electronico'          
          error=this.internacionalizacionNegocio.obtenerTextoSincrono('tipoEmail')
        }else{
          if(controlName.errors.minlength){
            //error="Este campo debe tener un minimo de "+controlName.errors.minlength.requiredLength+" caracteres"
            error=this.internacionalizacionNegocio.obtenerTextoSincrono('minimoCaracteres',{numero:controlName.errors.minlength.requiredLength})
          }else{
            if(controlName.errors.maxlength){
              //error="Este campo debe tener un maximo de "+controlName.errors.maxlength.requiredLength + " caracteres"
              error=this.internacionalizacionNegocio.obtenerTextoSincrono('maximoCaracteres',{numero:controlName.errors.maxlength.requiredLength})
            }else{
              if(controlName.errors.pattern){
                //error="Este campo es invalido"
                error=this.internacionalizacionNegocio.obtenerTextoSincrono('campoInvalido')
              }
            }
          }
        }
      }
    }else{
      if(controlName.untouched){
        if(this.inputCompartido.error) error=error=this.internacionalizacionNegocio.obtenerTextoSincrono('camposIncompletos')
        //error='Existen campos incompletos'
      }
    }
    return error
    //this.obtenerLlave(error).toString();
  }
}
