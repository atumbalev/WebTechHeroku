import * as express from 'express';
import * as projectController from '../controller/projectController'
import * as ticketsController from '../controller/ticketsController'
import ticketsRoutes from './ticketsRouter'

const router = express.Router();


router.get('/:email', projectController.getAllProjects);//raboti

router.post('/:email',projectController.postNewProject);//raboti


router.get('/:name/tickets',projectController.getTickets);//raboti

router.put('/:name/tickets/:taskName', ticketsController.putTicket);//raboti

router.post('/:name/tickets', ticketsController.postTicket);//raboti

router.delete('/:name/tickets/:taskName', projectController.deleteTicket);//raboti


router.post('/:name/users', projectController.addContributer); //raboti

router.get('/:name/users', projectController.getAllContributers);//raboti




//tickets
router.use('/',ticketsRoutes);



export default router;