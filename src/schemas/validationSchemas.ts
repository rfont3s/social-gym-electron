import * as yup from 'yup';
import { ERROR_MESSAGES } from '@constants/messages';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required(ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.EMAIL_INVALID),
  password: yup
    .string()
    .required(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(6, ERROR_MESSAGES.PASSWORD_MIN_LENGTH),
});

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required(ERROR_MESSAGES.FIRST_NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.FIRST_NAME_MIN_LENGTH),
  lastName: yup
    .string()
    .required(ERROR_MESSAGES.LAST_NAME_REQUIRED)
    .min(2, ERROR_MESSAGES.LAST_NAME_MIN_LENGTH),
  email: yup
    .string()
    .required(ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(ERROR_MESSAGES.EMAIL_INVALID),
  password: yup
    .string()
    .required(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(8, ERROR_MESSAGES.PASSWORD_MIN_LENGTH_REGISTER)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      ERROR_MESSAGES.PASSWORD_COMPLEXITY
    ),
  confirmPassword: yup
    .string()
    .required(ERROR_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('password')], ERROR_MESSAGES.PASSWORDS_MUST_MATCH),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
