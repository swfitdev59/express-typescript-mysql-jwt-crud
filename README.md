# TypeScript Node.js API Server - User Management

A TypeScript Node.js API server for managing users. This API provides endpoints for creating, updating, deleting, and fetching user data.

## Table of Contents

- [TypeScript Node.js API Server - User Management](#typescript-nodejs-api-server---user-management)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TypeScript
- MySQL or another compatible relational database

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DallingtonAsin/nodejs-api-server.git
   cd nodejs-api-server

2. Install project dependencies:
   ```sh
   npm i 

3. Create .env file and update environment variables accordingly:
   ```sh
   cp .env.example .env
   edit values in .env file according to your configurations

4. Start the application
   ```sh
   npm run start

## Usage

Once the server is running, you can interact with the API endpoints using tools like Postman or Thunderclient. Here's a quick guide on how to use the endpoints:

- **Create User:**
  - Endpoint: `POST /api/users`
  - Request Body: `{"firstName": "John", "lastName": "Doe", "phoneNumber": "0774014735", "email": "john@example.com", "address": "California"}`

- **Update User:**
  - Endpoint: `PUT /api/users/:id`
  - Request Body: ``{"firstName": "Johny", "lastName": "Doe", "phoneNumber": "0774014736", "email": "johndoe@example.com", "address": "California, USA"}`

- **Delete User:**
  - Endpoint: `DELETE /api/users/:id`

- **Fetch Users:**
  - Endpoint: `GET /api/users`
   