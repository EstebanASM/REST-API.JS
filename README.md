# REST-API.JS


## Description
This is a simple Dockerfile that creates a Docker image for a REST API application using Node.js and Express. The container runs an HTTP server on port 3000.

## Project Links
- **Docker Hub Repository**: [estebanandres/rest-api on Docker Hub](https://hub.docker.com/repository/docker/estebanandres/rest-api/general)

## Getting Started

### Cloning the Repository
To clone the repository, use the following command:
```bash
git clone https://github.com/EstebanASM/REST-API.JS.git
```
Navigate to the project directory:
```bash
cd REST-API.JS
```

### Running the Application Locally (Without Docker)
#### Prerequisites
- Ensure[Node.js](https://www.python.org/downloads/) is installed on your machine.

- Run the following command to install the necessary dependencies:
   ```bash
   npm install

   ```

#### Running the Application
1. Inside the project directory, start the server with:
   ```bash
   node server.js

   ```
2. Open your browser and go to:
   ```
   http://localhost:3000/items
   ```
3. Test your REST API endpoints as defined in the server.js file.

### Running the Application with Docker

To run the application with Docker, visit the Docker Hub repository for this project: [estebanandres/rest-api on Docker Hub](https://hub.docker.com/repository/docker/estebanandres/rest-api/general)