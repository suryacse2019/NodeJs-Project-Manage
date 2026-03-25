import { APiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
/**
const healthCheck = async (req, res, next) => {
    try{
        const user = await getUserDromDB()
        res
        .status(200).json(
            new APiResponse(200, {message: "Server is running"})
        );
    } catch (error){
        next(err);
    }
}
*/

const healthCheck = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new APiResponse(200, { message: "Server is stil running" }));
});

export { healthCheck };
