const Produto = require('../models/Produto');

module.exports = {
    //lista de produtos
    async index(req, res) {

        const produtos = await Produto.find({ });

        return res.json(produtos);
    },

    //criar um produto
    async store(req, res) {
        const { nomeProduto } = req.body;

        let produto = await Produto.findOne({ nomeProduto });

        if (!produto) {
            produto = await Produto.create({ nomeProduto })     
        }

        return res.json(produto);
    }
};
//show, somente um produto