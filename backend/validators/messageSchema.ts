import joi from 'joi'

export const messageSchema = joi.object({
    role: joi.string().valid('user').required().messages({
        'string.empty': 'message role has to be specified',
        'any.required': 'message role must exist',
        'any.only': 'message role must be user'
    }),
    content: joi.string().required().messages({
        'string.empty': 'user message cannot be empty',
        'any.required': 'user message must exist'
    })
})