import { ColorTextoBoton, TipoBoton } from '../../componentes/button/button.component'
import { TamanoDeTextoConInterlineado } from '../enums/tamano-letra-con-interlineado.enum';

/*
Interface que indica los parametros necesarios para la creacion de un boton compartido.
*/
export interface BotonCompartido {
  text: string // Descripcion o enunciado
  tamanoTexto: TamanoDeTextoConInterlineado //Tamano de la letra del boton
  colorTexto: ColorTextoBoton // Color de la letra
  ejecutar: Function // Funcion a ejecutar cuando se de click en el boton
  enProgreso: boolean; //Muestra un progress en caso de que el boton se encuentre realizando una accion
  tipoBoton: TipoBoton // Tipo del boton, solo texto o texto con icono  
}

/*
LETRAS UTILIZADAS EN LOS BO
  PEQ = "letra-0423",
  MED = "letra-0493",
  GRA = "letra-0551",
*/

