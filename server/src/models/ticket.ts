import {Document} from 'mongoose'

interface ITicket extends Document {
    taskName: string,
    description: string,
    category: string,
    status: string,
    assignor: string,
    assignees: string[]
}

export default ITicket;