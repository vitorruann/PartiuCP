const ProdutosLista = require('../models/ProdutosLista');

module.exports = {
    async destroy(req, res){
        const { produto } = req.body;
        const { lista_id } = req.headers;
    
            const excluirProduto = await ProdutosLista.destroy ({
                lista: lista_id,
                produto,
            })   
            if (excluirProduto) {
                return alert("item excluido" + { excluirProduto});   
            } else {
                return alert("erro" + { excluirProduto});
            }  
    },

    async store(req, res){
        const { produto } = req.body;
        const { lista_id } = req.headers;

        let produtosLista = await ProdutosLista.findOne({ lista: lista_id, produto });
        
        if (!produtosLista) {
            produtosLista = await ProdutosLista.create ({
                lista: lista_id,
                produto,
            }) 
        } else {
            return res.status(400).json({ error: 'Produto já existe nessa lista' });
        }

        return res.json(produtosLista);
    }
};