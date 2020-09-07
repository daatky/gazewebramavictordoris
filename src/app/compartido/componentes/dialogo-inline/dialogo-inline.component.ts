import { EstiloDelTextoServicio } from 'src/app/nucleo/servicios/diseno/estilo-del-texto.service';
import { ConfiguracionDialogoInline } from './../../diseno/modelos/dialogo-inline.interface'
import { Component, OnInit, Input, Output } from '@angular/core'

@Component({
  selector: 'app-dialogo-inline',
  templateUrl: './dialogo-inline.component.html',
  styleUrls: ['./dialogo-inline.component.scss']
})
export class DialogoInlineComponent implements OnInit {

  @Input() configuracion: ConfiguracionDialogoInline

  constructor(
    public estiloDelTextoServicio:EstiloDelTextoServicio
  ) {

  }

  ngOnInit(): void {
    
  }



}
