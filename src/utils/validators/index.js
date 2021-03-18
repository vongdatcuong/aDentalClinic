import Joi from 'joi';

// Properties
const properties = {
    fullName: "fullName",
    email: "Email",
    phone: "phone",
    address: "address",
    password: "password",
    firstName: "firstName",
}

// Schemas
const fullNameSchema = Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required();
const emailSchema = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
    .required();
const phoneSchema = Joi.string()
    .pattern(new RegExp('^[0-9]*$'))
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
    .max(30)
    .required();

const isPropValid = (type, value) => {
    let schema = Joi.string();
    switch(type){
        case properties.fullName: 
            schema = fullNameSchema;
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