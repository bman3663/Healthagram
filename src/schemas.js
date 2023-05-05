   const Joi = require("joi")
   
    module.exports.postJoiSchema = Joi.object({
        post: Joi.object({
            description: Joi.string(),
            caption: Joi.string().required(),
            image: Joi.string().required(),
            likes: Joi.number(),
            comments: Joi.array()
        }).required()
    })


    module.exports.commentJoiSchema = Joi.object({
        comment: Joi.object({
            text: Joi.string().required()
            // text: Joi.number().required()
        }).required()
    })

