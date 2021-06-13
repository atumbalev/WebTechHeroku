import * as mongoose from 'mongoose';
import IUser from '../models/users';
import { Project, ProjectSchema } from './ProjectSchema'
const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    match: /^[a-zA-Z -]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  phone: {
    type: String,
    match: /^08[789]\d{7}^/
  },
  description: {
    type: String
  },
  profilePicture: {
    data: Buffer,
    contentType: String
  },
  projects: [ProjectSchema]
});

const User = mongoose.model<IUser>('User', userSchema);



export default User;