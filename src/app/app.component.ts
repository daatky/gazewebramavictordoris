import { DialogoServicie } from './nucleo/servicios/diseno/dialogo.service';
//import { ButtonComponent } from './compartido/componentes/button/button.component';
import { DialogoCompartido } from './compartido/diseno/modelos/dialogo.interface';
//import { BotonCompartido } from './compartido/diseno/modelos/boton.interface';
import { TipoBoton } from '../app/compartido/componentes/button/button.component'
import { ColorTextoBoton } from '../app/compartido/componentes/button/button.component'
import { Component } from '@angular/core';
import { TipoDialogo } from './compartido/diseno/enums/tipo-dialogo.enum';
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { VariablesGlobales } from './nucleo/servicios/generales/variables-globales.service';
import { TamanoDeTextoConInterlineado } from './compartido/diseno/enums/tamano-letra-con-interlineado.enum';
//import { CatalogoIdiomaEntity } from './dominio/entidades/catalogos/catalogo-idioma.entity';
import { InternacionalizacionNegocio } from "../app/dominio/logica-negocio/internacionalizacion.negocio";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'gazelookweb'

  constructor(
    private globales: VariablesGlobales,
    private internacionalizacionNegocio: InternacionalizacionNegocio
  ) {
    //GUARDAR EN LA INTERNACIONALIZACION EL IDIOMA POR DEFECTO O EL IDOMA QUE ESTA GUARDADO EN EL LOCAL STORAGE
    this.internacionalizacionNegocio.guardarIdiomaDefecto()

    //INTERNET
    window.addEventListener('offline', (e) => {
      console.log('NO HAY INTERNET')

    });

    window.addEventListener('online', function (e) {
      console.log('HAY INTERNET')
    });

    this.obtenerMundoClases();
  }

  obtenerMundoClases() {
    return {
      'mundo': true,
      'mostrar': this.globales.mostrarMundo
    }
  }
}
