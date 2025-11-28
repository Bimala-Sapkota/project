import * as yup from 'yup'

export const loginSchema = yup.object({
  email:yup.string().required('email is required').email('invalid email format'),
  password:yup.string().required('password is required')
})

export const registerSchema = yup.object({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Must be at least 6 characters long'),
  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  phone: yup
    .string()
    .optional()
     .test('is-valid-phone', 'Invalid phone number', (value) => {
        if (!value) return true; // Allow empty or undefined
        return /^(98|97)\d{8}$/.test(value); // Validate only if present
  })
});