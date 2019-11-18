const Lista = require('../models/Lista');

module.exports = {
    async index(req, res) {

        const listas = await Lista.find({});

        return res.json(listas);
    },

    async store(req, res) {
        const { nomeLista } = req.body;

        let lista = await Lista.findOne({ nomeLista });

        if (!lista) {
            lista = await Lista.create({ nomeLista })
        }

        return res.json(lista);
    },

    async destroyer(req, res) {
        const { nomeLista } = req.body;

        try {

            const response = await Lista.deleteOne({ nomeLista });
            return res.json(response);

        } catch (error) {

            return res.json(error);
        
        }
    }
}