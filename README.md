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
TGES-Backend-Test/
│
├── src/
│   │
│   ├── config              
│   │   └── db.js
│   │
│   ├── controller
│   │   └── userController.js
│   │
│   ├── routes
│   │   └── user.routes.js
|   |
│   ├── utils
|   |   ├── asyncHandler.js
|   |   ├── ApiResponse.js
│   │   ├── helper.js
│   │   └── sendMail.js
│   │
│   └── server.js
│
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

### Routes

The `user.routes.js` file defines routes for user-related operations. It includes endpoints for user registration, login, and other user-related functionalities.

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
   git clone https://github.com/SatishK2022/TGES-Backend-Test.git
   ```

2. Navigate into the project directory:

   ```bash
   cd TGES-Backend-Test
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   
   Create a `.env` file in the root directory and add the following environment variables:

   ```bash
    PORT=3000

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
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

## API Endpoints

The following API endpoints are available:

- **Route:** `/api/v1/user/retail-register`
  - **Functionality:** Create a new retail user
  - **Request Format:** JSON
  - **Expected Response(s):** 
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use

- **Route:** `/api/v1/user/corprate-register`
  - **Functionality:** Create a new corporate user
  - **Request Format:** JSON
  - **Expected Response(s):** 
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use

- **Route:** `/api/v1/user/vendor-register`
  - **Functionality:** Create a new vendor
  - **Request Format:** JSON
  - **Expected Response(s):** 
    1. Success: `201 Created`
    2. Errors:
       - `400 Bad Request` if any of the required fields are missing
       - `409 Conflict` if the email is already in use

## Contributing

Contributions to the TGES Backend project are welcome! If you find any issues or would like to add new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.