const Joi = require('joi');

module.exports.mockSchema = Joi.object({
        endPoint: Joi.string().required(),
        statusCodes: Joi.string().required(),
        contentType: Joi.string().required(),
        delay: Joi.string().required(),
        httpMethod: Joi.string().required(),
        body: Joi.string().required(),
});
