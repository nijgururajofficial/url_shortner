# URL Shortener

## Description
This project is a simple URL shortener built using Node.js, Express.js, and MongoDB. The application takes a user-input website URL, generates a unique code, and appends it to the localhost, displaying the shortened URL. Server-side rendering is achieved using EJS. MongoDB is utilized to store the generated code, the redirect URL (original URL), timestamps, and the number of clicks. The application also provides analytics for the shortened URLs.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript)

## How to Use
1. Clone the repository to your local machine.
   ```
   git clone https://github.com/nijgururajofficial/url_shortener.git
2. Install the project dependencies.
   ```
   npm install
3. Set up your MongoDB database and update the connection details in connect.js.
   ```
   const mongoRoute = "YOUR-ROUTE-HERE";
4. Run the application.
   ```
   npm start
5. Open your web browser and visit http://localhost:8001/ to access the URL shortener.

## Project Structure

- `controllers/`: Contains controller logic for handling requests.
- `models/`: MongoDB data models.
- `routes/`: Contains route definitions.
- `views/`: EJS templates for server-side rendering.
- `connect.js`: File for establishing and exporting the MongoDB connection.
- `index.js`: Entry point of the application.

## Notes

- Ensure that MongoDB is installed and running on your machine before starting the application.
