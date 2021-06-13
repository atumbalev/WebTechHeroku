import * as mongoose from 'mongoose'
import IUsers from "../models/users"
import ITicket from "../models/ticket"
import IProject from '../models/project'
import User from '../schemas/UserSchema'
import Project from '../schemas/ProjectSchema'
import Ticket from '../schemas/TicketSchema'
import { nextTick } from 'process'


class TicketService {

  async addTicket(name: string, ticket: ITicket) {
    return new Promise((res, rej) => {
      this.notExists(ticket.taskName).then(async () => {
        const newTicket = new Ticket({
          _id: new mongoose.Types.ObjectId(),
          taskName: ticket.taskName,
          description: ticket.description,
          category: "Open",
          status: ticket.status,
          assignor: ticket.assignor,
          assignees: ticket.assignees
        });

        console.log(newTicket);

        await newTicket.save();

        Project.updateOne({ name: name }, { $addToSet: { tickets: newTicket } }).exec().then(() => {
          res("ticket added");
        }).catch((err: Error) => {
          rej("error: " + err);
        })

        // res(true);
      }).catch((err) => {
        console.log(`ProjectService: addProject: Error: ${err}`);
        rej("Project exists");
      });
    })
  }

  notExists = (taskName: string) => {
    return new Promise(async (res, rej) => {
      const task = await Ticket.findOne({ taskName: taskName }).exec();
      if (task) {
        rej("Task exists");
      }
      res(true);
    });
  };

  async deleteTicket(name: string, taskName: string): Promise<Boolean> {
    return new Promise(async (res, rej) => {

      const deletedTicket = await Ticket.deleteOne({ taskName: name }).exec();
      if (deletedTicket) {
        res(true);
      }
      rej("Un successfully deleted");
    })
  };

  async updateTicket(
    name: string,
    taskName: string,
    description?: string,
    category?: string,
    status?: string,
    assignees?: [string]
  ) {
    return new Promise(async (res, rej) => {
      const project = await Project.findOne({ name: name }).select('tickets').exec();
      if (project) {
        let tickets = project.tickets;
        tickets.forEach((el: any) => {
          if (el.taskName === taskName) {
            el.description = description ? description : el.description;
            el.category = category ? category : el.category;
            el.status = status ? status : el.status;
            el.assignees = assignees ? assignees : el.assignees;
          }
        });

        Project.findOneAndUpdate({ name: name }, { tickets: tickets }).exec().then(async (project: any) => {
          const tic = (await Project.findOne({ name: project.name }).select("tickets").exec()).tickets;
          res(tic);
        })
          .catch((err: Error) => rej(err));
      } else {
        rej('No project found');
      }
    });
  };


  async getByAssignee(name: string) {
    return new Promise(async (res, rej) => {

      await Project.findOne({ name: name }).select('tickets').exec()
        .then((tickets) => {
          const ticketsArr = tickets.tickets;
          let ticketsByAssignee: Array<any> = [];
          ticketsArr.forEach((el: any) => {
            ticketsByAssignee.push({
              taskName: el.taskName,
              description: el.description,
              assignor: el.assignor,
              status: el.status,
              category: el.category
            });
          })

          res(ticketsByAssignee);
          return;
        }).catch((err: Error) => {
          res(err);
        })
    });
  }

  async getByStatus(name: string, status: string) {
    return new Promise(async (res, rej) => {

      await Project.findOne({ name: name }).select('tickets').exec()
        .then((tickets) => {
          const ticketsArr = tickets.tickets;
          let ticketsByStatus: Array<any> = [];

          ticketsArr.forEach((el: any) => {
            if (el.status === status) {
              console.log(status);
              ticketsByStatus.push({
                taskName: el.taskName,
                description: el.description,
                assignor: el.assignor,
                category: el.category
              });
            }
          })
          res(ticketsByStatus);
          return;
        }).catch((err: Error) => {
          res(err);
        })
    });
  }

  async getByCategory(name: string, category: string) {
    return new Promise(async (res, rej) => {

      await Project.findOne({ name: name }).select('tickets').exec()
        .then((tickets) => {
          let ticketsByCategory: Array<any> = [];
          const ticketsArr = tickets.tickets;
          ticketsArr.forEach((el: any) => {
            if (el.category === category) {
              ticketsByCategory.push({
                taskName: el.taskName,
                description: el.description,
                assignee: el.assignor,
                status: el.status,
                category: el.category
              });
            }
          });

          res(ticketsByCategory);
          return;
        })
        .catch((err: Error) => {
          rej(err);
        })
    });
  }
}

export default new TicketService();