import joi from 'joi';

export const authSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required().messages({
    'string.email': 'Please enter valid email address',
    'string.empty': 'Email cannot be blank',
  }),
  password: joi
    .string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$'))
    .required()
    .messages({
      'string.pattern.base':
        'Password must be 8-30 characters and contain only letters and numbers',
      'string.empty': 'Password cannot be blank',
    }),
});
