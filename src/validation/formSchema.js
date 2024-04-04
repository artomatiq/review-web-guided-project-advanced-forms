// Here goes the schema for the form
import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup
        .string()
        .required('please enter a username')
        .min(6, 'username must be at least 6 characters'),
    email: yup
        .string()
        .required('please enter an email')
        .email('please enter a valid email'),
    role: yup
        .string()
        .oneOf(['student', 'alumni', 'instructor'])
        .required('please choose a role'),
    status: yup
        .string()
        .oneOf(['single', 'married'])
        .required(),
    hiking: yup
        .boolean(),
    reading: yup
        .boolean(),
    coding: yup
        .boolean()
})

export default schema