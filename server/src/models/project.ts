import {Document} from 'mongoose'

import ITicket from './ticket'

interface IProject extends Document {
    name: string,
    creator: string,
    description: string,
    tickets: ITicket[],
    contributors: string[]
}

export default IProject;