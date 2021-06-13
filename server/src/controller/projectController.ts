import { Request, Response } from 'express'
import IProject from '../models/project';
import Project from '../schemas/ProjectSchema'
import User from '../schemas/UserSchema'
import ProjectService from '../services/projectService';
import TicketService from '../services/ticketService';

export const getAllProjects = async (req: Request, res: Response) => {
    if (!req.params.email) {
        res.status(400).json("error: No Project found");
        return;
    }

    await ProjectService.getProjectByEmail(req.params.email).then(async(projects) => {
        res.status(200).json({ "projects": projects });
        return;
    }).catch((err: Error) => {
        res.status(404).json({ "error": err });
        return;
    });
}

export const postNewProject = async (req: Request, res: Response) => {
    const email = req.params.email;
    let body: IProject = req.body;
    body.creator = email;

    if ((req.body.constructor === Object && Object.keys(req.body).length === 0) || !req.params.email || !req.body.name) {
        res.status(400).json("error: Invalid input");
        return;
    }


    await ProjectService.addProject(body).then(() => {
        res.status(200).json("Project added");
        return;
    }).catch((err: Error) => {
        res.status(400).json({ "Error ": err });
    })
};

export const getAllContributers = async (req: Request, res: Response) => {
    const name = req.params.name;
    if (!name) {
        res.send(404).json("error: No valid user");
        return;
    }

    await ProjectService.getAllContributors(name).then((contrubitors) => {
        res.status(200).json({ "contrubitors": contrubitors });
        return;
    }).catch((err: Error) => {
        res.status(404).json({ "error": err });
        return;
    });
};

export const addContributer = async (req: Request, res: Response) => {
        
    const name = req.params.name;
    const contributorEmail = req.body.email;
   
    if ((req.body.constructor === Object && Object.keys(req.body).length === 0) || !contributorEmail || !name) {
        res.send(404).json("error: No valid input");
        return;
    }

    await ProjectService.addContributer(name, contributorEmail).then(() => {
        res.status(200).json("Contrubitor added");
        return;
    }).catch((err: Error) => {
        res.status(404).json({ "error": err });
        return;
    });
}


//////////////////////////////////Tickects////////////////////////////
export const getTickets = async (req: Request, res: Response) => {
    const name = req.params.name;
    if (!name) {
        res.status(400).json("error: Invalid input");
        return;
    }
    
    await ProjectService.getTickets(name)
        .then((tickets) => {
            res.status(200).json({ "tickets": tickets });
            return;
        }).catch((err: Error) => {
            res.status(404).json({ "error": err });
            return;
        });
};

export const deleteTicket = async (req: Request, res: Response) => {
    const name = req.params.name;
    const ticketName = req.params.taskName;

    if (!name || !ticketName) {
        res.status(400).json("error: Invalid input");
        return;
    }
    await Project.updateOne({ name: name }, { $pull: { tickets: { taskName: ticketName } } }).then(() => {
        res.status(200).json("Deleted!");
        return;
    }).catch((err: Error) => {
        res.status(404).json({"error": err});
    });
};
