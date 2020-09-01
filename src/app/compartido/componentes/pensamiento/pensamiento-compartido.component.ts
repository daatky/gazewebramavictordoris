import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatosLista } from '../../diseno/modelos/datos-lista.interface';
import { PensamientoCompartido, Configuracion } from "../../diseno/modelos/pensamiento";
import { TipoPensamiento, EstiloItemPensamiento } from '../../diseno/enums/tipo-pensamiento.enum';
import { PensamientoNegocio } from 'src/app/dominio/logica-negocio/pensamiento.negocio';
import { PensamientoModel } from 'src/app/dominio/modelo/pensamiento.model';

@Component({
  selector: 'app-pensamiento-compartido',
  templateUrl: './pensamiento-compartido.component.html',
  styleUrls: ['./pensamiento-compartido.component.scss']
})
export class PensamientoCompartidoComponent implements OnInit {
  @Input() pensamientoCompartido:PensamientoCompartido
  divPensamiento:string
  @Input() dataLista:DatosLista
  @Output() unClick:EventEmitter<object>
  @Output() dobleClick:EventEmitter<object>
  @Output() clickLargo:EventEmitter<object>
  dataPensamiento:Configuracion
  error:string
  
  constructor(
    private pensamientoNegocio:PensamientoNegocio,
  ) { 
    this.unClick=new EventEmitter<object>();
    this.dobleClick=new EventEmitter<object>();
    this.clickLargo=new EventEmitter<object>();
  }

  ngOnInit(): void {  
    //this.configurarDatos(0,{id:'uhf'})
    this.cargarPensamiento()
  }    
  cargarPensamiento(){
    this.error=""
    if(this.pensamientoCompartido&&(this.pensamientoCompartido.tipoPensamiento===TipoPensamiento.PENSAMIENTO_ALEATORIO)){            
      
      this.obtenerPensamientoAleatorio()          
    }else{
      this.divPensamiento='divPensamientoAleatorio' //CLASE PARA EL ESTILO  
    }
  }
  obtenerPensamientoAleatorio(){
    this.pensamientoNegocio.obtenerPensamientoAleatorio()
    .subscribe((res:PensamientoModel)=>{ 
      console.log(res)
      this.divPensamiento='divPensamientoAleatorio' //CLASE PARA EL ESTILO  
      this.dataPensamiento={data:res}
    },error=>{
      console.log(error)
      this.error=error
    })
  }
  eventoClick(index:number,pensamientoModel:PensamientoModel){
    this.unClick.emit({index:index,pensamientoModel:pensamientoModel})
  }
  eventoDobleClick(index:number,pensamientoModel:PensamientoModel){
    this.dobleClick.emit({index:index,pensamientoModel:pensamientoModel})
  }
  eventoClickLargo(index:number,pensamientoModel:PensamientoModel){
    console.log(index, pensamientoModel)
    this.clickLargo.emit({index:index,pensamientoModel:pensamientoModel})
  }
  configurarDatos(index:number, pensamientoModel:PensamientoModel):Configuracion{
    return {
      data:pensamientoModel,
      onclick: () => this.eventoClick(index,pensamientoModel),        
      estilo:EstiloItemPensamiento.ITEM_ALEATORIO,
      dobleClick: () => this.eventoDobleClick(index,pensamientoModel),  
    }
  }
}
