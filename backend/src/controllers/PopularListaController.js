const ProdutosLista = require('../models/ProdutosLista');
const Lista = require('../models/Lista');

module.exports = {

    async store(req, res){
        const { produto } = req.body;
        const { lista_id } = req.headers;

        const lista = await Lista.findById(lista_id);

        if (!lista) {
            return res.status(400).json({ error: 'Lista não existe' });
        }
        
        const produtoLista = await ProdutosLista.create ({
            lista: lista_id,
            produto,
        })

        return res.json(produtoLista)
    }
};