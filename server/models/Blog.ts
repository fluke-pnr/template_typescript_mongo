import mongoose, { Document } from 'mongoose';

export interface IBlog extends Document  {
  title: string;
  content: string;
  adminID: string;
}
const schema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  adminID: { type: String, required: true },
}, {
  timestamps: true
});
const Blog = mongoose.model<IBlog>('Blog', schema);
export default Blog;