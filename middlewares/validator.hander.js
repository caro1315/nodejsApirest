const boom = require('@hapi/boom'); // Validar errores de estados

//Creando un Middleware dinamico, propiedad de clo
function validatorHandler(schema, property) { //closhur
    return (req, res, next) => {
        const data = req[property]; // La info puede venir dinamicamente si es un post o un get
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    }
}

module.exports = validatorHandler
