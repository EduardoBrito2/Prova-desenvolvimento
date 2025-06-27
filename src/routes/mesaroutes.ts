import express from 'express';
import { createEvent, deleteEvent, getEvent, updateEvent } from '../controllers/mesacontrollers';


const router = express.Router();

router.post('/', createEvent); // <-- aqui deve ser só '/'
router.get('/', getEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);


export default router;