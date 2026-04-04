import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";


export const verifyJWT = asyncHandler(async(req, res, next) => {

   const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

   if(!token){
    throw new ApiError(401, "Unauthorized request");
   }

 
   try {
         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

         const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
         );

         if (!user) {
            throw new ApiError(401, "Invalid access token");
         }

         req.user = user;

         next();

   } catch (error) {
      throw new ApiError(401, "Invalid access token"); 
   }

});
 
  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
 
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};
 
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
 
export const fileUpload = (req, res, next) => {
  const singleUpload = upload.single("profilePic");

  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    next();
  });
};