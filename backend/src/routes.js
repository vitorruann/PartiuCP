const express = require('express');

const ProdutoController = require('./controllers/ProdutoController');

const ListasController = require('./controllers/ListasController');

const PopularListaController = require('./controllers/PopularListaController');
const ProdutoListaController = require('./controllers/ProdutoListaController');

const routes = express.Router();

routes.get('/produtosLista', ProdutoListaController.show);
routes.post('/popularLista', PopularListaController.store);
routes.post('/removerProdutoLista', PopularListaController.destroy);

routes.get('/listas', ListasController.index);
routes.post('/criarLista', ListasController.store);
routes.post('/removerLista', ListasController.destroyer);

routes.get('/listaProdutos', ProdutoController.index);
routes.post('/criarProdutos', ProdutoController.store);
routes.post('/removerProdutos', ProdutoController.destroyer);

module.exports = routes;