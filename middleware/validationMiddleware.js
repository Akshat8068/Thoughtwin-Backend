import {body,validationResult} from "express-validator"


const handleValidation =(req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }

const registervalidation=[
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid Email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    handleValidation
]

const loginValidation=[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage(" Password length must be 6"),
    handleValidation
]

const validation ={registervalidation,loginValidation}
export default validation