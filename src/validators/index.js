import { body } from "express-validator";


const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({min:3})
            .withMessage("Username must be at least 3 charecter long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("fullName")
            .optional()
            .trim(),
    ];
}
 
const userLoginValidator = () => {
    return [
        body("email")
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),
        body("password")
            .notEmpty()
            .withMessage("Password is required")
    ];
}
 

const userChangeCurrentPasswordValidator = () => {
    return [
        body("oldPassord").notEmpty().withMessage("Old password is required"),
        body("newPassword").notEmpty().withMessage("new password is required"),
    ]
}

const userForgotPasswordValidator = () => {
    return [
        body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"), 
    ]
}

const userResetPasswordValidator = () => {
    return [
        body("newPassword").notEmpty().withMessage("newPassword is required"), 
    ]
}

const projectCreateValidator = () => {
    
    return [
        body("name").notEmpty().withMessage("Project name is required"),
        body("description").notEmpty().withMessage("Description is required")
    ]
}


export {
    userRegisterValidator, userLoginValidator, userChangeCurrentPasswordValidator, userForgotPasswordValidator, userResetPasswordValidator, projectCreateValidator
}