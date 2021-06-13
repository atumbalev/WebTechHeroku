import * as mongoose from 'mongoose';
import ITicket from '../models/ticket'
const { Schema } = mongoose;

const ticketSchema = new Schema<ITicket>({
    _id:  Schema.Types.ObjectId,
    taskName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type:String
    },
    category: {
      type: String,
      enum: ['Open', 'In progress', 'Resolved', 'Closed'],
      //required: true,
    },
    status:{
      type: String,
      enum: ['Highest','High','Normal', 'Low', 'Lowest'],
      //required: true,
    },
    assignor: {
      type: String,
      //required: true,
      match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    assignees: [{
      type: String,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    }]
})

const Ticket = mongoose.model<ITicket>('Ticket', ticketSchema);
const TicketSchema = ticketSchema;

export {Ticket, TicketSchema};
export default Ticket;