import { signUpSchema } from '#validations/auth.validation.js';
import { formatValidationError } from '#utils/format.js';
import logger from '#config/logger.js';

export const signUp = async (req, res, next) => {
  try {
    const validationResult = signUpSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ error: 'Validation Failed',
        details: formatValidationError(validationResult.error)
      });
    }
    const { name, email, role } = validationResult.data;

    logger.info(`User ${name} with email ${email} up with role ${role} has signed up successfully!`);
    res.status(201).json({ message: 'User signed up successfully', user: { id:1, name, email, role } });
  }  catch (error) {
    logger.error('Error in sign-up controller', error);
    if (error.message === 'User wih this email already exists') {
      return res.status(409).json({ error: 'User with this email already exists' });
    }
    next(error);
  }
};