const mongoose = require('mongoose');

const ListaSchema = new mongoose.Schema({
    nomeLista: String,

});

module.exports = mongoose.model('Lista', ListaSchema);