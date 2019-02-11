import { IImprimivel } from "./Imprimivel";
import { IIgualavel } from "./Igualavel";

export interface MeuObjeto<T> extends IImprimivel, IIgualavel<T> {}
