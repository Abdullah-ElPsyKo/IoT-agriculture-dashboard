# AgroData Backend

## Overview
AgroData Backend is a Node.js application designed to handle environmental data for agricultural analysis. It is structured to use PostgreSQL via Sequelize ORM to model and manage essential data related to farming conditions.

## Structure

```
AgroData/
├── config/
│   └── database.js         # Configures the database connection and synchronization
├── models/
│   └── environmentalData.js # Sequelize model definition for environmental data
├── Dockerfile              # Dockerfile for containerizing the application
├── package.json            # Node.js dependencies and scripts
├── package-lock.json       # Locked versions of the dependencies
├── README.md               # Documentation file
└── server.js               # Entry point of the application
```

## Prerequisites
- Node.js (v14)
- Docker (for containerization)
- PostgreSQL Database

## Configuration
Set up your database configuration in `config/database.js`. Update the `yourdbname`, `user`, `password`, and `host` fields according to your PostgreSQL setup.

## Models
- **EnvironmentalData**: Manages data points such as date, location (farm, country, city), temperature, soil moisture, and humidity.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd AgroData
   ```

2. **Build and run with Docker:**
   ```bash
   docker build -t agrodata-backend .
   docker run -p 3000:3000 agrodata-backend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the application:**
   ```bash
   node server.js
   ```

## API
Ensure to document your API endpoints in a section here if your application exposes APIs.
