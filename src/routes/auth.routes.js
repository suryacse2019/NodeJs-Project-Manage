import { Router } from "express";
import { changeCurrentPassword, forgotPasswordRequest, getCurrentUser, login, logoutUser, refreshTokenAccessToken, registerUser, resendEmailVerification, resetForgotPassword, updateProfile, verifyEmail } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js"; 
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator, userRegisterValidator, userResetPasswordValidator } from "../validators/index.js";
import { fileUpload, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecure routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify-email/:verificationToken").get(verifyEmail);
router.route("/refresh-token").post(refreshTokenAccessToken);
router.route("/forgot-password").post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router.route("/reset-password/:resetToken").post(userResetPasswordValidator(), validate, resetForgotPassword);
router.route("/profile-update").post(verifyJWT,  fileUpload, updateProfile);



//secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, userChangeCurrentPasswordValidator(), validate, changeCurrentPassword);
router.route("/resend-email-varification").post(verifyJWT, resendEmailVerification);  


export default router;