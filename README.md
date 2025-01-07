# Hospital Food Management System - Backend

This is the backend for the Hospital Food Management System, built using Node.js, Express, and MongoDB. It provides RESTful APIs for managing patients, diet charts, pantry staff, and deliveries.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing the API](#testing-the-api)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create, read, update, and delete (CRUD) operations for patients.
- Manage diet charts.
- Manage pantry staff.
- Manage meal deliveries.
- User authentication with JWT.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- MongoDB (locally or use MongoDB Atlas)
- npm (Node Package Manager)

### Installation
1. **Clone the repository:**
```git clone https://github.com/shadabBhai/hospital-food-management-backend.git```
```cd hospital-food-management-backend```

3. **Install dependencies:**
```npm install```

### Configuration
1. **Create a `.env` file** in the root directory of the project and add your MongoDB connection string and JWT secret:
```MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>```
```JWT_SECRET=your_secret_key_here```
```PORT=5000```

2. **Seed initial users** (optional):
If you want to seed initial user data (hospital manager, pantry staff, delivery personnel), run:
```node seed.js```

### Running the Application
To start the server, run:
```node server.js```


The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/login`: Login to get a JWT token.

### Patients
- `POST /api/patients`: Create a new patient.
- `GET /api/patients`: Get all patients.
- `GET /api/patients/:id`: Get a patient by ID.
- `PATCH /api/patients/:id`: Update a patient by ID.
- `DELETE /api/patients/:id`: Delete a patient by ID.

### Diet Charts /Pantry Staff /Deliveries
(Include similar endpoints )


## Testing the API

You can test the API using tools like Postman or Insomnia. Make sure to include the JWT token in the Authorization header when accessing protected routes.

Example header:

```Authorization: Bearer <your_jwt_token>  ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

