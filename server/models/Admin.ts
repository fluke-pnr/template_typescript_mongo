import mongoose, { Document } from 'mongoose';

export interface IAdmin extends Document  {
  username: string;
  password: string;
  lineUID: string;
  walletID: string;
}
const schema = new mongoose.Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.model<IAdmin>('Admin', schema);
export default Admin;