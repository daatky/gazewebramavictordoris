import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { BotonCompartido } from '../../diseno/modelos/boton.interface';
import { TipoBoton } from '../button/button.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BarraInferior } from "../../diseno/modelos/barra-inferior.interfce";
import { PensamientoModel } from 'src/app/dominio/modelo/entidades/pensamiento.model';
import { ItemPensamiento } from '../../diseno/modelos/pensamiento';

@Component({
  selector: 'app-barra-inferior',
  templateUrl: './barra-inferior.component.html',
  styleUrls: ['./barra-inferior.component.scss']
})
export class BarraInferiorComponent implements OnInit {
  botonCompartido: BotonCompartido
  dataForm: FormGroup
  @Input() barraInferior:BarraInferior
  constructor(
    private formBuilder: FormBuilder, 
    private cd: ChangeDetectorRef
  ) {
    this.iniciarDatos()
  }

  ngOnInit(): void {        
  }
  //Escucho el cambio del texto a actualizar de varible texto para presentar en el input
  ngOnChanges() {
    if(this.barraInferior){
      this.dataForm.get('texto').patchValue(this.barraInferior.input.data.texto)
    }       
  }
  iniciarDatos(){   
    this.dataForm = this.formBuilder.group({
      texto: ['', [Validators.required, Validators.maxLength(230)]],
    });     
   this.botonCompartido={tipoBoton: TipoBoton.ICON, enProgreso: false,ejecutar: () =>this.agregarTexto()}
  }
  //Detecta el click del boton de la barra inferior
  agregarTexto(){       
    if(this.dataForm.valid){
      this.barraInferior.input.data.texto=this.dataForm.controls.texto.value
      this.barraInferior.enviar()
      this.dataForm.reset()
    }
  }
}
