/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - BearerAuth: []
 */

/**
 * @swagger
 * tags:
 *   name: E-Tourist
 *   description: API for E-Tourist service
 */

/**
 * @swagger
 * /protected-route:
 *   get:
 *     tags: [E-Tourist]
 *     description: Endpoint for protected route
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /another-protected-route:
 *   get:
 *     tags: [E-Tourist]
 *     description: Endpoint for another protected route
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 */

// Dodaj pozostałe ścieżki i opisy dla swojego API
