const ProdutosLista = require('../models/ProdutosLista');

module.exports = {
    async destroy(req, res) {
        const { produto } = req.body;        
        const { lista_id } = req.headers;

        try {

            const excluirProdutoLista = await ProdutosLista.deleteOne( { lista: lista_id, produto });
            return res.json(excluirProdutoLista);               
        
        } catch (error) {
        
            return res.json(error);
        
        }
    },

    async store(req, res) {
        const { produto } = req.body;
        const { lista_id } = req.headers;

        let produtoLista = await ProdutosLista.findOne({ lista: lista_id, produto });

        if (!produtoLista) {
            produtoLista = await ProdutosLista.create({
                lista: lista_id,
                produto
            })
        } else {
            return res.status(400).json({ error: 'Produto já existe nessa lista' });
        }

        return res.json(produtoLista);
    }
};