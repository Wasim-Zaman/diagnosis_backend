/**
 * @swagger
 * tags:
 *   name: ServiceBooking
 *   description: Service booking management
 */

/**
 * @swagger
 * /api/service-booking/create-service-booking:
 *   post:
 *     summary: Create a new service booking
 *     tags: [ServiceBooking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientName
 *               - mobileNumber
 *               - preference
 *               - date
 *               - time
 *               - paymentType
 *               - totalPrice
 *               - serviceId
 *             properties:
 *               patientName:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *                 pattern: '^[0-9]{10}$'
 *               preference:
 *                 type: string
 *                 enum: [LAB_VISIT, HOME_SAMPLE, CLINIC]
 *               address:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               paymentType:
 *                 type: string
 *                 enum: [ONLINE, CASH]
 *               totalPrice:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [COMPLETED, PENDING, CANCELLED]
 *                 default: PENDING
 *               serviceId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Service booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceBookingResponse'
 *       400:
 *         description: Validation error
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
 */

/**
 * @swagger
 * /api/service-booking/get-user-service-bookings:
 *   get:
 *     summary: Get user service bookings
 *     tags: [ServiceBooking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: User service bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedServiceBookingResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No service bookings found for this user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/service-booking/get-service-bookings:
 *   get:
 *     summary: Get all service bookings with pagination
 *     tags: [ServiceBooking]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query for patientName, mobileNumber, or status
 *     responses:
 *       200:
 *         description: Service bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedServiceBookingResponse'
 *       404:
 *         description: No service bookings found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/service-booking/get-service-booking/{id}:
 *   get:
 *     summary: Get service booking by ID
 *     tags: [ServiceBooking]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service booking ID
 *     responses:
 *       200:
 *         description: Service booking found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceBookingResponse'
 *       404:
 *         description: Service booking not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/service-booking/update-service-booking/{id}:
 *   put:
 *     summary: Update service booking by ID
 *     tags: [ServiceBooking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceBookingInput'
 *     responses:
 *       200:
 *         description: Service booking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceBookingResponse'
 *       400:
 *         description: Validation error
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
 *       404:
 *         description: Service booking not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/service-booking/update-service-booking-status/{id}:
 *   put:
 *     summary: Update service booking status
 *     tags: [ServiceBooking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [COMPLETED, PENDING, CANCELLED]
 *     responses:
 *       200:
 *         description: Service booking status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceBookingResponse'
 *       400:
 *         description: Invalid status
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
 *       404:
 *         description: Service booking not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/service-booking/delete-service-booking/{id}:
 *   delete:
 *     summary: Delete service booking by ID
 *     tags: [ServiceBooking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Service booking ID
 *     responses:
 *       200:
 *         description: Service booking deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Service booking not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceBookingInput:
 *       type: object
 *       required:
 *         - patientName
 *         - mobileNumber
 *         - preference
 *         - date
 *         - time
 *         - paymentType
 *         - totalPrice
 *         - serviceId
 *       properties:
 *         patientName:
 *           type: string
 *         mobileNumber:
 *           type: string
 *           pattern: '^[0-9]{10}$'
 *         preference:
 *           type: string
 *           enum: [LAB_VISIT, HOME_SAMPLE, CLINIC]
 *         address:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *         paymentType:
 *           type: string
 *           enum: [ONLINE, CASH]
 *         totalPrice:
 *           type: number
 *         status:
 *           type: string
 *           enum: [COMPLETED, PENDING, CANCELLED]
 *         serviceId:
 *           type: string
 *
 *     ServiceBookingResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/ServiceBooking'
 *
 *     ServiceBooking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         patientName:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         preference:
 *           type: string
 *         address:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *         paymentType:
 *           type: string
 *         totalPrice:
 *           type: number
 *         status:
 *           type: string
 *         serviceId:
 *           type: string
 *         user:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         service:
 *           $ref: '#/components/schemas/Service'
 *
 *     PaginatedServiceBookingResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceBooking'
 *             totalPages:
 *               type: integer
 *             currentPage:
 *               type: integer
 *             totalServiceBookings:
 *               type: integer
 *
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         amount:
 *           type: number
 *         discount:
 *           type: number
 *         fasting_time:
 *           type: string
 *         result_duration:
 *           type: string
 *         sample_type:
 *           type: string
 *         age_group:
 *           type: string
 *         home_sample_collection:
 *           type: string
 *
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 */
