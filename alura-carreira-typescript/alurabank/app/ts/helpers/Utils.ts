import { IImprimivel } from "../models/index";

export function imprime(...imprimiveis: IImprimivel[]) {
  imprimiveis.forEach(imprimivel => imprimivel.paraTexto());
}
