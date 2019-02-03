class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }

  obterNegociacoesDaSemana() {
    return this._http
      .get("negociacoes/semana")
      .then(negociacoes => {
        return negociacoes.map(
          negociacao =>
            new Negociacao(
              new Date(negociacao.data),
              negociacao.quantidade,
              negociacao.valor
            )
        );
      })
      .catch(err => {
        console.log(err);
        throw new Error("Não foi possível obter as negociações da semana");
      });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http
      .get("negociacoes/retrasada")
      .then(negociacoes => {
        return negociacoes.map(
          negociacao =>
            new Negociacao(
              new Date(negociacao.data),
              negociacao.quantidade,
              negociacao.valor
            )
        );
      })
      .catch(err => {
        console.log(err);
        throw new Error("Não foi possível obter as negociações da semana retrasada");
      });
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get("negociacoes/anterior")
      .then(negociacoes => {
        return negociacoes.map(
          negociacao =>
            new Negociacao(
              new Date(negociacao.data),
              negociacao.quantidade,
              negociacao.valor
            )
        );
      })
      .catch(err => {
        console.log(err);
        throw new Error("Não foi possível obter as negociações da semana anterior");
      });
  }

  obterTodasNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada()
    ])
      .then(periodos => {
        const negociacoes = periodos.reduce(
          (dados, periodo) => dados.concat(periodo),
          []
        );

        return negociacoes;
      })
      .catch(erro => {
        throw new Error(erro);
      });
  }
}
