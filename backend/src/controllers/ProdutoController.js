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

        try {

            if (!produto) {
                produto = await Produto.create({ nomeProduto })     
            } else {

                return res.json(false);

            }
    
            return res.json(produto);

        } catch (error) {
         
            return res.json(error);
        
        }
    },

    async destroyer(req, res) {
        const { nomeProduto } = req.body;

        try {
            const response = await Produto.deleteOne({ nomeProduto });   
            
            return res.json(response);
        
        } catch (error) {
        
            return res.json(error);   
        
        }
    }
};
//show, somente um produto