/* exported NegociacaoController */
class NegociacaoController {
   constructor() {
      const $ = document.querySelector.bind(document);

      this._inputData = $('#data');
      this._inputQuantidade = $('#quantidade');
      this._inputValor = $('#valor');

      this._listaNegociacoes = new Bind(
         new ListaNegociacoes(),
         new NegociacoesView($('#negociacoesView')),
         'adiciona',
         'esvazia'
      );

      this._mensagem = new Bind(
         new Mensagem(),
         new MensagemView($('#mensagemView')),
         'texto'
      );

      this._init();
   }

   _init() {
      ConnectionFactory.getConnection()
         .then(connection => new NegociacaoDAO(connection))
         .then(dao => dao.listaTodos())
         .then(negociacoes =>
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
         )
         .catch(erro => (this._mensagem.texto = erro));

      setInterval(() => {
         this.importaNegociacoes();
      }, 3000);
   }

   adiciona(event) {
      event.preventDefault();

      const negociacao = this._criaNegociacao();

      new NegociacaoService()
         .cadastra(negociacao)
         .then(mensagem => {
            this._listaNegociacoes.adiciona(negociacao);
            this._mensagem.texto = mensagem;
            this._limpaFormulario();
         })
         .catch(erro => (this._mensagem.texto = erro));
   }

   importaNegociacoes() {
      const service = new NegociacaoService();

      service
         .obterTodasNegociacoes()
         .then(negociacoes =>
            negociacoes.filter(
               negociacao =>
                  !this._listaNegociacoes.negociacoes.some(
                     negociacaoExistente =>
                        JSON.stringify(negociacao) === JSON.stringify(negociacaoExistente)
                  )
            )
         )
         .then(negociacoes => {
            negociacoes.forEach(negociacao =>
               this._listaNegociacoes.adiciona(negociacao)
            );
            this._mensagem.texto = 'Todas as negociações do periodo foram importadas.';
         })
         .catch(erro => (this._mensagem.texto = erro));
   }

   apaga() {
      ConnectionFactory.getConnection()
         .then(connection => new NegociacaoDAO(connection))
         .then(dao => dao.apagaTodos())
         .then(mensagem => {
            this._mensagem.texto = mensagem;
            this._listaNegociacoes.esvazia();
         })
         .catch(erro => (this._mensagem.texto = erro));
   }

   _criaNegociacao() {
      return new Negociacao(
         DateHelper.textoParaData(this._inputData.value),
         parseInt(this._inputQuantidade.value),
         parseFloat(this._inputValor.value)
      );
   }

   _limpaFormulario() {
      this._inputData.value = '';
      this._inputQuantidade.value = 1;
      this._inputValor.value = '0.0';

      this._inputData.focus();
   }
}
