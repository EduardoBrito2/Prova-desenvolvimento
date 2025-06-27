import mongoose from 'mongoose'

const MesaSchema = new mongoose.Schema({
    nomeCliente: { type: String, required: true },
  numeroMesa: { type: String, required: false },
  dataHora: { type: Date, required: true },
  status: {
    type: String,
    enum: ['reservado', 'ocupado', 'disponível'],
    required: true,
  },
  contatoCliente: { type: String, required: true },
  valor: { type: Number, required: true },
});

const Mesa = mongoose.model('Mesa',MesaSchema);
export default Mesa;