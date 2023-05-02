   const Joi = require("joi")
   
    module.exports.postJoiSchema = Joi.object({
        post: Joi.object({
            caption: Joi.string().required(),
            image: Joi.string().required()
        }).required()
    })