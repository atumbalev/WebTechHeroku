import { Document } from 'mongoose'

interface IUsers extends Document {
    name: string,
    email: string,
    password: string,
    phone: string,
    description: string,
    profilePicture: string,
    //authToken: string,
    projects: string[]
};

export default IUsers;