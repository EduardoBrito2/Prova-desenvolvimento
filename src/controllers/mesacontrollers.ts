import { Request, Response } from "express";
import Mesa from "../models/mesamodels";



export const createEvent = async (req: Request, res: Response): Promise<void> => {
  console.log("Recebido no corpo:", req.body);
  try {
    const {nomeCliente,numeroMesa,dataHora,status,contatoCliente,valor} = req.body;
    const novoEvento = new Mesa({nomeCliente,numeroMesa,dataHora,status,contatoCliente,valor});
    await novoEvento.save();
    res.status(201).json(novoEvento);
  } catch (error) {
    console.error(error);  // log do erro para detalhar
    res.status(400).json({ error: 'Erro ao cadastrar mesa' });
  }
};
export const getEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const evento = await Mesa.find();
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar mesa' });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const {nomeCliente,numeroMesa,dataHora,status,contatoCliente,valor} = req.body;
  try {
    const MesaAtualizado = await Mesa.findByIdAndUpdate(
      id,
      { nomeCliente,numeroMesa,dataHora,status,contatoCliente,valor },
      { new: true }
    );
    if (!MesaAtualizado) {
      res.status(404).json({ error: "Mesa não encontrado" });
      return;
    }
    res.json(MesaAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(400).json({ error: 'Erro ao atualizar mesa' });
  }
}  
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const MesaDeletado = await Mesa.findByIdAndDelete(id);
    if (!MesaDeletado) {
      res.status(404).json({ error: "Mesa não encontrado" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar mesa" });
  }
};