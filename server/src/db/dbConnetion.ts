import * as mongoose from 'mongoose';
import User from '../schemas/UserSchema'
import Project from '../schemas/ProjectSchema'


// const connectDB = () => {
//     console.log(`${process.env.DATABASE_URL}`);
//     return mongoose.connect(`${process.env.DATABASE_URL}`, { useUnifiedTopology: true , useNewUrlParser: true});
// }

const connectDB = () => {
    return mongoose.connect('mongodb+srv://admin:V8qjx28pJ-R2EYy@cluster0.ghz5w.mongodb.net/WebTech?retryWrites=true&w=majority', 
    { useUnifiedTopology: true , useNewUrlParser: true});
}

const models = {Project, User};
export {connectDB};
export default models;