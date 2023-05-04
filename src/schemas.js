   const Joi = require("joi")
   
    module.exports.postJoiSchema = Joi.object({
        post: Joi.object({
            caption: Joi.string().required(),
            image: Joi.string().required()
        }).required()
    })


    module.exports.commentJoiSchema = Joi.object({
        comment: Joi.object({
            text: Joi.string().required()
            // text: Joi.number().required()
        }).required()
    })

