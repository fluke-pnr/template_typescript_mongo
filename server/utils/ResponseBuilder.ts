import { Request, Response } from "express";

/** Types */
interface DefaultResponse {
  status: number;
  message: {
    data: string;
    error?: any;
  };
}
export type GetRequest<IParams, IQuery> = Request<IParams, any, any, IQuery>;
export type PostRequest<IParams, IBody> = Request<IParams, any, IBody, any>;

/** Functions */
const buildDefaultResponse = (
  status: number,
  data?: any,
  error?: any
): DefaultResponse => ({
  status,
  message: {
    data,
    error: error ? error.message : error,
  },
});

const ResponseBuilder = (
  process: (
    req: Request<any, any, any, any>,
    res: Response
  ) => Promise<any> | any
) => async (req: Request, res: Response) => {
  try {
    const result = await process(req, res);
    console.log("Response success:");
    console.log(buildDefaultResponse(1000, result));
    return res.send(buildDefaultResponse(1000, result));
  } catch (error) {
    console.log(error);
    return res.send(buildDefaultResponse(5000, undefined, error));
  }
};
export default ResponseBuilder;
