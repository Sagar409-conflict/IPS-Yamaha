import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';
import YAML from 'yaml';
import { CONFIG } from './config';

// Load components from YAML
console.log(__dirname);
const componentsPath = path.join(__dirname, '../docs/components.yml');
const componentsFile = fs.readFileSync(componentsPath, 'utf8');
const components = YAML.parse(componentsFile);
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    components: components.components,
    servers: [
      {
        url: `${CONFIG.URL}${CONFIG.PORT}`,
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'], // Path to the API docs (adjust to your folder structure)
};

export const swaggerSpecs = swaggerJsdoc(options);
