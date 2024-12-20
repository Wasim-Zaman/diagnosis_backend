/**
 * @swagger
 * tags:
 *   name: Package
 *   description: Package management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Package:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         discount:
 *           type: number
 *         image:
 *           type: string
 *         includes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               include:
 *                 type: string
 *               bullets:
 *                 type: array
 *                 items:
 *                   type: string
 *         faqs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *         serviceId:
 *           type: string
 *         service:
 *           $ref: '#/components/schemas/Service'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     PackageInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - includes
 *         - serviceId
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           description: Can be sent as a number or a string (will be parsed to a number)
 *         discount:
 *           type: number
 *           description: Optional. Can be sent as a number or a string (will be parsed to a number)
 *         image:
 *           type: string
 *           format: binary
 *         includes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             - title: "Feature 1"
 *               description: "Description of Feature 1"
 *               items: ["Point A", "Point B", "Point C"]
 *             - title: "Feature 2"
 *               description: "Description of Feature 2"
 *               items: ["Point X", "Point Y", "Point Z"]
 *         faqs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *           example:
 *             - question: "FAQ Question 1"
 *               answer: "Answer to FAQ 1"
 *             - question: "FAQ Question 2"
 *               answer: "Answer to FAQ 2"
 *         serviceId:
 *           type: string
 *           description: ID of the associated service
 *     PackageResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Package'
 *     PackagesResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 *             totalPages:
 *               type: integer
 *             currentPage:
 *               type: integer
 *             totalPackages:
 *               type: integer
 */

/**
 * @swagger
 * /api/package/v1/package:
 *   post:
 *     summary: Create a new package
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PackageInput'
 *     responses:
 *       201:
 *         description: Package created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     summary: Get all packages
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for name or description
 *     responses:
 *       200:
 *         description: Packages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackagesResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No packages found
 *
 * /api/package/v1/package/{id}:
 *   get:
 *     summary: Get a package by ID
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Package retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 *   put:
 *     summary: Update a package by ID
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PackageInput'
 *     responses:
 *       200:
 *         description: Package updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 *   delete:
 *     summary: Delete a package by ID
 *     tags: [Package]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Package deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PackageResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Package not found
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
