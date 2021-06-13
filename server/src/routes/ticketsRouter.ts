import { Router, Request, Response } from 'express';
import { getByAssignee, getByStatus, getByTasks,getByCategory } from '../controller/ticketsController'

const router = Router();

router.get('/:name/tickets/assignee', getByAssignee); //raboti
router.get('/:name/tickets/status/:status', getByStatus); //raboti
router.get('/:name/tickets/tasks', getByTasks); //raboti

router.get('/:name/tickets/tasks/:category', getByCategory); //raboti
export default router;