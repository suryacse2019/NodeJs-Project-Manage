import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/api-error.js";
import { APiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

const createProject = asyncHandler(async (req, res) => {

    const {name, description} = req.body;

    try{

        const project = await Project.create({
            name,
            description,
            created_by:req.user._id
        });
 
        return res
            .status(200) 
            .json(
                new APiResponse(
                    200,
                    { 
                    project
                    },
                    "Project Created successfully"
                )
            )

    } catch (error){
        throw new ApiError(500, "Something went wrong");
    }

});

const getAllProject = asyncHandler(async(req, res) => {

    try{
        const project = await Project.find();

        return res
            .status(200)
            .json(
                new APiResponse(200, {project},"Get all projects successfully")
            )

    }catch (error){
        throw new ApiError(500, "Something went wrong");
    }

});

export { createProject, getAllProject };