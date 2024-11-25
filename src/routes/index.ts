import { Router } from 'express';
// import authRoutes from './admin.routes';

const route = Router();

/**
 * @swagger
 * /api/example-23:
 *   get:
 *     summary: Example endpoint
 *     description: Retrieve an example resource
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Example response"
 *       "500":
 *         description: Internal Server response
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Error'
 *
 */
route.get('/example-error', (req, res) => {
  res.json({ message: 'Example response' });
});

/**
 * Auth Routes
 */

export default route;
