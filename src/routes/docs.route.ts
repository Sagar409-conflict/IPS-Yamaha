import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from '../config/swagger.config';

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerSpecs,
  apis: ['src/docs/*.yml', 'src/routes/*.ts'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
  }),
);

module.exports = router;
