import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BotonCompartido } from '../../diseno/modelos/boton.interface';
import { TipoBoton } from '../button/button.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BarraInferior } from "../../diseno/modelos/barra-inferior.interfce";

@Component({
  selector: 'app-barra-inferior',
  templateUrl: './barra-inferior.component.html',
  styleUrls: ['./barra-inferior.component.scss']
})
export class BarraInferiorComponent implements OnInit {
  //maximo:number
  //placeholder:string
  botonCompartido: BotonCompartido
  dataForm: FormGroup
  //activar:boolean
  @Input() barraInferior:BarraInferior
  //@Output() escucharEvento:EventEmitter<string>
  constructor(
    private formBuilder: FormBuilder, 
  ) {
    //this.escucharEvento=new EventEmitter<string>()
  }

  ngOnInit(): void {    
    this.iniciarDatos()
  }
  iniciarDatos(){
    this.dataForm = this.formBuilder.group({
      texto: ['', [Validators.required, Validators.maxLength(230)]],
    }); 
   this.botonCompartido={tipoBoton: TipoBoton.ICON, enProgreso: false,ejecutar: () =>this.agregarTexto()}
  }
  agregarTexto(){       
    this.botonCompartido.text=this.dataForm.controls.texto.value
    //this.escucharEvento.emit(this.dataForm.controls.texto.value)
    this.barraInferior.enviar(this.botonCompartido.text)
  }
}
