import Joi from 'joi';
import figures from '../../configs/figures';

// Properties
const properties = {
    fullName: "fullName",
    email: "Email",
    phone: "phone",
    address: "address",
    password: "password",
    firstName: "firstName",
    username: "username",
    lastName: "lastName",
    assistant: "assistant",
    provider: "provider",
    appointDuration: "appointDuration",
    name:'name',
}

// Schemas
const fullNameSchema = Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required();
const nameSchema = Joi.string()
    .min(1)
    .max(30)
    .required();
const emailSchema = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
    .required();
const phoneSchema = Joi.string()
    .pattern(new RegExp('^[-0-9]*$'))
    .min(10)
    .max(15)
    .required();
const addressSchema = Joi.string()
    .min(5)
    .max(300)
    .required();
const passwordSchema = Joi.string()
    .min(6)
    .max(100)
    .required();
const firstNameSchema = Joi.string()
    .min(1)
    .max(30)
    .required();
const lastNameSchema = Joi.string()
    .min(1)
    .max(30)
    .required();
const userNameSchema = Joi.string()
    .min(1)
    .max(30)
    .required();
const assistantSchema = Joi.string()
    .required();
const providerSchema = Joi.string()
    .required();
const appointDurationSchema = Joi.number()
    .positive()
    .multiple(figures.defaultCellDuration)
    .min(figures.defaultCellDuration)
    .max(figures.maxAppointmentDuration);

const isPropValid = (type, value) => {
    let schema = Joi.string();
    switch(type){
        case properties.fullName: 
            schema = fullNameSchema;
            break;
        case properties.name: 
            schema = nameSchema;
            break;
        case properties.email: 
            schema = emailSchema;
            break;
        case properties.phone: 
            schema = phoneSchema;
            break;
        case properties.address: 
            schema = addressSchema;
            break;
        case properties.password:
            schema = passwordSchema;
            break;
        case properties.firstName:
            schema = firstNameSchema;
            break;
        case properties.lastName:
            schema = lastNameSchema;
            break;
        case properties.username:
            schema = userNameSchema;
            break;
        case properties.assistant:
            schema = assistantSchema;
            break;
        case properties.provider:
            schema = providerSchema;
            break;
        case properties.appointDuration:
            schema = appointDurationSchema;
            break;
        default:
            break;
    }
    const {error} = schema.validate(value);
    return error===undefined;
}

export {isPropValid, properties}
export default {
    isPropValid,
    properties,
}