import { Router } from "express";
import Admin, { IAdmin } from "../../models/Admin";
import ResponseBuilder, {
  GetRequest,
  PostRequest,
} from "../../utils/ResponseBuilder";
const AdminCrudRoute = Router();

/**
 * Admin find all
 */
type IListQuery = Partial<IAdmin>;
const list = async (req: PostRequest<any, IListQuery>) => {
  const page: number = Number(req.query.page) || 0;
  const limit: number = Number(req.query.limit) || 10;
  const collection = await Admin.find()
    .skip(page * limit)
    .limit(limit)
    .exec();
  return collection;
};
AdminCrudRoute.get("/list", ResponseBuilder(list));

/**
 * Admin find one
 */
type IGetParams = {
  id: string;
};
const get = async (req: GetRequest<IGetParams, IGetParams>) => {
  const id = req.params.id || req.query.id;
  const round = await Admin.findById(id);
  if (round) return round;
  else throw new Error("Admin not found");
};
AdminCrudRoute.get("/:id", ResponseBuilder(get));

/**
 * Admin create
 */
type ICreateBody = IAdmin;
const create = async (req: PostRequest<any, ICreateBody>) => {
  const round = new Admin({ ...req.body });
  await round.save();
  return round._id;
};
AdminCrudRoute.post("/create", ResponseBuilder(create));

/**
 * Admin update
 */
type IUpdateParams = { id: string };
type IUpdateBody = Partial<IAdmin>;
const update = async (req: PostRequest<IUpdateParams, IUpdateBody>) => {
  const id = req.params.id || req.query.id;
  const round = await Admin.findByIdAndUpdate(id, { ...req.body });
  if(round){
    await round.save();
    return round._id;
  }
  throw new Error("Admin not found");
};
AdminCrudRoute.put("/:id", ResponseBuilder(update));

/**
 * Admin delete
 */
type IRemoveParams = { id: string };
const remove = async (req: PostRequest<IRemoveParams, any>) => {
  const id = req.params.id || req.query.id;
  const round = await Admin.findByIdAndUpdate(id, { ...req.body });
  
  if(round){
    const deletedID = round._id;
    await round?.remove();
    return deletedID;
  }
  throw new Error("Admin not found");
};
AdminCrudRoute.delete("/:id", ResponseBuilder(remove));

export default AdminCrudRoute;
