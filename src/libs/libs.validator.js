const { body, checkSchema, validationResult } = require('express-validator')
const registerPayload = () => [
    body('username').not().isEmpty().isLength({ min: 5, max: 12 }).withMessage('User name cant be empty, max length 12 and min length 5'),
    body('identity_number').not().isEmpty().isLength({ min: 16, max: 16 }).withMessage('Identity number cant be empty and its length 16'),
    body('email', 'Your email is not valid').not().isEmpty(),
    body('account_number').not().isEmpty().isLength({ min: 11, max: 11 }).withMessage('Account number cant be empty and its length 11'),
]

const updatePayload = () =>
    checkSchema({
        userName: {
            optional: true,
            isLength: {
                errorMessage: 'userName should be at least 5 and max 12 chars long',
                options: { min: 5, max: 12 },
            },
        },
        emailAddress: {
            optional: true,
            isEmail: {
                bail: true
            }
        },
    })


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    registerPayload, updatePayload, validate
}