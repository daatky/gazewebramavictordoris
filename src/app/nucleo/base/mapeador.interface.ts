
/*

Mapeador genérico para convertir las entidades a modelos

@param S => objeto de entrada
@param T => objeto de salida

*/
export interface Mapeador<S, T> {
    transform(entity: S): T;
    transform(array: S[]): T[];
    transform(entityOrArray: S | S[]): T | T[];
}

export abstract class MapedorService<S, T> implements Mapeador<S, T> {

    protected abstract map(entity: S): T;

    transform(entity: S): T;

    transform(array: S[]): T[];

    transform(entityOrArray: S | S[]): T | T[] {
        return Array.isArray(entityOrArray) ?
            entityOrArray.map((item: S) => this.map(item)) :
            this.map(entityOrArray);
    }
}