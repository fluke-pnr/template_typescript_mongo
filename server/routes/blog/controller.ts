import { Router } from "express";
import Blog, { IBlog } from "../../models/Blog";
import ResponseBuilder, {
  GetRequest,
  PostRequest,
} from "../../utils/ResponseBuilder";
const BlogCrudRoute = Router();

/**
 * Blog find all
 */
type IListQuery = Partial<IBlog>;
const list = async (req: PostRequest<any, IListQuery>) => {
  const page: number = Number(req.query.page) || 0;
  const limit: number = Number(req.query.limit) || 10;
  const collection = await Blog.find()
    .skip(page * limit)
    .limit(limit)
    .exec();
  return collection;
};
BlogCrudRoute.get("/list", ResponseBuilder(list));

/**
 * Blog find one
 */
type IGetParams = {
  id: string;
};
const get = async (req: GetRequest<IGetParams, IGetParams>) => {
  const id = req.params.id || req.query.id;
  const round = await Blog.findById(id);
  if (round) return round;
  else throw new Error("Blog not found");
};
BlogCrudRoute.get("/:id", ResponseBuilder(get));

/**
 * Blog create
 */
type ICreateBody = IBlog;
const create = async (req: PostRequest<any, ICreateBody>) => {
  const round = new Blog({ ...req.body });
  await round.save();
  return round._id;
};
BlogCrudRoute.post("/create", ResponseBuilder(create));

/**
 * Blog update
 */
type IUpdateParams = { id: string };
type IUpdateBody = Partial<IBlog>;
const update = async (req: PostRequest<IUpdateParams, IUpdateBody>) => {
  const id = req.params.id || req.query.id;
  const round = await Blog.findByIdAndUpdate(id, { ...req.body });
  if(round){
    await round.save();
    return round._id;
  }
  throw new Error("Blog not found");
};
BlogCrudRoute.put("/:id", ResponseBuilder(update));

/**
 * Blog delete
 */
type IRemoveParams = { id: string };
const remove = async (req: PostRequest<IRemoveParams, any>) => {
  const id = req.params.id || req.query.id;
  const round = await Blog.findByIdAndUpdate(id, { ...req.body });
  
  if(round){
    const deletedID = round._id;
    await round?.remove();
    return deletedID;
  }
  throw new Error("Blog not found");
};
BlogCrudRoute.delete("/:id", ResponseBuilder(remove));

export default BlogCrudRoute;
