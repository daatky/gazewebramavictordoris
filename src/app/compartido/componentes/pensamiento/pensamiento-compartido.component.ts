import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatosLista } from '../../diseno/modelos/datos-lista.interface';
import { PensamientoCompartido, Configuracion, ItemPensamiento } from "../../diseno/modelos/pensamiento";
import { TipoPensamiento, EstiloItemPensamiento } from '../../diseno/enums/tipo-pensamiento.enum';
import { PensamientoNegocio } from 'src/app/dominio/logica-negocio/pensamiento.negocio';
import { PensamientoModel } from 'src/app/dominio/modelo/entidades/pensamiento.model';
import { InternacionalizacionNegocio } from 'src/app/dominio/logica-negocio/internacionalizacion.negocio';

@Component({
  selector: 'app-pensamiento-compartido',
  templateUrl: './pensamiento-compartido.component.html',
  styleUrls: ['./pensamiento-compartido.component.scss']
})
export class PensamientoCompartidoComponent implements OnInit {
  @Input() pensamientoCompartido:PensamientoCompartido
  divPensamiento:string
  @Input() dataLista:DatosLista
  @Output() unClick:EventEmitter<ItemPensamiento>
  @Output() dobleClick:EventEmitter<ItemPensamiento>
  @Output() clickLargo:EventEmitter<ItemPensamiento>
  dataPensamiento:Configuracion
  error:string
  
  constructor(
    private pensamientoNegocio:PensamientoNegocio,
    private internacionalizacionNegocio: InternacionalizacionNegocio,
  ) { 
        //this.configurarDatos(0,{id:'uhf'})
        this.unClick=new EventEmitter<ItemPensamiento>();
        this.dobleClick=new EventEmitter<ItemPensamiento>();
        this.clickLargo=new EventEmitter<ItemPensamiento>();           
  }

  ngOnInit(): void {  
    this.cargarPensamiento()
  }  
  /*ngOnChanges(){
    this.cargarPensamiento()
  }*/
  cargarPensamiento(){
    this.error=""
    //console.log("aspodkaokdoakdok")
    //console.log(this.pensamientoCompartido)
    if(this.pensamientoCompartido&&(this.pensamientoCompartido.tipoPensamiento===TipoPensamiento.PENSAMIENTO_ALEATORIO)){                  
      this.obtenerPensamientoAleatorio()          
    }else{       
      if(this.pensamientoCompartido&&(this.pensamientoCompartido.tipoPensamiento===TipoPensamiento.PENSAMIENTO_PRIVADO_CREACION)){
        this.divPensamiento='divPensamientoFormaRoja'
      }else{
        if(this.pensamientoCompartido&&(this.pensamientoCompartido.tipoPensamiento===TipoPensamiento.PENSAMIENTO_PUBLICO_CREACION)){
          this.divPensamiento='divPensamientoFormaAmarilla'
        }/*else{
          if(this.pensamientoCompartido&&(this.pensamientoCompartido.tipoPensamiento===TipoPensamiento.PENSAMIENTO_SIN_SELECCIONAR)){
            this.divPensamiento='divPensamientoForma'
          }
        } */
      }         
    }
  }
  obtenerPensamientoAleatorio(){
    console.log('PENSAMIENTO ALEATORIO')     
    this.dataPensamiento={data:{texto:""},presentarX:false} 
    this.error=""
    this.divPensamiento='divPensamientoAleatorio' //CLASE PARA EL ESTILO  
    this.pensamientoNegocio.obtenerPensamientoAleatorio()
    .subscribe((res:PensamientoModel)=>{ 
      console.log('PENSAMIENTO ALEATORIO')      
      console.log(res)
      this.dataPensamiento={data:res,presentarX:false}
    },error=>{
      console.log("ERROR AL OBTENER PENSAMIENTO")
      this.error=error
    })
    //this.dataPensamiento={data:{id:'12323',texto:"HOLA ES ES MI CONTACTO",fechaActualizacion:new Date()}}
    //{id:'12323',texto:"HOLA ES ES MI CONTACTO",fechaActualizacion:new Date()}
  }
  eventoClick(index:number,pensamientoModel:PensamientoModel){
    this.unClick.emit({indice:index,pensamiento:pensamientoModel})
  }
  eventoDobleClick(index:number,pensamientoModel:PensamientoModel){
    console.log("aqio")
    this.dobleClick.emit({indice:index,pensamiento:pensamientoModel})
  }
  eventoClickLargo(index:number,pensamientoModel:PensamientoModel){
    console.log(index, pensamientoModel)
    this.clickLargo.emit({indice:index,pensamiento:pensamientoModel})
  }
  configurarDatos(index:number, pensamientoModel:PensamientoModel):Configuracion{
    //console.log("CONFIGURANDO DATOS")
    //console.log(index,pensamientoModel)
    return {
      data:pensamientoModel,     
      estilo:EstiloItemPensamiento.ITEM_ALEATORIO,
      dobleClick: () => this.eventoDobleClick(index,pensamientoModel),  
      presentarX:this.pensamientoCompartido.configuracionItem.presentarX,
      onclick:()=>this.eventoClick(index,pensamientoModel)
    }
  }
}
