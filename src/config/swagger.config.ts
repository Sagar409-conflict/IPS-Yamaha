import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'], // Path to the API docs (adjust to your folder structure)
};

export const swaggerSpecs = swaggerJsdoc(options);
