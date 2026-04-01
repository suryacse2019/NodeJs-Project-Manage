import { Router } from "express"; 
import { validate } from "../middlewares/validator.middleware.js"; 
import {  projectCreateValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProject, getAllProject } from "../controllers/project.controllers.js";

const router = Router();

//create project
router.route("/create").post(verifyJWT, projectCreateValidator(), validate, createProject);
router.route("/get-all").get(verifyJWT, getAllProject);

export default router;