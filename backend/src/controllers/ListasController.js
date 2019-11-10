const Lista = require('../models/Lista');

module.exports = {
    async index(req, res) {

        const listas = await Lista.find({ });

        return res.json(listas);
    },

    async store(req, res) {
        const { nomeLista } = req.body;

        let lista = await Lista.findOne({ nomeLista });

        if (!lista) {
            lista = await Lista.create({ nomeLista })
        }

        return res.json(lista);
    }
}