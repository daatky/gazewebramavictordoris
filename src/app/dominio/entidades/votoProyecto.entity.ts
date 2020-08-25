import { ProyectoEntity } from "./proyecto.entity";
import { PerfilEntity } from "./perfil.entity";
import { CatalogoEstadoEntity } from "./catalogos/catalogo-estado.entity";
import { CatalogoFormulaEventoEntity } from "./catalogos/catalogo-formula-evento.entity";
import { CatalogoTipoVotoEntity } from "./catalogos/catalogo-tipo-voto.entity";
import { CatalogoIdiomaEntity } from "./catalogos/catalogo-idioma.entity";

export interface VotoProyectoEntity {
    id: string,
    estado: CatalogoEstadoEntity
    fechaCreacion: Date,
    fechaActualizacion: Date,
    proyecto: ProyectoEntity,
    perfil: PerfilEntity,
    traducciones: Array<TraduccionVotoProyectoEntity>,
    tipo: CatalogoTipoVotoEntity,
    numeroVoto: number,
    formulaEvento: CatalogoFormulaEventoEntity
}

export interface TraduccionVotoProyectoEntity {
    id: string
    descripcion: string
    idioma: CatalogoIdiomaEntity //Catalogo Idioma
    original: boolean
}