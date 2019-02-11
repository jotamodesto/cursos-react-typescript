import { NegociacoesView, MensagemView } from "../views/index";
import { Negociacoes, Negociacao, NegociacaoParcial } from "../models/index";
import { domInject, throttle } from "../helpers/decorators/index";
import { NegociacaoService, HandlerFunction } from "../services/index";
import { imprime } from "../helpers/index";

export class NegociacaoController {
  @domInject("#data")
  private _inputData: JQuery;
  @domInject("#quantidade")
  private _inputQuantidade: JQuery;
  @domInject("#valor")
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView("#negociacoesView");
  private _mensagemView = new MensagemView("#mensagemView");
  private _service = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }

  @throttle()
  adiciona() {
    const data = new Date(this._inputData.val().replace(/-/g, ","));
    if (!this._ehDiaUtil(data)) {
      this._mensagemView.update("Somente negociações em dias úteis.");
      return;
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val())
    );

    this._negociacoes.adiciona(negociacao);

    imprime(negociacao, this._negociacoes);

    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update("Negociação adicionada com sucesso");
  }

  @throttle()
  async importaDados() {
    const isOk: HandlerFunction = (res: Response) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error(res.statusText);
      }
    };

    try {
      const negociacoesParaImportar = await this._service.obterNegociacoes(isOk);
      const negociacoesImportadas = this._negociacoes.paraArray();

      negociacoesParaImportar
        .filter(
          negociacao =>
            !negociacoesImportadas.some(importada => negociacao.ehIgual(importada))
        )
        .forEach(negociacao => this._negociacoes.adiciona(negociacao));

      this._negociacoesView.update(this._negociacoes);
    } catch (error) {
      this._mensagemView.update(error.message);
    }
  }

  private _ehDiaUtil(data: Date) {
    return data.getDay() !== DiaDaSemana.Sabado && data.getDay() !== DiaDaSemana.Domingo;
  }
}

enum DiaDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}
