import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import MesaRoutes from './routes/mesaroutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/reserva')
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar MongoDB:", err));

// Use as rotas
app.use('/reserva', MesaRoutes); // <-- prefixo da rota

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});