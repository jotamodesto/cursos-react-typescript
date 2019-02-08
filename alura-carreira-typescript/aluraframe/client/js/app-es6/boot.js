import 'node_modules/whatwg-fetch/dist/fetch.umd';
import NegociacaoController from './controllers/NegociacaoController';

const negociacaoController = NegociacaoController();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(
   negociacaoController
);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(
   negociacaoController
);
