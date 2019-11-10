const ProdutosLista = require('../models/ProdutosLista');

module.exports = {
    async show(req, res) {
        const { lista_id } = req.headers;

        const produtosLista = await ProdutosLista.find({ lista: lista_id });

        return res.json(produtosLista);
    }
}