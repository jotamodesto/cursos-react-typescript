import { HttpService } from './HttpService';
import { ConnectionFactory } from './ConnectionFactory';
import { NegociacaoDAO } from '../dao/NegociacaoDAO';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {
   constructor() {
      this._http = new HttpService();
   }

   obterNegociacoesDaSemana() {
      return this._http
         .get('negociacoes/semana')
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
            throw new Error('Não foi possível obter as negociações da semana');
         });
   }

   obterNegociacoesDaSemanaRetrasada() {
      return this._http
         .get('negociacoes/retrasada')
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
            throw new Error('Não foi possível obter as negociações da semana retrasada');
         });
   }

   obterNegociacoesDaSemanaAnterior() {
      return this._http
         .get('negociacoes/anterior')
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
            throw new Error('Não foi possível obter as negociações da semana anterior');
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

   cadastra(negociacao) {
      return ConnectionFactory.getConnection()
         .then(connection => new NegociacaoDAO(connection))
         .then(dao => dao.adiciona(negociacao))
         .then(() => 'Negociação adicionada com sucesso.')
         .catch(erro => {
            console.error(erro);
            throw new Error('Não foi possível adicionar a negociação.');
         });
   }

   lista() {
      return ConnectionFactory.getConnection()
         .then(connection => new NegociacaoDAO(connection))
         .then(dao => dao.listaTodos())
         .catch(erro => {
            console.error(erro);
            throw new Error('Não foi possível obter negociações.');
         });
   }

   apaga() {
      return ConnectionFactory.getConnection()
         .then(connection => new NegociacaoDAO(connection))
         .then(dao => dao.apagaTodos())
         .then(() => 'Negociações apagadas com sucesso.')
         .catch(erro => {
            console.error(erro);
            throw new Error('Não foi possível apagar as negociações.');
         });
   }

   importa(listaAtual) {
      return this.obterTodasNegociacoes()
         .then(negociacoes =>
            negociacoes.filter(
               negociacao =>
                  !listaAtual.some(
                     negociacaoExistente =>
                        JSON.stringify(negociacao) === JSON.stringify(negociacaoExistente)
                  )
            )
         )
         .catch(erro => {
            console.error(erro);
            throw new Error('Não foi possível buscar negociações para importar');
         });
   }
}
