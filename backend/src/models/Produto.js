const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nomeProduto: String,

});

module.exports = mongoose.model('Produto', ProdutoSchema);