const swaggerJSDoc = require('swagger-jsdoc');
const path = require("path");
const options = Symbol("Init swagger options");
const swaggerDefinition = Symbol("Init swagger definition");
const { Ethernet } = require('os').networkInterfaces();
//const { address } = Ethernet[1];
//console.log(address)
class Swagger {
    [swaggerDefinition]() {
        return {
            info: {
                title: 'Node Swagger API',
                version: '1.0.0',
                description: 'Demonstrating how to describe a RESTful API with Swagger',
            },
            host: `address:4000`,
            basePath: '/',
        }
    };

    [options]() {
        return {
            // import swaggerDefinitions
            swaggerDefinition: this[swaggerDefinition](),
            // path to the API docs
            apis: [path.join(__dirname, '..', 'routes', '*', '*.js'), path.join(__dirname, '..', 'routes', 'configs', '*', '*.js')],
        }
    };

    swaggerSpec() {
        const _options = this[options]();
        return swaggerJSDoc(_options);
    };
}

module.exports = new Swagger();