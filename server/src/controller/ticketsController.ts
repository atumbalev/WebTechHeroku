import { Request, Response } from 'express'
import ITicket from '../models/ticket';
import TicketService from '../services/ticketService'
import Project from '../schemas/ProjectSchema'



export const putTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const taskName = req.params.taskName;
    const ticket = req.body;


    if ((req.body.constructor === Object && Object.keys(req.body).length === 0) || !name || !taskName || !ticket.category) {
        res.status(400).json("error: Invalid input");
        return;
    }

    TicketService.updateTicket(name, taskName, ticket.description, ticket.category, ticket.status, ticket.assignee).then(async (updatedTicket) => {
        res.status(200).json({ "updatedTicket": updatedTicket });
        return;
    }).catch((err: Error) => {
        res.status(304).json({ "error": err });
    })
};

export const postTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const newTicket = req.body;

    if ((req.body.constructor === Object && Object.keys(req.body).length === 0) || !name || !newTicket.taskName || !newTicket.status) {
        res.status(400).json("error: Invalid input");
        return;
    }

    if (!name || !newTicket) {
        res.status(400).json("error: Invalid input");
        return;
    }

    await TicketService.addTicket(name, newTicket)
        .then(() => {
            res.status(200).json({ 'msg': 'Ticked added successfully' });
        })
        .catch((err: Error) => {
            res.status(304).json({ "error": err });
        });
}

export const getByAssignee = async (req: Request, res: Response) => {
    const name = req.params.name;
    if (!name) {
        res.status(400).json("error: Invalid input");
        return;
    }

    await TicketService.getByAssignee(name).then((ticketsByAssignee) => {
        res.status(200).json(ticketsByAssignee);
        return;
    })
        .catch((err: Error) => {
            res.status(405).json({ "err": err });
            return;
        });
}

export const getByStatus = async (req: Request, res: Response) => {//raboti
    const name = req.params.name;
    const status = req.params.status;
    if (!name || !status) {
        res.status(400).json("error: Invalid input");
        return;
    }
    await TicketService.getByStatus(name, status)
        .then((ticketsByStatus) => {
            res.status(200).json(ticketsByStatus);
            return;
        })
        .catch((err: Error) => {
            res.status(405).json({ "err": err });
            return;
        });

}

export const getByTasks = async (req: Request, res: Response) => {
    const name = req.params.name;
    if (!name) {
        res.status(400).json("error: Invalid input");
        return;
    }
    await Project.findOne({ name: name }).select('tickets').exec()
        .then((project: any) => {
            res.status(200).json(project.tickets);
            return;
        })
        .catch((err: Error) => {
            res.status(400).json({ "error": err });
            return;
        });
}

export const getByCategory = async (req: Request, res: Response) => {
    const name = req.params.name;
    const category = req.params.category;

    if (!name || !category) {
        res.status(400).json("error: Invalid input");
        return;
    }
    await TicketService.getByCategory(name, category)
        .then((ticketsByCategory) => {
            res.status(200).json(ticketsByCategory);
            return;
        })
        .catch((err: Error) => {
            res.status(405).json({ "error": err });
            return;
        });
}