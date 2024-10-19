# Health Services API

This is a Node.js Express API for managing health services, including user management, service bookings, enquiries, and more.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Routes](#routes)
- [Error Handling](#error-handling)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and management
- Admin management
- Service and package management
- Service booking system
- Enquiry handling
- Banner management
- Rate limiting
- Swagger API documentation

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)
- PostgreSQL database

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/wasim-zaman/health-services-api.git
   cd health-services-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your environment variables by creating a `.env` file in the root directory. Use the `.env.example` file as a template.

## Configuration

The application uses environment variables for configuration. Make sure to set the following variables in your `.env` file:

- `PORT`: The port number on which the server will run (default: 3000)
- `DATABASE_URL`: Your PostgreSQL database connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `ADMIN_EMAIL`: Email for the default admin account
- `ADMIN_PASSWORD`: Password for the default admin account

## Usage

To start the server in development mode:

```
npm run dev
```

For production:

```
npm start
```

## API Documentation

The API documentation is available through Swagger UI. After starting the server, you can access it at:

```
http://localhost:3000/api-docs
```

## Routes

The API includes the following main route groups:

- `/api/admin`: Admin-related operations
- `/api/user`: User management
- `/api/banner`: Banner management
- `/api/service`: Service management
- `/api/enquiry`: Enquiry handling
- `/api/package`: Package management
- `/api/service-booking`: Service booking operations

For detailed information on each endpoint, refer to the Swagger documentation.

## Error Handling

The application uses a custom error handling middleware. All errors are logged using the configured logger and returned to the client in a consistent format.

## Security

- Helmet.js is used to set various HTTP headers for security
- Rate limiting is implemented to prevent abuse
- CORS is enabled and can be configured as needed
- All routes use appropriate authentication middleware

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
