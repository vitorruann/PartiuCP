const mongoose = require('mongoose');

const ProdutoListaSchema = new mongoose.Schema({
    produto: [String],

    lista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lista'
    }

});

module.exports = mongoose.model('ProdutoLista', ProdutoListaSchema);