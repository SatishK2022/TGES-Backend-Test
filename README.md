# TGES Backend

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Functionality](#functionality)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Api Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

Welcome to the TGES Backend documentation. This repository contains the backend codebase for the TGES project. TGES is a traveling platform aiming to provide users with a seamless travelling experience.

This documentation aims to provide an overview of the project structure, setup instructions, API endpoints, and any other relevant information necessary for developers to understand and contribute to the project.

## Project Structure

The project structure is organized as follows:

```
TGES-Backend/
│
├── src
│   ├── config
│   │   └── db.js
│   ├── controller
│   │   ├── air.controller.js
│   │   ├── cab.controller.js
│   │   ├── hotel.controller.js
│   │   ├── train.controller.js
│   │   ├── volvo.controller.js
│   │   └── user.controller.js
│   ├── logger
│   │   ├── developmentLogger.js
│   │   ├── productionLogger.js
│   │   └── index.js
│   ├── middlewares
│   │   └── auth.middleware.js
│   ├── routes
│   │   ├── travel.routes.js
│   │   └── user.routes.js
│   ├── utils
|   |   ├── asyncHandler.js
|   |   ├── ApiResponse.js
│   │   ├── helper.js
│   │   └── sendMail.js
│   ├── constants.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Functionality

### User Registration

The `user.controller.js` file contains controllers for user registration. Three types of registrations are handled: retail, corporate, and vendor. Each registration involves:

- Validation of input data
- Checking if the respective table exists in the database; if not, creating it
- Hashing the password using bcryptjs
- Sending a confirmation email upon successful registration

### Travel Request

#### Air Travel

The `air.controller.js` file contains controllers for air travel. It includes functionality to create, update, and delete air travel data.

#### Cab Travel

The `cab.controller.js` file contains controllers for cab travel. It includes functionality to create, update, and delete cab travel data.

#### Hotel Booking

The `hotel.controller.js` file contains controllers for hotel booking. It includes functionality to create, update, and delete hotel booking data.

#### Train Travel

The `train.controller.js` file contains controllers for train travel. It includes functionality to create, update, and delete train travel data.

#### Volvo Bus Travel

The `volvo.controller.js` file contains controllers for volvo bus travel. It includes functionality to create, update, and delete volvo bus travel data.

### Routes

- The `user.routes.js` file defines routes for user-related operations. It includes endpoints for user registration, login, and other user-related functionalities.

- The `travel.routes.js` file defines routes for the travel-related operations. It includes endpoints for air travel, cab travel, hotel booking, train travel, and volvo bus travel.

### Utilities

#### ApiResponse

The `ApiResponse.js` utility formats the response sent by the server, ensuring consistency and ease of use across the application.

#### AsyncHandler

The `asyncHandler.js` utility handles asynchronous tasks, allowing for cleaner and more concise error handling in route handlers.

#### SendMail

The `sendMail.js` utility facilitates sending emails, which is used for sending confirmation emails upon user registration.

#### Helper

The `helper.js` utility contains reusable functions that can be used across different parts of the application.

## Technologies Used

- Node.js
- Express.js
- mySQL
- bcryptjs (for password hashing)
- Nodemailer (for sending emails)

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SatishK2022/TGES-Backend.git
   ```

2. Navigate into the project directory:

   ```bash
   cd TGES-Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
    PORT=3000

    # For JWT
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRY=your_jwt_expiry

    # For MySQL
    DB_HOST=your_database_host
    DB_USER=your_database_username
    DB_PASS=your_database_password
    DB_NAME=your_database_name

    # For Sending Emails
    SMTP_SERVICE=your_smtp_service
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_email
    SMTP_PASS=your_smtp_password

    NODE_ENV=your_node_env
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

## API Endpoints

The following API endpoints are available:

- **POST** `/api/v1/user/retail-register`
  - **Functionality:** Create a new retail user
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/corporate-register`
  - **Functionality:** Create a new corporate user
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/vendor-register`
  - **Functionality:** Create a new vendor
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/retail-login`
  - **Functionality:** Login a retail user
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `200 OK`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the credentials are invalid
       - `404 Not Found` if the user is not found
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/corporate-login`
  - **Functionality:** Login a corporate user
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `200 OK`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the credentials are invalid
       - `404 Not Found` if the user is not found
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/user/vendor-login`
  - **Functionality:** Login a vendor
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `200 OK`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the credentials are invalid
       - `404 Not Found` if the user is not found
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/train`
  - **Functionality:** Create a new train travel
  - **Request Format:** JSON
  - **Expected Response(s):**
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `401 Unauthorized` if the user is not authenticated
       - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/air`
   - **Functionality:** Create a new air travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/cab`
   - **Functionality:** Create a new cab travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs


- **POST** `/api/v1/travel/volvo`
   - **Functionality:** Create a new volvo bus travel
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

- **POST** `/api/v1/travel/hotel`
   - **Functionality:** Create a new hotel booking
   - **Request Format:** JSON
   - **Expected Response(s):**
     1. Success: `201 Created`
     2. Errors:
        - `400 Bad Request` if any of the required fields are missing
        - `401 Unauthorized` if the user is not authenticated
        - `500 Internal Server Error` if an unexpected error occurs

## Contributing

Contributions to the TGES Backend project are welcome! If you find any issues or would like to add new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
