import { Component, Input, OnInit } from "@angular/core";
import { ParticipanteAsociacionModel } from "src/app/dominio/modelo/participante-asociacion.model";
import {
  ItemCircularComponent,
  ItemCirularCompartido,
} from "../item-circular/item-circular.component";
import { LineaComponent } from "../linea/linea.component";

@Component({
  selector: "app-item-contacto",
  templateUrl: "./item-contacto.component.html",
  styleUrls: ["./item-contacto.component.scss"],
})
export class ItemContactoComponent implements OnInit {
  @Input()
  contactoItem: ItemContactoCompartido;

  constructor() {
  }

  ngOnInit(): void {
  }

  obtenerConfiguracionFoto() {
    return ItemCircularComponent.initFotoContacto(
      this.contactoItem.contacto.id,
      this.contactoItem.contacto.perfil.album[0].portada.principal.url,
      this.contactoItem.cargando,
      () => this.fotoCargo(),
      () => {},
    );
  }

  fotoCargo() {
    this.contactoItem.cargando = false;
  }

  obtenerConfiguracionLinea() {
    return LineaComponent.configurarLineaContacto();
  }
}

export interface ItemContactoCompartido {
  contacto: ParticipanteAsociacionModel;
  cargando: boolean;
}
